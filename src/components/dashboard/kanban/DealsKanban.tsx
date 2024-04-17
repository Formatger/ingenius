import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Plus from "@/components/assets/icons/plus.svg";
import Edit from "@/components/assets/icons/edit.svg";
import AddFieldModal from "@/components/dashboard/kanban/AddFieldModal";
import { putProject, getProjectStages } from "@/utils/httpCalls";

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
  projectsData: any; // Considera definir tipos más específicos si es posible
  handleOpenSidepanel: (project: object) => void;
  projectStage: any; // Considera definir un tipo más específico si es posible
  updateProjectData: () => void;
}

const DealsKanban = ({ projectsData, data, httpError, handleOpenSidepanel, projectStage, updateProjectData }: DealsKanbanProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectsColumn, setProjectsColumn] = useState<any[]>([]);
  const [draggedOverStageIndex, setDraggedOverStageIndex] = useState<string | null>(null); // Estado para almacenar el ID de la columna sobre la que se arrastra
  const [stages, setStages] = useState<any[]>([]);

  console.log(projectStage)


  /* FETCH STAGE COLUMNS */

  useEffect(() => {
    if (projectStage.length === 0) return; // Evitar procesamiento si projectStage está vacío

    const stagesWithProjects = projectStage.map((stage: any) => {
      const stageProjects = projectsData.filter((project: any) => {
        console.log("PROJECT PROJECT_STAGE", project.project_stage); // Agregado console.log para project.project_stage
        return project.project_stage === stage.stageID;
      })
      console.log("STAGE PROJECTS", stageProjects);
      console.log("STAGE ID:", stage.stageID);

      return { ...stage, projects: stageProjects };
    }, [projectsData, projectStage]);

    setStages(stagesWithProjects);
  }, [projectsData, projectStage]);

  console.log("Projects column", stages);


  /* DRAG DROP */

  const handleDragStart = (e: any, projects: any, stageID: any, stageIndex?: any) => {
    e.dataTransfer.setData('projects', JSON.stringify({ ...projects, stageID }));
    e.dataTransfer.setData('stageOrder', stageIndex); // Establecer el ID de la columna en dataTransfer
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, stageID: string, stageIndex: any) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del navegador
    setDraggedOverStageIndex(stageID); // Actualizar el estado para iluminar la columna
    setDraggedOverStageIndex(stageIndex);
  };

  const handleDragLeave = () => {
    setDraggedOverStageIndex(null); // Resetea el estado cuando el drag sale de la columna
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, stageID: string, stageIndex: any) => {
    setDraggedOverStageIndex(null);
    console.log('Valor de stageID:', stageID);
    try {
      const project = JSON.parse(e.dataTransfer.getData('projects'));

      // Verificar si project_stage es diferente a columnId
      if (project.project_stage !== stageID) {
        putProject(project.id, { ...project, project_stage: stageID },
          () => {
            // Actualizar el estado para reflejar el cambio sin recargar
            setStages((currentColumns) => {
              console.log("current columns", currentColumns);
              return currentColumns.map((col) => {
                // Remover el proyecto de su columna original
                if (col.stageID === project.stageID) {
                  return {
                    ...col,
                    projects: col.projects.filter((p: any) => p.id !== project.id),
                  };
                }
                // Añadir el proyecto a la columna destino
                if (col.stageID === stageID) {
                  return {
                    ...col,
                    projects: [...col.projects, { ...project, project_stage: stageID }],
                  };
                }
                // Para las columnas que no están involucradas, se retornan sin cambios
                return col;
              });
            });
          },
          (error) => {
            console.error('Error al actualizar el proyecto:', error);
          }
        );
      }
    } catch (error) {
      console.error('Error al procesar la solicitud PUT:', error);
    }
    try {
      const stage = JSON.parse(e.dataTransfer.getData('stageorder'));
      console.log('Valor de stageIndex:', stage.stageIndex);
      if (stage.stageIndex !== stageIndex) {
        putProject(stage.stageIndex, { ...stage, order: stageIndex },
          () => {
            // Aquí puedes realizar acciones adicionales si es necesario
          },
          (error) => {
            console.error('Error al actualizar el índice de la columna:', error);
          }
        );
      }
    } catch (error) {
      console.error('Error al procesar la solicitud PUT para el índice de la columna:', error);
    }
  };
  return (
    <div className="kanban-container">
      {stages
        .sort((a, b) => a.stageIndex - b.stageIndex)
        .map((projectCol) => (
          <div
            className={`kanban-column ${draggedOverStageIndex === projectCol.stageIndex ? 'drag-over-column' : ''}`}
            onDrop={(e) => handleDrop(e, projectCol.stageID, projectCol.stageIndex)}
            onDragOver={(e) => handleDragOver(e, projectCol.stageID, projectCol.stageIndex)}
            onDragLeave={handleDragLeave}
            key={projectCol.stageIndex}
            draggable
          >
            <div className="kanban-header">
              <span className={`round-tag ${projectCol.color}`}>{projectCol.stageName}</span>
            </div>

            {projectCol.projects?.map((projectCard: any) => (
              <div
                className="kanban-card"
                key={projectCard.id}
                draggable
                onDragStart={(e) => handleDragStart(e, projectCard, projectCol.stageID)}
                onClick={() => handleOpenSidepanel(projectCard)}
              >
                <div className="kanban-card-header">
                  <img src={projectCard.creator_profile_picture} alt={projectCard.creator_name} className="brandImage" />
                  <p className="brandTitle">{projectCard.creator_name}</p>
                </div>
                <p className="campaignName">{projectCard.name}</p>
                <p className="campaignDescription">{projectCard.description}</p>
                <div className="card-tags mt-4">
                  <span className="square-tag green">Due: {projectCard.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      <div className='addtags-wrap'>
        <div className='row-wrap-2'>
          <button onClick={() => setIsModalOpen(true)}>
            <Image src={Plus} alt="Icon" width={15} height={15} />
          </button>
          <button>
            <Image src={Edit} alt="Icon" width={15} height={15} />
          </button>
        </div>

        <AddFieldModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Field"
          updateProjectData={updateProjectData}
        />
      </div>
    </div>
  );
};

export default DealsKanban;
