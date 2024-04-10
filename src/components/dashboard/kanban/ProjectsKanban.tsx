import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Plus from "@/components/assets/icons/plus.svg";
import Edit from "@/components/assets/icons/edit.svg";
import AddFieldModal from "@/components/dashboard/kanban/AddFieldModal";
import { putProject} from "@/utils/httpCalls";
import { Console } from 'console';


interface Stages2 {
  id: number;
  name: string;
  order: number;
  user?: string;
}

interface ProjectsKanbanProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[];
  projectsData: any;
  projectStage: Stages2[];
  handleOpenSidepanel: (campaign: object) => void;
}

/* HARDCODED COLUMN DATA */
const initialData = [
  { columnId: "1", columnName: "Contract Signed", color: "pink", projects: [] as any[] },
  { columnId: "2", columnName: "Content Created", color: "ivory", projects: [] as any[] },
  { columnId: "3", columnName: "Content Approved", color: "green", projects: [] as any[] }
];
console.log(initialData)

// const colors = ['pink', 'linen', 'green', 'blue', 'yellow', 'orange', 'red'];

const ProjectsKanban = ({ projectsData, data, projectStage, httpError, handleOpenSidepanel }: ProjectsKanbanProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsColumn, setProjectsColumn] = useState<any[]>([]);
  const [stagesProjectWithColors, setProjectStagesWithColors] = useState<any[]>([]);


  /* FETCH REAL COLUMN STAGES */

  // useEffect(() => {
  //   const loadProjectStagesWithColors = () => {
  //     const savedProjectStages = localStorage.getItem('projectStagesWithColors');
  //     if (savedProjectStages) {
  //       return JSON.parse(savedProjectStages);
  //     }
  //     const newProjectStages = projectStage.map(stage => ({
  //       ...stage,
  //       colorClass: `color-${colors[Math.floor(Math.random() * colors.length)]}`
  //     }));
  //     localStorage.setItem('projectStagesWithColors', JSON.stringify(newProjectStages));
  //     return newProjectStages;
  //   };

  //   const coloredStages = loadProjectStagesWithColors();
  //   setProjectStagesWithColors(coloredStages);

  //   const projectStagesColumns = coloredStages.map((stage: { id: any; name: any; colorClass: any; }) => ({
  //     columnId: `col-${stage.id}`,
  //     columnName: stage.name,
  //     color: stage.colorClass,
  //     projects: projectsData.filter((project: { stageId: any; }) => project.stageId === stage.id)
  //   }));

  //   setProjectsColumn(projectStagesColumns);
  // }, [projectStage, projectsData]);
  
  
/* HARDCODED COLUMN STAGES */

  useEffect(() => {
    const notStarted = projectsData.filter((project: any) => project.project_stage?.toString() === "1");
    const inProgress = projectsData.filter((project: any) => project.project_stage?.toString() === "2");
    const completed = projectsData.filter((project: any) => project.project_stage?.toString() === "3");

    console.log("eo",notStarted)

    const mergedProjects = [[...notStarted], [...inProgress], [...completed]];
    console.log("eo",mergedProjects)

    setProjectsColumn([
      { ...initialData[0], projects: notStarted },
      { ...initialData[1], projects: inProgress },
      { ...initialData[2], projects: completed }
    ]);
  }, []);

  console.log(projectsColumn)

/* DRAG DROP */

  const handleDragStart = (e: any, projects: any, columnId: any) => {
    e.dataTransfer.setData('projects', JSON.stringify({ ...projects, columnId }));
    console.log(columnId)
  };

  const handleDrop = (e: any, columnId: any, ) => {
    try {
      const project = JSON.parse(e.dataTransfer.getData('projects'));
      console.log("DEJAR",columnId)
  
      // Verificar si project_stage es diferente a columnId
      console.log("project stage", project.project_stage);
      if (project.project_stage !== columnId) {
        putProject(project.id, { ...project, project_stage: columnId }, 
          (data) => {
            // Manejar la respuesta exitosa
            console.log('Proyecto actualizado con éxito:', data);
            // Aquí podrías actualizar localmente projectsColumn con los nuevos datos si es necesario
          }, 
          (error) => {
            // Manejar el error
            console.error('Error al actualizar el proyecto:', error);
          }
        );
      }
    } catch (error) {
      console.error('Error al procesar la solicitud PUT:', error);
    }
  };

  return (
    <div className="kanban-container">
      {projectsColumn.map((projectCol) => (
        <div
          className="kanban-column"
          onDrop={(e) => handleDrop(e, projectCol.columnId)}
          onDragOver={(e) => e.preventDefault()}
          key={projectCol.columnId}
        >
          <div className="kanban-header">
            <span className={`round-tag ${projectCol.color}`}>{projectCol.columnName}</span>
          </div>

          {projectCol.projects?.map((projectCard: any) => (
            <div
              className="kanban-card"
              key={projectCard.id}
              draggable
              onDragStart={(e) => handleDragStart(e, projectCard, projectCol.columnId)}
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

          <AddFieldModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
            title="Add Field">
          </AddFieldModal>

        </div>
    </div>
  );
};

export default ProjectsKanban;

  // ESTE SERA EL CÓDIGO CUANDO SE HAGA EL PUT QUE VAYA CAMBIANDO EL CAMPO PROJECTS-SYTAGE EN EL API                
  // const handleDrop = (e: any, columnId: any) => {
  //   const project = JSON.parse(e.dataTransfer.getData('projects'));
  
  //   setProjectsColumn(prevData => {
  //     return prevData.map(column => {
  //       if (column.columnId === project.columnId) {
  //         // Elimina la tarjeta de la columna original si el project_stage cambia
  //         if (column.columnId !== columnId) {
  //           const oldColumn = column.projects.filter(oldProject => oldProject.id !== project.id);
  //           return { ...column, projects: oldColumn };
  //         }
  //       } else if (column.columnId === columnId) {
  //         // Agrega la tarjeta a la nueva columna si el project_stage cambia
  //         if (project.project_stage !== column.columnId) {
  //           const newColumn = [...column.projects, project];
  //           return { ...column, projects: newColumn };
  //         }
  //       }
  //       return column;
  //     });
  //   });
  // };