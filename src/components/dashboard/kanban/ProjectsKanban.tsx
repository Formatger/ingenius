import React, { useEffect, useState } from "react";
import Image from "next/image";
import Plus from "@/components/assets/icons/plus.svg";
import PlusWhite from "@/components/assets/icons/plus-white.svg";
import Edit from "@/components/assets/icons/edit.svg";
import AddFieldModal from "@/components/dashboard/kanban/AddFieldModal";
import { putProject, putNewOrderProject, deleteProjectStage } from "@/utils/httpCalls";
import ConfirmModal from "../profile/ConfirmModal";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [draggedOverStageIndex, setDraggedOverStageIndex] = useState<string | null>(null); // Estado para almacenar el ID de la columna sobre la que se arrastra
  const [stages, setStages] = useState<any[]>([]);
  const [deleteStageId, setDeleteStageId] = useState<string | null>(null);
  const colors = ["pink", "linen", "green", "blue", "yellow", "orange", "red"];

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

  /* FETCH STAGE COLUMNS */

  useEffect(() => {
    if (projectStage.length === 0) return; // Evitar procesamiento si projectStage está vacío

    let stagesWithProjects = projectStage.map(
      (stage: any) => {
        const stageProjects = projectsData.filter((project: any) => {
          console.log("PROJECT PROJECT_STAGE", project.project_stage); // Agregado console.log para project.project_stage
          return project.project_stage === stage.stageID;
        });
        console.log("STAGE PROJECTS", stageProjects);
        console.log("STAGE ID:", stage.stageID);

        return { ...stage, projects: stageProjects };
      },
      [projectsData, projectStage]
    );

    stagesWithProjects = assignColorsToStages(stagesWithProjects);
    setStages(stagesWithProjects);
  }, [projectsData, projectStage]);

  console.log("Projects column", stages);

  /* DELETE STAGE */

  const openDeleteModal = (stageID: any) => {
    const stage = stages.find(stage => stage.stageID === stageID);
    if (stage && stage.projects.length > 0) {
      alert("Please move all projects from this stage to another stage before deleting it.");
      return;
    }
    console.log("Setting deleteStageId to:", stageID);
    setDeleteStageId(stageID);
    setModalOpen(true);
  };
  
  const handleDelete = async () => {
    if (deleteStageId) {
      const stage = stages.find(stage => stage.stageID === deleteStageId);
      // Ensure the stage is empty before allowing deletion
      if (stage && stage.projects.length > 0) {
        alert("Please move all projects from this stage to another stage before deleting it.");
        return;
      }
  
      // Call the API to delete the stage
      deleteProjectStage(parseInt(deleteStageId), () => {
        // Success callback
        console.log("Stage deleted successfully");
        const updatedStages = stages.filter(stage => stage.stageID !== deleteStageId);
        setStages(updatedStages); // Update the local state to reflect the change
        updateProjectData(); // Additional updates if necessary
        setModalOpen(false);
        setDeleteStageId(null); // Reset deletion target ID
      }, (error) => {
        // Error callback
        console.error("Failed to delete stage:", error);
        alert("Failed to delete stage. Please try again.");
      });
    }
  };

  /* DRAG DROP COLUMNS */

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
          putNewOrderProject(
            oldColumn.stageID,
            { name: oldColumn.stageName, order: newColumn.stageIndex },
            () => {},
            undefined
          ),
          putNewOrderProject(
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

  /* DRAG DROP CARDS  */

  const handleDragStart = (e: any, projects: any, stages: any) => {
    e.dataTransfer.setData("projects", JSON.stringify({ ...projects, stages }));
    console.log("START DATA", projects, stages);
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
      const project = JSON.parse(e.dataTransfer.getData("projects"));

      // Verificar si project_stage es diferente a stageID
      if (project.project_stage !== stageID) {
        putProject(
          project.id,
          { ...project, project_stage: stageID },
          () => {
            // Actualizar el estado para reflejar el cambio sin recargar
            setStages((currentStages) => {
              return currentStages.map((stage) => {
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
        .map((projectCol, stagesIndex) => (
          <div
            className={`kanban-column ${draggedOverStageIndex === projectCol.stageID ? 'drag-over-column' : ''}`}
            onDrop={(e) => {handleDrop(e, projectCol.stageID);}}
            onDragOver={(e) => handleDragOver(e, projectCol.stageID)}
            onDragLeave={handleDragLeave}
            onDragStart={(e) => handleDragStartColumn(e, projectCol)}
            key={projectCol.stageIndex}
            draggable
          >
            <div className={`kanban-header`}
              onDrop={(e) => handleDropColumn(e, projectCol)}
              onDragStart={(e) => handleDragStartColumn(e, projectCol)}>
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
                    <button onClick={() => setEditModalOpen(true)}>
                      <Image src={Edit} alt="Icon" width={12} height={12} />
                    </button>
                    <button onClick={() => openDeleteModal(projectCol.stageID)}>
                      <Image className="exit-icon" src={Plus} alt="Icon" width={15} height={15} />
                    </button>
                  </div>

                  <ConfirmModal
                    isOpen={isModalOpen && deleteStageId === projectCol.stageID}
                    onClose={() => setModalOpen(false)}
                    title="Confirm Delete"
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
                <p className="campaignName">{projectCard.name}</p>
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

        <div className="addstage-wrap">
          <button className="add-stage-btn" onClick={() => setAddModalOpen(true)}>
            <Image src={Plus} alt="Icon" width={12} height={12} />
            Add Stage
          </button>

          <AddFieldModal
            isOpen={isAddModalOpen}
            onClose={() => setAddModalOpen(false)}
            title="Add Project Stage"
            updateProjectData={updateProjectData}
          />
        </div>
                    
    </div>
  );
};

export default ProjectsKanban;
