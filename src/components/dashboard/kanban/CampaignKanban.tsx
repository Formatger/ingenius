import React, { useEffect, useState } from "react";
import Image from "next/image";
import Plus from "@/components/assets/icons/plus.svg";
import Edit from "@/components/assets/icons/edit.svg";
import AddFieldModalCampaign from "@/components/dashboard/kanban/AddFieldModalCampaign";
import { deleteCampaignStage, putCampaign, putNewOrderCampaign } from "@/utils/httpCalls";
import ConfirmModal from "../profile/ConfirmModal";
import ChangeCampaignColumn from "@/components/dashboard/kanban/ChangeProjectColumn";

interface CampaignKanbanProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[];
  campaignStage: any;
  campaignsData: any;
  updateCampaignData: () => void;
  handleOpenSidepanel: (campaign: object) => void;
}

const CampaignKanban = ({
  campaignsData,
  campaignStage,
  httpError,
  handleOpenSidepanel,
  updateCampaignData,
}: CampaignKanbanProps) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedOverStageIndex, setDraggedOverStageIndex] = useState<string | null>(null); // Estado para almacenar el ID de la columna sobre la que se arrastra
  const [stages, setStages] = useState<any[]>([]);
  const [deleteStageId, setDeleteStageId] = useState<string | null>(null);
  const colors = ["pink", "linen", "green", "blue", "yellow", "orange", "red"];
  const [changeStage, setChangeStage] = useState<string | null>(null);

  console.log(campaignStage);
  console.log(campaignsData);

  /* ASSIGN COLOR TO STAGES */
  
  const assignColorsToStages = (stages: any[]) => {
  const storedColors = localStorage.getItem('stageColors');
  const colorsMap = storedColors ? JSON.parse(storedColors) : {};

  const coloredStages = stages.map(stage => {
    if (!colorsMap[stage.stageID]) {
      colorsMap[stage.stageID] = `color-${colors[Math.floor(Math.random() * colors.length)]}`;
    }
    return {...stage, color: colorsMap[stage.stageID]};
  });

  localStorage.setItem('stageColors', JSON.stringify(colorsMap));
  return coloredStages;
};

  /* FETCH COLUMN STAGES */

  useEffect(() => {
    if (campaignStage.length === 0) return; // Evitar procesamiento si campaignStage está vacío

    let stagesWithCampaigns = campaignStage.map(
      (stage: any) => {
        const stageCampaigns = campaignsData.filter((campaign: any) => {
          console.log("CAMPAIGN CAMPAIGN_STAGE", campaign.campaign_stage); // Agregado console.log para campaign.campaign_stage
          return campaign.campaign_stage === stage.stageID;
        });
        console.log("STAGE CAMPAIGNS", stageCampaigns);
        console.log("STAGE ID:", stage.stageID);

        return { ...stage, campaigns: stageCampaigns };
      },
      [campaignsData, campaignStage]
    );

    stagesWithCampaigns = assignColorsToStages(stagesWithCampaigns);
    setStages(stagesWithCampaigns);
  }, [campaignsData, campaignStage]); // Ahora la lista de dependencias se pasa correctamente al useEffect

  console.log("Campaigns column", stages);

/* CHANGE STAGE */

const openChangeModal = (stage: any) => {
  setChangeStage(stage);
  setIsModalOpen(true);
};


  /* DELETE STAGE */

  const openDeleteModal = (stageID: any) => {
    const stage = stages.find(stage => stage.stageID === stageID);
    if (stage && stage.campaigns.length > 0) {
      alert("Please move all projects from this stage to another stage before deleting it.");
      return;
    }
    console.log("Setting deleteStageId to:", stageID);
    setDeleteStageId(stageID);
    setIsModalOpen(true);
  };
  
  const handleDelete = async () => {
    if (deleteStageId) {
      const stage = stages.find(stage => stage.stageID === deleteStageId);
      if (stage && stage.campaigns.length > 0) {
        alert("Please move all projects from this stage to another stage before deleting it.");
        return;
      }
  
      deleteCampaignStage(parseInt(deleteStageId), async () => {
        console.log("Stage deleted successfully");
        const remainingStages = stages.filter(stage => stage.stageID !== deleteStageId);
        const updatedStages = remainingStages.map((stage, index) => ({
          ...stage,
          stageIndex: index + 1 // Reassign stageIndex starting from 1
        }));
        setStages(updatedStages); // Update the local state
  
        // Update the backend about the new order
        for (const stage of updatedStages) {
          await putNewOrderCampaign(
            stage.stageID,
            { name: stage.stageName, order: stage.stageIndex },
            () => {},
            (error) => console.error("Failed to update stage order:", error)
          );
        }
  
        updateCampaignData(); // Additional updates if necessary
        setIsModalOpen(false);
        setDeleteStageId(null); // Reset deletion target ID
      }, (error) => {
        console.error("Failed to delete stage:", error);
        alert("Failed to delete stage. Please try again.");
      });
    }
  };

  /* DRAG & DROP */

  const handleDragStartColumn = (e: React.DragEvent, stage: any) => {
    e.dataTransfer.setData("text/plain", stage.stageIndex); // Guardar el índice de la columna basado en `stageIndex`
    e.dataTransfer.setData("stage", JSON.stringify({ stage }));
    console.log("START DATA STAGES", stage);
  };

  const handleDropColumn = async (e: React.DragEvent, newColumn: any) => {
    e.preventDefault();
    const oldColumnData = JSON.parse(e.dataTransfer.getData("stage"));
    const oldColumn = oldColumnData.stage;

    // Verificar si hay un cambio en el orden de las columnas
    if (oldColumn.stageIndex !== newColumn.stageIndex) {
      try {
        // Llamar a la función para actualizar el orden en la base de datos
        await Promise.all([
          putNewOrderCampaign(
            oldColumn.stageID,
            { name: oldColumn.stageName, order: newColumn.stageIndex },
            () => {},
            undefined
          ),
          putNewOrderCampaign(
            newColumn.stageID,
            { name: newColumn.stageName, order: oldColumn.stageIndex },
            () => {},
            undefined
          ),
        ]);

        // Actualizar el estado para reflejar el cambio sin recargar
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

  const handleDragStart = (e: any, campaigns: any, stages: any) => {
    e.dataTransfer.setData("campaigns",JSON.stringify({ ...campaigns, stages }));
    console.log("CAMPAIGNS START DATA", campaigns, stages);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, stageID: any) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del navegador
    setDraggedOverStageIndex(stageID); // Actualizar el estado para iluminar la columna
    setDraggedOverStageIndex(stageID);
  };

  const handleDragLeave = () => {
    setDraggedOverStageIndex(null); // Resetea el estado cuando el drag sale de la columna
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, stageID: any) => {
    setDraggedOverStageIndex(null);
    console.log("Valor de stageID:", stageID);
    try {
      const campaign = JSON.parse(e.dataTransfer.getData("campaigns"));

      // Verificar si campaign_stage es diferente a stageID
      if (campaign.campaign_stage !== stageID) {
        putCampaign(
          campaign.id,
          { ...campaign, campaign_stage: stageID },
          () => {
            // Actualizar el estado para reflejar el cambio sin recargar
            setStages((currentStages) => {
              return currentStages.map((stage) => {
                // Si la columna es la original, eliminar el proyecto
                if (stage.stageID === campaign.campaign_stage) {
                  return {
                    ...stage,
                    campaigns: stage.campaigns.filter(
                      (p: any) => p.id !== campaign.id
                    ),
                  };
                }
                // Si la columna es la de destino, añadir el proyecto
                if (stage.stageID === stageID) {
                  // Verificar si el proyecto ya existe en la columna de destino
                  const existingProjectIndex = stage.campaigns.findIndex(
                    (p: any) => p.id === campaign.id
                  );
                  if (existingProjectIndex === -1) {
                    return {
                      ...stage,
                      campaigns: [
                        ...stage.campaigns,
                        { ...campaign, campaign_stage: stageID },
                      ],
                    };
                  } else {
                    // Si el proyecto ya existe, solo actualizar su posición
                    const updatedCampaign = [...stage.campaigns];
                    updatedCampaign.splice(existingProjectIndex, 1);
                    updatedCampaign.push({
                      ...campaign,
                      campaign_stage: stageID,
                    });
                    return {
                      ...stage,
                      campaigns: updatedCampaign,
                    };
                  }
                }
                // Para las columnas que no están involucradas, se retornan sin cambios
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
      style={{
        gridTemplateColumns: `repeat(${stages.length}, 1fr)`,
      }}
    >
      {stages
        .sort((a, b) => a.stageIndex - b.stageIndex)
        .map((campaignCol, stagesIndex) => {
          console.log("Datos de la columna de campaña:", campaignCol); // Agregar este console.log para verificar los datos de campaignCol
          return (
            <div
              className={`kanban-column ${draggedOverStageIndex === campaignCol.stageID ? 'drag-over-column' : ''}`}
              onDrop={(e) => handleDrop(e, campaignCol.stageID)}
              onDragOver={(e) => handleDragOver(e, campaignCol.stageID)}
              onDragLeave={handleDragLeave}
              onDragStart={(e) => handleDragStartColumn(e, campaignCol)}
              key={campaignCol.stageIndex}
              draggable
            >
              <div
                className={`kanban-header`}
                onDrop={(e) => handleDropColumn(e, campaignCol)}
                onDragStart={(e) => handleDragStartColumn(e, campaignCol)}
              >
                <span
                  className={`stage-tag ${campaignCol.color}`}
                  onDrop={(e) => handleDropColumn(e, campaignCol)}
                  onDragStart={(e) => handleDragStartColumn(e, campaignCol)}
                  draggable
                >
                  {campaignCol.stageName}
                </span>
                {/* {stagesIndex === stages.length - 1 && ( */}
                  <div className="addtags-wrap">
                  <div className="row-wrap-2">
                    <button onClick={() => openChangeModal(campaignCol)}>
                      <Image src={Edit} alt="Icon" width={12} height={12} />
                    </button>
                    <button onClick={() => openDeleteModal(campaignCol.stageID)}>
                      <Image className="exit-icon" src={Plus} alt="Icon" width={15} height={15} />
                    </button>
                  </div>

                    <AddFieldModalCampaign
                      isOpen={isAddModalOpen}
                      onClose={() => setAddModalOpen(false)}
                      title="Add Campaign Stage"
                      updateCampaignData={updateCampaignData}
                    />

                  <ChangeCampaignColumn
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    changeStage={changeStage}
                    title="Change Stage Name"
                    button="Change this stage name"
                    updateCampaignData={updateCampaignData}
                  /> 

                    <ConfirmModal
                      isOpen={isModalOpen && deleteStageId === campaignCol.stageID}
                      onClose={() => setIsModalOpen(false)}
                      title="Delete Campaign Stage"
                      message={`Are you sure you want to delete the stage '${campaignCol.stageName}'?`}
                      onConfirm={handleDelete}
                      button="Yes, delete this stage"
                    />
                    
                  </div>
                {/* )} */}
              </div>
              {campaignCol.campaigns?.map((campaignCard: any) => {
                console.log(
                  "Datos de la tarjeta de campaña:",
                  campaignCol.campaigns
                ); // Agregar este console.log para verificar los datos de campaignCard
                return (
                  <div
                    className="kanban-card"
                    key={campaignCard.id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, campaignCard, campaignCol.stageID)
                    }
                    onClick={() => handleOpenSidepanel(campaignCard)}
                  >
                    <div className="kanban-card-header">
                      <img
                        src={campaignCard.brand_image_url}
                        alt={campaignCard.brand_name}
                        className="brandImage"
                      />
                      <p className="brandTitle">{campaignCard.brand_name}</p>
                    </div>
                    <p className="campaignName">{campaignCard.name}</p>
                    <p className="campaignDescription">
                      {campaignCard.description}
                    </p>
                    <div className="card-tags mt-4">
                      <span className="square-tag green">
                        Due: {campaignCard.deadline}
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

export default CampaignKanban;
