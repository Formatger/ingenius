import React, { useEffect, useState } from "react";
import { getCampaignStages, postCampaignStage } from "@/utils/httpCalls";

interface AddFieldModalCampaignProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  updateCampaignData: () => void;
}

const AddFieldModalCampaign: React.FC<AddFieldModalCampaignProps> = ({
  isOpen,
  onClose,
  title,
  updateCampaignData,
}) => {
  if (!isOpen) return null;

  const [newLabel, setNewLabel] = useState<{
    name: string;
    order: number;
  }>({ name: "", order: -1 });

  useEffect(() => {
    const fetchMaxOrderCampaign = async () => {
      try {
        await getCampaignStages(
          (response) => {
            const maxOrder = Math.max(
              ...response?.map((stage: any) => stage.order)
            );
            setNewLabel((prevLabel) => ({ ...prevLabel, order: maxOrder + 1 }));
          },
          (error) => {
            console.error("Error fetching campaign stages:", error);
          }
        );
      } catch (error) {
        console.error("Error fetching campaign stages:", error);
      }
    };
    fetchMaxOrderCampaign();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setNewLabel((prevLabel) => ({ ...prevLabel, name: newName }));
  };

  const addCampaignStage = async () => {
    try {
      await postCampaignStage(
        newLabel,
        (response) => {
          onClose();
          updateCampaignData();
        },
        (error) => {
          console.error("Error creating campaign:", error);
        }
      );
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h5 className="subtitle">{title}</h5>
            <button type="button" onClick={onClose} className="close-button">
              ×
            </button>
          </div>
        )}
        <div className="modal-content">
          {/* <p className='text'>
            Add a new field to your kanban board here
          </p> */}
          <p className="smallcaps">Add Label</p>
          <input
            type="text"
            placeholder="Label (eg. Prospective)"
            className="app-input"
            value={newLabel.name}
            onChange={handleInputChange}
          />
          <div className="column-center">
            <button
              className="app-button mt-4"
              type="submit"
              onClick={addCampaignStage}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModalCampaign;
