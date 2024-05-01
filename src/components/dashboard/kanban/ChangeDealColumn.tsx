import React, { useState } from "react";
import { putNewOrderDeal } from "@/utils/httpCalls";

interface ChangeDealColumnProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    button: string;
    updateDealData: () => void;
    changeStage: any;
}

const ChangeDealColumn: React.FC<ChangeDealColumnProps> = ({ isOpen, changeStage, onClose, title, button, updateDealData }) => {
    const [newName, setNewName] = useState<string>('');

    const handleChangeDeal = async () => {
        try {
            await putNewOrderDeal(changeStage.stageID, { name: newName, order: changeStage.stageIndex }, () => { });

            updateDealData();
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
          <p className='text'>
            Change the name of your stage.
            </p>
            <p className="smallcaps mt-5">stage label</p>
            <input className="form-input" 
              type="text" value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              placeholder={"Enter new name"}
              />
            <div className='button-group row-between mt-1'>
              <button className="app-button cream mt-4" type="button" onClick={onClose}>
                Cancel
              </button>
              <button className="app-button mt-4" type="button" onClick={handleChangeDeal}>
                {button}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ChangeDealColumn;