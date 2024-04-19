import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Plus from "@/components/assets/icons/plus.svg";
import Edit from "@/components/assets/icons/edit.svg";
import AddFieldModalCampaign from "@/components/dashboard/kanban/AddFieldModal";
import { putCampaign } from '@/utils/httpCalls';



interface CampaignKanbanProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[];
  campaignStage: any;
  campaignData: any;
  handleOpenSidepanel: (campaign: object) => void;
  updateCampaignData: () => void;
}



const CampaignKanban = ({ campaignData, campaignStage, httpError, handleOpenSidepanel,updateCampaignData }: CampaignKanbanProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stagesWithColors, setStagesWithColors] = useState<any[]>([]);
  const [draggedOverStageIndex, setDraggedOverStageIndex] = useState<string | null>(null); // Estado para almacenar el ID de la columna sobre la que se arrastra
  const [stages, setStages] = useState<any[]>([]);
  const colors = ['pink', 'linen', 'green', 'blue', 'yellow', 'orange', 'red'];

  console.log(campaignStage)
  console.log(campaignData)

/* FETCH COLUMN STAGES */

useEffect(() => {
  if (campaignStage.length === 0) return; // Evitar procesamiento si campaignStage está vacío

  const stagesWithCampaigns = campaignStage.map((stage: any) => {
    const stageCampaigns = campaignData.filter((campaign: any) => {
      console.log("CAMPAIGN CAMPAIGN_STAGE", campaign.campaign_stage); // Agregado console.log para campaign.campaign_stage
      return campaign.campaign_stage === stage.stageID;
    });
    console.log("STAGE CAMPAIGNS", stageCampaigns);
    console.log("STAGE ID:", stage.stageID);

    return { ...stage, campaigns: stageCampaigns };
    }, [campaignData, campaignStage]);


  setStages(stagesWithCampaigns);
}, [campaignData, campaignStage]); // Ahora la lista de dependencias se pasa correctamente al useEffect

console.log("Campaigns column", stages);



/* DRAG & DROP */

  /* DRAG DROP */

  // const handleDragStartColumn = (e: any, stage: any) => {
  //   // e.dataTransfer.setData('text/plain', stage.stageIndex);  // Guardar el índice de la columna basado en `stageIndex`
  //   e.dataTransfer.setData('stage', JSON.stringify({stage}));
  //   console.log("START DATA STAGES", stage)
  // };
  

 
  // const handleDropColumn = async (e, newColumn) => {
  //   e.preventDefault();
  //   const oldColumn = JSON.parse(e.dataTransfer.getData('stage'));
  //   console.log('Valor de OLD COLUMN:', oldColumn);
  //   console.log('Valor de NEW COLUMN:', newColumn);
  
  //   // Intercambiar los valores de stageIndex entre oldColumn y newColumn
  //   const tempIndex = oldColumn.stageIndex;
  //   oldColumn.stageIndex = newColumn.stageIndex;
  //   newColumn.stageIndex = tempIndex;
  
  //   // Actualizar el estado de las columnas con los nuevos valores de stageIndex
  //   setStages((currentStages) => {
  //     const updatedStages = currentStages.map((stage) => {
  //       if (stage.stageID === oldColumn.stageID) {
  //         return { ...newColumn }; // Actualizar la columna original con el stageIndex de la columna de destino
  //       }
  //       if (stage.stageID === newColumn.stageID) {
  //         return { ...oldColumn }; // Actualizar la columna de destino con el stageIndex de la columna original
  //       }
  //       // Devolver todas las demás columnas sin cambios
  //       return stage;
  //     });
  //     return updatedStages;
  //   });
  // };

  const handleDragStart = (e: any, campaigns : any, stages: any) => {
    e.dataTransfer.setData('campaigns', JSON.stringify({ ...campaigns, stages }));
    console.log("CAMPAIGNS START DATA", campaigns, stages)
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
    console.log('Valor de stageID:', stageID);
    try {
      const campaign = JSON.parse(e.dataTransfer.getData('campaigns'));

      // Verificar si campaign_stage es diferente a stageID
      if (campaign.campaign_stage !== stageID) {
        putCampaign(campaign.id, { ...campaign, campaign_stage: stageID },
          () => {
            // Actualizar el estado para reflejar el cambio sin recargar
            setStages((currentStages) => {
              return currentStages.map((stage) => {
                // Si la columna es la original, eliminar el proyecto
                if (stage.stageID === campaign.campaign_stage) {
                  return {
                    ...stage,
                    campaigns: stage.campaigns.filter((p: any) => p.id !== campaign.id),
                  };
                }
                // Si la columna es la de destino, añadir el proyecto
                if (stage.stageID === stageID) {
                  // Verificar si el proyecto ya existe en la columna de destino
                  const existingProjectIndex = stage.campaigns.findIndex((p: any) => p.id === campaign.id);
                  if (existingProjectIndex === -1) {
                    return {
                      ...stage,
                      campaigns: [...stage.campaigns, { ...campaign, campaign_stage: stageID }],
                    };
                  } else {
                    // Si el proyecto ya existe, solo actualizar su posición
                    const updatedCampaign = [...stage.campaigns];
                    updatedCampaign.splice(existingProjectIndex, 1);
                    updatedCampaign.push({ ...campaign, campaign_stage: stageID });
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
      {stages
        .sort((a, b) => a.stageIndex - b.stageIndex)
        .map((campaignCol) => {
          console.log("Datos de la columna de campaña:", campaignCol); // Agregar este console.log para verificar los datos de campaignCol
          return (
            <div
              className={`kanban-column ${draggedOverStageIndex === campaignCol.stageIndex ? 'drag-over-column' : ''}`}
              onDrop={(e) => {handleDrop(e, campaignCol.stageID); handleDropColumn(e, campaignCol);}}
              onDragOver={(e) => handleDragOver(e, campaignCol.stageID)}
              onDragLeave={handleDragLeave}
              onDragStart={(e) => handleDragStartColumn(e, campaignCol)}
              key={campaignCol.stageIndex}
              draggable
            >
              <div className="kanban-header">
                <span className={`round-tag stone ${campaignCol.color}`}>
                  {campaignCol.stageName}
                </span>
              </div>
              {campaignCol.campaigns?.map((campaignCard: any) => {
                console.log("Datos de la tarjeta de campaña:", campaignCol.campaigns); // Agregar este console.log para verificar los datos de campaignCard
                return (
                  <div
                    className="kanban-card"
                    key={campaignCard.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, campaignCard, campaignCol.stageID)}
                    onClick={() => handleOpenSidepanel(campaignCard)}
                  >
                    <div className="kanban-card-header">
                      <img src={campaignCard.brand_image_url} alt={campaignCard.brand_name} className="brandImage" />
                      <p className="brandTitle">{campaignCard.brand_name}</p>
                    </div>
                    <p className="campaignName">{campaignCard.name}</p>
                    <p className="campaignDescription">{campaignCard.description}</p>
                    <div className="card-tags mt-4">
                      <span className="square-tag green">Due: {campaignCard.deadline}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      <div className='addtags-wrap'>
        <div className='row-wrap-2'>
          <button onClick={() => setIsModalOpen(true)}>
            <Image src={Plus} alt="Icon" width={15} height={15} />
          </button>
          <button>
            <Image src={Edit} alt="Icon" width={15} height={15} />
          </button>
        </div>
        <AddFieldModalCampaign
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Field"
          updateCampaignData={updateCampaignData}
        />
      </div>
    </div>
  );
};

export default CampaignKanban;