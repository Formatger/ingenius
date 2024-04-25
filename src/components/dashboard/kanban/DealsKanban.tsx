import React, { useEffect, useState } from "react";
import Image from "next/image";
import Plus from "@/components/assets/icons/plus.svg";
import Edit from "@/components/assets/icons/edit.svg";
import AddFieldModalDeal from "@/components/dashboard/kanban/AddFieldModalDeal";
import { deleteDealStage, putDeal, putNewOrderDeal } from "@/utils/httpCalls";
import ConfirmModal from "../profile/ConfirmModal";
import ChangeDealColumn from "@/components/dashboard/kanban/ChangeDealColumn";
import ErrorModal from "@/components/common/ErrorModal";

// interface Stages2 {
//   id: number;
//   name: string;
//   order: number;
//   user?: string;
// }

interface DealsKanbanProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[]; // Considera definir tipos más específicos si es posible
  DealData: any; // Considera definir tipos más específicos si es posible
  handleOpenSidepanel: (project: object) => void;
  Dealstage: any; // Considera definir un tipo más específico si es posible
  updateDealData: () => void;
}

const DealsKanban = ({
  DealData,
  httpError,
  data,
  handleOpenSidepanel,
  Dealstage,
  updateDealData,
}: DealsKanbanProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [draggedOverStageIndex, setDraggedOverStageIndex] = useState<
    string | null
  >(null); // Estado para almacenar el ID de la columna sobre la que se arrastra
  const [stages, setStages] = useState<any[]>([]);
  const [deleteStageId, setDeleteStageId] = useState<string | null>(null);
  const colors = ["pink", "linen", "green", "blue", "yellow", "orange", "red"];
  const [changeStage, setChangeStage] = useState<string | null>(null);
  const [lockedDeals, setLockedDeals] = useState<any>(false);
  const [showLockModal, setShowLockModal] = useState<any>(false);

  /* ASSIGN COLOR TO STAGES */

  const assignColorsToStages = (stages: any[]) => {
    const storedColors = localStorage.getItem("stageColors");
    const colorsMap = storedColors ? JSON.parse(storedColors) : {};

    const coloredStages = stages.map((stage) => {
      if (!colorsMap[stage.stageID]) {
        colorsMap[stage.stageID] = `color-${
          colors[Math.floor(Math.random() * colors.length)]
        }`;
      }
      return { ...stage, color: colorsMap[stage.stageID] };
    });

    localStorage.setItem("stageColors", JSON.stringify(colorsMap));
    return coloredStages;
  };

  useEffect(() => {
    const lockedDeals = DealData?.find((deal: any) => deal.is_locked);

    setLockedDeals(lockedDeals ? true : false);
  }, []);

  /* FETCH STAGE COLUMNS */

  useEffect(() => {
    if (Dealstage.length === 0) return;

    let stagesWithDeals = Dealstage.map(
      (stage: any) => {
        const stageDeals = DealData.filter((deal: any) => {
          return deal.deal_stage === stage.stageID;
        });

        return { ...stage, deals: stageDeals };
      },
      [DealData, Dealstage]
    );

    stagesWithDeals = assignColorsToStages(stagesWithDeals);
    setStages(stagesWithDeals);
  }, [DealData, Dealstage]);

  /* EDIT STAGE */

  const openChangeModal = (stageID: any) => {
    setChangeStage(stageID);
    setEditModalOpen(true);
  };

  /* DELETE STAGE */

  const openDeleteModal = (stageID: any) => {
    const stage = stages.find((stage) => stage.stageID === stageID);
    if (stage && stage.deals.length > 0) {
      alert(
        "Please move all deals from this stage to another stage before deleting it."
      );
      return;
    }
    setDeleteStageId(stageID);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (deleteStageId) {
      const stage = stages.find((stage) => stage.stageID === deleteStageId);
      if (stage && stage.deals.length > 0) {
        alert(
          "Please move all deals from this stage to another stage before deleting it."
        );
        return;
      }

      deleteDealStage(
        parseInt(deleteStageId),
        async () => {
          const remainingStages = stages.filter(
            (stage) => stage.stageID !== deleteStageId
          );
          const updatedStages = remainingStages.map((stage, index) => ({
            ...stage,
            stageIndex: index + 1,
          }));
          setStages(updatedStages);

          for (const stage of updatedStages) {
            await putNewOrderDeal(
              stage.stageID,
              { name: stage.stageName, order: stage.stageIndex },
              () => {},
              (error) => console.error("Failed to update stage order:", error)
            );
          }

          updateDealData();
          setIsModalOpen(false);
          setDeleteStageId(null);
        },
        (error) => {
          console.error("Failed to delete stage:", error);
          alert("Failed to delete stage. Please try again.");
        }
      );
    }
  };

  /* DRAG & DROP */

  const handleDragStartColumn = (e: React.DragEvent, stage: any) => {
    e.dataTransfer.setData("text/plain", stage.stageIndex);
    e.dataTransfer.setData("stage", JSON.stringify({ stage }));
  };

  const handleDropColumn = async (e: React.DragEvent, newColumn: any) => {
    e.preventDefault();
    const oldColumnData = JSON.parse(e.dataTransfer.getData("stage"));
    const oldColumn = oldColumnData.stage;

    if (oldColumn.stageIndex !== newColumn.stageIndex) {
      try {
        await Promise.all([
          putNewOrderDeal(
            oldColumn.stageID,
            { name: oldColumn.stageName, order: newColumn.stageIndex },
            () => {},
            undefined
          ),
          putNewOrderDeal(
            newColumn.stageID,
            { name: newColumn.stageName, order: oldColumn.stageIndex },
            () => {},
            undefined
          ),
        ]);

        setStages((currentStages) => {
          return currentStages.map((stage) => {
            if (stage.stageID === oldColumn.stageID) {
              return {
                ...stage,
                stageIndex: newColumn.stageIndex,
              };
            }
            if (stage.stageID === newColumn.stageID) {
              return {
                ...stage,
                stageIndex: oldColumn.stageIndex,
              };
            }
            return stage;
          });
        });
      } catch (error) {
        console.error("Error al procesar la solicitud PUT:", error);
      }
    }
  };

  const handleDragStart = (e: any, deals: any, stages: any) => {
    e.dataTransfer.setData("deals", JSON.stringify({ ...deals, stages }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, stageID: any) => {
    e.preventDefault();
    setDraggedOverStageIndex(stageID);
    setDraggedOverStageIndex(stageID);
  };

  const handleDragLeave = () => {
    setDraggedOverStageIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, stageID: any) => {
    setDraggedOverStageIndex(null);
    try {
      const deal = JSON.parse(e.dataTransfer.getData("deals"));
      if (deal.deal_stage !== stageID) {
        putDeal(
          deal.id,
          { ...deal, deal_stage: stageID },
          () => {
            setStages((currentStages) => {
              return currentStages.map((stage) => {
                if (stage.stageID === deal.deal_stage) {
                  return {
                    ...stage,
                    deals: stage.deals.filter((p: any) => p.id !== deal.id),
                  };
                }
                if (stage.stageID === stageID) {
                  const existingDealIndex = stage.deals.findIndex(
                    (p: any) => p.id === deal.id
                  );
                  if (existingDealIndex === -1) {
                    return {
                      ...stage,
                      deals: [...stage.deals, { ...deal, deal_stage: stageID }],
                    };
                  } else {
                    const updatedDeal = [...stage.deals];
                    updatedDeal.splice(existingDealIndex, 1);
                    updatedDeal.push({
                      ...deal,
                      deal_stage: stageID,
                    });
                    return {
                      ...stage,
                      deals: updatedDeal,
                    };
                  }
                }
                return stage;
              });
            });
          },
          (error) => {
            console.error("Error al actualizar el proyecto:", error);
          }
        );
      }
    } catch (error) {
      console.error("Error al procesar la solicitud PUT:", error);
    }
  };

  return (
    <div
      className="kanban-container"
      style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
    >
      {showLockModal && (
        <ErrorModal
          isOpen={showLockModal}
          onClose={() => setShowLockModal(false)}
          title="Stages are locked"
          message="A deal is currently being edited by another user. Please try again later."
        />
      )}
      {stages
        .sort((a, b) => a.stageIndex - b.stageIndex)
        .map((dealCol) => {
          return (
            <div
              className={`kanban-column ${
                draggedOverStageIndex === dealCol.stageID
                  ? "drag-over-column"
                  : ""
              }`}
              onDrop={(e) => handleDrop(e, dealCol.stageID)}
              onDragOver={(e) => handleDragOver(e, dealCol.stageID)}
              onDragLeave={handleDragLeave}
              onDragStart={(e) => handleDragStartColumn(e, dealCol)}
              key={dealCol.stageIndex}
              draggable
            >
              <div
                className={`kanban-header`}
                onDrop={(e) => handleDropColumn(e, dealCol)}
                onDragStart={(e) => handleDragStartColumn(e, dealCol)}
              >
                <span
                  className={`stage-tag ${dealCol.color}`}
                  onDrop={(e) => handleDropColumn(e, dealCol)}
                  onDragStart={(e) => handleDragStartColumn(e, dealCol)}
                  draggable
                >
                  {dealCol.stageName}
                </span>

                <div className="addtags-wrap">
                  <div className="row-wrap-2">
                    <button
                      onClick={() => {
                        if (lockedDeals) {
                          setShowLockModal(true);
                        } else {
                          openChangeModal(dealCol);
                        }
                      }}
                    >
                      <Image src={Edit} alt="Icon" width={12} height={12} />
                    </button>
                    <button
                      onClick={() => {
                        if (lockedDeals) {
                          setShowLockModal(true);
                        } else {
                          openDeleteModal(dealCol.stageID);
                        }
                      }}
                    >
                      <Image
                        className="exit-icon"
                        src={Plus}
                        alt="Icon"
                        width={15}
                        height={15}
                      />
                    </button>
                  </div>

                  <AddFieldModalDeal
                    isOpen={isAddModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    title="Add Deal Stage"
                    updateDealData={updateDealData}
                  />

                  <ChangeDealColumn
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    changeStage={changeStage}
                    title="Edit Stage Name"
                    button="Save"
                    updateDealData={updateDealData}
                  />

                  <ConfirmModal
                    isOpen={isModalOpen && deleteStageId === dealCol.stageID}
                    onClose={() => setIsModalOpen(false)}
                    title="Delete Deal Stage"
                    message={`Are you sure you want to delete the stage '${dealCol.stageName}'?`}
                    onConfirm={handleDelete}
                    button="Yes, delete this stage"
                  />
                </div>
              </div>
              {dealCol.deals?.map((dealCard: any) => {
                return (
                  <div
                    className="kanban-card"
                    key={dealCard.id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, dealCard, dealCol.stageID)
                    }
                    onClick={() => handleOpenSidepanel(dealCard)}
                  >
                    <div className="kanban-card-header">
                      <img
                        src={dealCard.brand_image_url}
                        alt={dealCard.brand_name}
                        className="brandImage"
                      />
                      <p className="brandTitle">{dealCard.brand_name}</p>
                    </div>
                    <p className="dealName">{dealCard.name}</p>
                    <p className="dealDescription">{dealCard.description}</p>
                    <div className="card-tags mt-4">
                      <span className="square-tag green">
                        Due: {dealCard.deadline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

      {/* ADD STAGE BUTTON */}
      <div className="addstage-wrap">
        <button className="add-stage-btn" onClick={() => setAddModalOpen(true)}>
          <Image src={Plus} alt="Icon" width={12} height={12} />
          Add Stage
        </button>
      </div>
    </div>
  );
};

export default DealsKanban;
