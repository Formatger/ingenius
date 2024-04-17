import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Plus from "@/components/assets/icons/plus.svg";
import Edit from "@/components/assets/icons/edit.svg";
import AddFieldModal from "@/components/dashboard/kanban/AddFieldModal";
import { putCampaign } from '@/utils/httpCalls';

interface Stages {
  id: number;
  name: string;
  order: number;
  user?: string;
}

interface CampaignKanbanProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[];
  campaignStage: Stages[];
  handleOpenSidepanel: (campaign: object) => void;
}

/* HARDCODED COLUMN DATA */
// const initialData = [
//   { columnId: "col-1-not-started", columnName: "Not started", color: "pink", campaigns: [] as any[] },
//   { columnId: "col-2-in-progress", columnName: "In Progress", color: "ivory", campaigns: [] as any[] },
//   { columnId: "col-3-completed", columnName: "Completed", color: "green", campaigns: [] as any[] }
// ];

const CampaignKanban = ({ data, campaignStage, httpError, handleOpenSidepanel }: CampaignKanbanProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignsData, setCampaignsData] = useState<any[]>([]);
  const [stagesWithColors, setStagesWithColors] = useState<any[]>([]);
  const colors = ['pink', 'linen', 'green', 'blue', 'yellow', 'orange', 'red'];

/* FETCH COLUMN STAGES */

  useEffect(() => {
    const loadStagesWithColors = () => {
      const savedStages = localStorage.getItem('stagesWithColors');
      if (savedStages) {
        return JSON.parse(savedStages);
      }
      const newStages = campaignStage.map(stage => ({
        ...stage,
        colorClass: `color-${colors[Math.floor(Math.random() * colors.length)]}`
      }));
      localStorage.setItem('stagesWithColors', JSON.stringify(newStages));
      return newStages;
    };

    const coloredStages = loadStagesWithColors();
    setStagesWithColors(coloredStages);

    const stagesColumns = coloredStages.map((stage: { id: any; name: any; colorClass: any; }) => ({
      columnId: `col-${stage.id}`,
      columnName: stage.name,
      color: stage.colorClass,
      campaigns: data.filter(campaign => campaign.stageId === stage.id)
    }));

    setCampaignsData(stagesColumns);
  }, [campaignStage, data]);

/* DRAG & DROP */

  const handleDragStart = (e: any, campaign: any, columnId: string) => {
    e.dataTransfer.setData('campaign', JSON.stringify({ ...campaign, originColumnId: columnId }));
  };

  // const handleDrop = (e: any, newColumnId: any) => {
  //   e.preventDefault();
  //   const { originColumnId, ...campaign } = JSON.parse(e.dataTransfer.getData('campaign'));

  //   if (originColumnId !== newColumnId) {
  //     setCampaignsData(prevData => prevData.map(column => {
  //       if (column.columnId === originColumnId) {
  //         // Remove the campaign from the origin column
  //         return {...column, campaigns: column.campaigns.filter((c: { id: any; }) => c.id !== campaign.id)};
  //       } else if (column.columnId === newColumnId) {
  //         // Add the campaign to the target column
  //         return {...column, campaigns: [...column.campaigns, campaign]};
  //       }
  //       return column;
  //     }));
  //   }
  // };

  const handleDrop = (e: any, newColumnId: any) => {
    e.preventDefault();
    const { originColumnId, ...campaign } = JSON.parse(e.dataTransfer.getData('campaign'));

    if (originColumnId !== newColumnId) {
      setCampaignsData(prevData => {
        return prevData.map(column => {
          if (column.columnId === originColumnId) {
            // Remove the campaign from the origin column
            return {...column, campaigns: column.campaigns.filter((c: any) => c.id !== campaign.id)};
          } else if (column.columnId === newColumnId) {
            // Add the campaign to the target column
            return {...column, campaigns: [...column.campaigns, campaign]};
          }
          return column;
        });
      });
    }
  };


  // useEffect(() => {
  //   const notStarted = data.filter((campaign: any) => campaign.stage?.toLowerCase() === "not started");
  //   const inProgress = data.filter((campaign: any) => campaign.stage?.toLowerCase() === "in progress");
  //   const completed = data.filter((campaign: any) => campaign.stage?.toLowerCase() === "completed");

  //   console.log(notStarted, inProgress, completed)

  //   setCampaignsData([
  //     { ...campaignsData[0], campaigns: notStarted },
  //     { ...campaignsData[1], campaigns: inProgress },
  //     { ...campaignsData[2], campaigns: completed }
  //   ]);
  // }, []);

  

  // const handleDrop = (e: any, columnId: any, ) => {
  //   try {
  //     const campaign = JSON.parse(e.dataTransfer.getData('campaigns'));
  //     console.log("LEAVE",columnId)
  

  //     console.log("project stage", campaign.campaign_stage);
  //     if (campaign.campaign_stage !== columnId) {
  //       putCampaign(campaign.id, { ...campaign, campaign_stage: columnId }, 
  //         (data) => {
  //           console.log('Success', data);
  //         }, 
  //         (error) => {
  //           console.error('Error', error);
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error PUT:', error);
  //   }
  // };


  return (
    <div className="kanban-container">
      {/* {campaignsData.map((column) => (
        <div
          className="kanban-column"
          onDrop={(e) => handleDrop(e, column.columnId)}
          onDragOver={(e) => e.preventDefault()}
          key={column.columnId}
        >
          <div className="kanban-header">
            <span className={`round-tag ${column.color}`}>{column.columnName}</span>
          </div>

          {column.campaigns?.map((campaign: any) => (
            <div
              className="kanban-card"
              key={campaign.id}
              draggable
              onDragStart={(e) => handleDragStart(e, campaign, column.columnId)}
            >
              <div className="kanban-card-header">
                <img src={campaign.brand_image_url} alt={campaign.brand_name} className="brandImage" />
                <p className="brandTitle">{campaign.brand_name}</p>
              </div>
              <p className="campaignName">{campaign.name}</p>
              <p className="campaignDescription">{campaign.description}</p>
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
            updateProjectData={() => {}}
          >
          </AddFieldModal>

        </div> */}
    </div>
  );
};

export default CampaignKanban;

  // const handleDragStart = (e: any, campaign: any, columnId: any) => {
  //   e.dataTransfer.setData('campaign', JSON.stringify({ ...campaign, columnId }));
  // };

  // const handleDrop = (e: any, columnId: any) => {
  //   const campaign = JSON.parse(e.dataTransfer.getData('campaign'));

  //   setCampaignsData(prevData => {
  //     const newData = prevData.map(column => {
  //       if (column.columnId === campaign.columnId) { // Use campaign's columnId to find the old column
  //         const oldColumn = [...column.campaigns];
  //         const campaignIndex = oldColumn.findIndex(oldCampaign => oldCampaign.id === campaign.id);
  //         if (campaignIndex !== -1) {
  //           oldColumn.splice(campaignIndex, 1);
  //           return { ...column, campaigns: oldColumn };
  //         }
  //       } else if (column.columnId === columnId) { // Use dropped columnId to add the campaign
  //         const newColumn = [...column.campaigns, campaign];
  //         return { ...column, campaigns: newColumn };
  //       }
  //       return column;
  //     });

  //     return newData;
  //   });
  // };









// const initialData = [
//   { columnId: "col-1-not-started", columnName: "Not started", color: "pink", campaigns: [] as any[] },
//   { columnId: "col-2-in-progress", columnName: "In Progress", color: "ivory", campaigns: [] as any[] },
//   { columnId: "col-3-completed", columnName: "Completed", color: "green", campaigns: [] as any[] }
// ];

  // useEffect(() => {
  //   const notStarted = data.filter((campaign: any) => campaign.stage?.toLowerCase() === "not started");
  //   const inProgress = data.filter((campaign: any) => campaign.stage?.toLowerCase() === "in progress");
  //   const completed = data.filter((campaign: any) => campaign.stage?.toLowerCase() === "completed");

  //   console.log(notStarted, inProgress, completed)

  //   setCampaignsData([
  //     { ...campaignsData[0], campaigns: notStarted },
  //     { ...campaignsData[1], campaigns: inProgress },
  //     { ...campaignsData[2], campaigns: completed }
  //   ]);
  // }, []);



  // useEffect(() => {
  //   let savedStages = localStorage.getItem('stagesWithColors');
  //   if (savedStages) {
  //     setStagesWithColors(JSON.parse(savedStages));
  //   } else {
  //     const coloredStages = campaignStage.map(stage => {
  //       const colorClass = `color-${colors[Math.floor(Math.random() * colors.length)]}`;
  //       return { ...stage, colorClass };
  //     });
  //     localStorage.setItem('stagesWithColors', JSON.stringify(coloredStages));
  //     setStagesWithColors(coloredStages);
  //   }
  // }, [campaignStage]);

  // useEffect(() => {
  //   // Transform campaignStage into usable column data
  //   const stagesColumns = campaignStage.map(stage => ({
  //     columnId: `col-${stage.id}`, 
  //     columnName: stage.name,
  //     color: getRandomColor(),
  //     campaigns: data.filter(campaign => campaign.stageId === stage.id) // Match stages with campaigns
  //   }));
    
  //   setCampaignsData(stagesColumns);
  // }, [campaignStage, data]);
