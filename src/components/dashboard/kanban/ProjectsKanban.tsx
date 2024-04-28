import React, { useEffect, useState } from "react";
import Image from "next/image";
import Plus from "@/components/assets/icons/plus.svg";
import PlusWhite from "@/components/assets/icons/plus-white.svg";
import Edit from "@/components/assets/icons/edit.svg";
import AddFieldModal from "@/components/dashboard/kanban/AddFieldModal";
import {
  putProject,
  putNewOrderProject,
  deleteProjectStage,
} from "@/utils/httpCalls";
import ConfirmModal from "../profile/ConfirmModal";
import ChangeProjectColumn from "@/components/dashboard/kanban/ChangeProjectColumn";
import ErrorModal from "@/components/common/ErrorModal";

interface ProjectsKanbanProps {
  projectsData: any;
  projectStage: any;
  updateProjectData: () => void;
  handleOpenSidepanel: (project: object) => void;
}

const ProjectsKanban = ({
  projectsData,
  handleOpenSidepanel,
  projectStage,
  updateProjectData,
}: ProjectsKanbanProps) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [draggedOverStageIndex, setDraggedOverStageIndex] = useState<
    string | null
  >(null); // Estado para almacenar el ID de la columna sobre la que se arrastra
  const [stages, setStages] = useState<any[]>([]);
  const [deleteStageId, setDeleteStageId] = useState<string | null>(null);
  const [changeStage, setChangeStage] = useState<string | null>(null);
  const colors = ["pink", "linen", "green", "blue", "yellow", "orange", "red"];
  const [lockedProjects, setLockedProjects] = useState<any>(false);
  const [showLockModal, setShowLockModal] = useState<any>(false);

  useEffect(() => {
    const lockedProjects = projectsData?.find(
      (project: any) => project.is_locked
    );

    setLockedProjects(lockedProjects ? true : false);
  }, []);

  /* ASSIGN COLOR TO STAGES */

  const assignColorsToStages = (stages: any[]) => {
    const storedColors = localStorage.getItem("stageColors");
    const colorsMap = storedColors ? JSON.parse(storedColors) : {};

    const coloredStages = stages?.map((stage) => {
      if (!colorsMap[stage.stageID]) {
        colorsMap[stage.stageID] = `color-${colors[Math.floor(Math.random() * colors.length)]
          }`;
      }
      return { ...stage, color: colorsMap[stage.stageID] };
    });

    localStorage.setItem("stageColors", JSON.stringify(colorsMap));
    return coloredStages;
  };

  /* FETCH STAGE COLUMNS */

  useEffect(() => {
    if (projectStage.length === 0) return; // Evitar procesamiento si projectStage está vacío

    let stagesWithProjects = projectStage?.map(
      (stage: any) => {
        const stageProjects = projectsData.filter((project: any) => {
          return project.project_stage === stage.stageID;
        });

        return { ...stage, projects: stageProjects };
      },
      [projectsData, projectStage]
    );

    stagesWithProjects = assignColorsToStages(stagesWithProjects);
    setStages(stagesWithProjects);
  }, [projectsData, projectStage]);

  /* EDIT STAGE */

  const openChangeModal = (stageID: any) => {
    setChangeStage(stageID);
    setEditModalOpen(true);
  };

  /* DELETE STAGE */

  const openDeleteModal = (stageID: any) => {
    const stage = stages.find((stage) => stage.stageID === stageID);
    if (stage && stage.projects.length > 0) {
      alert(
        "Please move all projects from this stage to another stage before deleting it."
      );
      return;
    }
    setDeleteStageId(stageID);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (deleteStageId) {
      const stage = stages.find((stage) => stage.stageID === deleteStageId);
      if (stage && stage.projects.length > 0) {
        alert(
          "Please move all projects from this stage to another stage before deleting it."
        );
        return;
      }

      deleteProjectStage(
        parseInt(deleteStageId),
        async () => {
          const remainingStages = stages.filter(
            (stage) => stage.stageID !== deleteStageId
          );
          const updatedStages = remainingStages?.map((stage, index) => ({
            ...stage,
            stageIndex: index + 1, // Reassign stageIndex starting from 1
          }));
          setStages(updatedStages); // Update the local state

          // Update the backend about the new order
          for (const stage of updatedStages) {
            await putNewOrderProject(
              stage.stageID,
              { name: stage.stageName, order: stage.stageIndex },
              () => { },
              (error) => console.error("Failed to update stage order:", error)
            );
          }

          updateProjectData(); // Additional updates if necessary
          setIsModalOpen(false);
          setDeleteStageId(null); // Reset deletion target ID
        },
        (error) => {
          console.error("Failed to delete stage:", error);
          alert("Failed to delete stage. Please try again.");
        }
      );
    }
  };

  /* DRAG DROP COLUMNS */

  const handleDragStartColumn = (e: React.DragEvent, stage: any) => {
    e.dataTransfer.setData("text/plain", stage.stageIndex); // Guardar el índice de la columna basado en `stageIndex`
    e.dataTransfer.setData("stage", JSON.stringify({ stage }));
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
          putNewOrderProject(
            oldColumn.stageID,
            { name: oldColumn.stageName, order: newColumn.stageIndex },
            () => { },
            undefined
          ),
          putNewOrderProject(
            newColumn.stageID,
            { name: newColumn.stageName, order: oldColumn.stageIndex },
            () => { },
            undefined
          ),
        ]);

        // Actualizar el estado para reflejar el cambio sin recargar
        setStages((currentStages) => {
          return currentStages?.map((stage) => {
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

  /* DRAG DROP CARDS  */

  const handleDragStart = (e: any, projects: any, stages: any) => {
    e.dataTransfer.setData("projects", JSON.stringify({ ...projects, stages }));
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
    try {
      const project = JSON.parse(e.dataTransfer.getData("projects"));

      // Verificar si project_stage es diferente a stageID
      if (project.project_stage !== stageID) {
        if (project.is_locked) {
          setShowLockModal(true);
          return;
        } else {
          putProject(
            project.id,
            { ...project, project_stage: stageID },
            () => {
              // Actualizar el estado para reflejar el cambio sin recargar
              setStages((currentStages) => {
                return currentStages?.map((stage) => {
                  // Si la columna es la original, eliminar el proyecto
                  if (stage.stageID === project.project_stage) {
                    return {
                      ...stage,
                      projects: stage.projects.filter(
                        (p: any) => p.id !== project.id
                      ),
                    };
                  }
                  // Si la columna es la de destino, añadir el proyecto
                  if (stage.stageID === stageID) {
                    // Verificar si el proyecto ya existe en la columna de destino
                    const existingProjectIndex = stage.projects.findIndex(
                      (p: any) => p.id === project.id
                    );
                    if (existingProjectIndex === -1) {
                      return {
                        ...stage,
                        projects: [
                          ...stage.projects,
                          { ...project, project_stage: stageID },
                        ],
                      };
                    } else {
                      // Si el proyecto ya existe, solo actualizar su posición
                      const updatedProjects = [...stage.projects];
                      updatedProjects.splice(existingProjectIndex, 1);
                      updatedProjects.push({
                        ...project,
                        project_stage: stageID,
                      });
                      return {
                        ...stage,
                        projects: updatedProjects,
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
      {showLockModal && (
        <ErrorModal
          isOpen={showLockModal}
          onClose={() => setShowLockModal(false)}
          title="Stages are locked"
          message="Project currently being edited by another user. Please try again later."
        />
      )}
      {stages
        .sort((a, b) => a.stageIndex - b.stageIndex)
        .map((projectCol, stagesIndex) => (
          <div
            className={`kanban-column ${draggedOverStageIndex === projectCol.stageID
              ? "drag-over-column"
              : ""
              }`}
            onDrop={(e) => {
              handleDrop(e, projectCol.stageID);
            }}
            onDragOver={(e) => handleDragOver(e, projectCol.stageID)}
            onDragLeave={handleDragLeave}
            onDragStart={(e) => handleDragStartColumn(e, projectCol)}
            key={projectCol.stageIndex}
            draggable
          >
            <div
              className={`kanban-header`}
              onDrop={(e) => handleDropColumn(e, projectCol)}
              onDragStart={(e) => handleDragStartColumn(e, projectCol)}
            >
              <span
                className={`stage-tag stone ${projectCol.color}`}
                onDrop={(e) => {
                  handleDropColumn(e, projectCol);
                }}
                onDragStart={(e) => handleDragStartColumn(e, projectCol)}
                draggable
              >
                {projectCol.stageName}
              </span>
              {/* {stagesIndex === stages.length - 1 && ( */}
              <div className="addtags-wrap">
                <div className="row-wrap-2">
                  <button
                    onClick={() => {
                      if (lockedProjects) {
                        setShowLockModal(true);
                      } else {
                        openChangeModal(projectCol);
                      }
                    }}
                  >
                    <Image src={Edit} alt="Icon" width={12} height={12} />
                  </button>
                  <button
                    onClick={() => {
                      if (lockedProjects) {
                        setShowLockModal(true);
                      } else {
                        openDeleteModal(projectCol.stageID);
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

                {/* Add Modal */}
                <AddFieldModal
                  isOpen={isAddModalOpen}
                  onClose={() => setAddModalOpen(false)}
                  title="Add Project Stage"
                  updateProjectData={updateProjectData}
                />

                {/* Edit Modal */}
                <ChangeProjectColumn
                  isOpen={isEditModalOpen}
                  onClose={() => setEditModalOpen(false)}
                  changeStage={changeStage}
                  title="Edit Stage Name"
                  button="Save"
                  updateProjectData={updateProjectData}
                />

                {/* Delete Stage Modal */}
                <ConfirmModal
                  isOpen={isModalOpen && deleteStageId === projectCol.stageID}
                  onClose={() => setIsModalOpen(false)}
                  title="Delete Project Stage"
                  message={`Are you sure you want to delete the stage '${projectCol.stageName}'?`}
                  onConfirm={handleDelete}
                  button="Yes, delete this stage"
                />
              </div>
              {/* )} */}
            </div>

            {projectCol.projects?.map((projectCard: any) => (
              <div
                className="kanban-card"
                key={projectCard.id}
                draggable
                onDragStart={(e) =>
                  handleDragStart(e, projectCard, projectCol.stageID)
                }
                onClick={() => handleOpenSidepanel(projectCard)}
              >
                <div className="kanban-card-header">
                  <img
                    src={projectCard.creator_profile_picture}
                    alt={projectCard.creator_name}
                    className="brandImage"
                  />
                  <p className="brandTitle">{projectCard.creator_name}</p>
                </div>
                <p className="kanbancard-name">{projectCard.name}</p>
                <p className="campaignDescription">{projectCard.description}</p>
                <div className="card-tags mt-4">
                  <span className="square-tag green">
                    Due: {projectCard.deadline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}

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

export default ProjectsKanban;
