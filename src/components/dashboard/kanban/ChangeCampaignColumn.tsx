import React, { useState } from "react";
import { putNewOrderCampaign } from "@/utils/httpCalls";

interface ChangeCampaignColumnProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  button: string;
  updateCampaignData: () => void;
  changeStage: any;
  campaignStage: any;
}

const ChangeCampaignColumn: React.FC<ChangeCampaignColumnProps> = ({ isOpen, changeStage, onClose, title, button, updateCampaignData, campaignStage }) => {
  const [newName, setNewName] = useState<string>('');

  const handleChangeCampaign = async () => {
    try {
      // Llamar a la función para actualizar el nombre en la base de datos
      await putNewOrderCampaign(changeStage.stageID, { name: newName, order: changeStage.stageIndex }, () => {});
      
      // Aquí llamamos a la función updateCampaignData para actualizar el estado después de la actualización
      updateCampaignData();
      onClose();
    } catch (error) {
      console.error("Failed to change stage name:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="subtitle">{title}</h5>
          <button type="button" onClick={onClose} className="close-button">×</button>
        </div>
        <div className="modal-content">
          <input className="form-input" 
            type="text" value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
            // placeholder={campaignStage.name}
          />
          <div className='button-group row-between mt-5'>
            <button className="app-button cream mt-4" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="app-button mt-4" type="button" onClick={handleChangeCampaign}>
              {button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeCampaignColumn;
