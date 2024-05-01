import React, { useEffect, useState } from "react";
import { postProjectStage, getProjectStages } from "@/utils/httpCalls";

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  updateProjectData: () => void;
}

const AddFieldModal: React.FC<AddFieldModalProps> = ({
  isOpen,
  onClose,
  title,
  updateProjectData,
}) => {
  if (!isOpen) return null;

  const [newLabel, setNewLabel] = useState<{
    name: string;
    order: number;
  }>({ name: "", order: -1 });

  useEffect(() => {
    const fetchMaxOrder = async () => {
      try {
        await getProjectStages(
          (response) => {
            const maxOrder = Math.max(
              ...response?.map((stage: any) => stage.order)
            );
            setNewLabel((prevLabel) => ({ ...prevLabel, order: maxOrder + 1 }));
          },
          (error) => {
            console.error("Error fetching project stages:", error);
          }
        );
      } catch (error) {
        console.error("Error fetching project stages:", error);
      }
    };
    fetchMaxOrder();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setNewLabel((prevLabel) => ({ ...prevLabel, name: newName }));
  };

  const addProjectStage = async () => {
    try {
      await postProjectStage(
        newLabel,
        (response) => {
          onClose();
          updateProjectData();
        },
        (error) => {
          console.error("Error creating project:", error);
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
          <p className='text'>
          Add a new stage column to your kanban board.
          </p>
          <p className="smallcaps mt-5">stage Label</p>
          <input
            type="text"
            placeholder="Label (eg. Prospective)"
            className="app-input"
            value={newLabel.name}
            onChange={handleInputChange}
          />
          <div className="column-center">
            <button
              className="app-button mt-5"
              type="submit"
              onClick={addProjectStage}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModal;
