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
            // Llamar a la función para actualizar el nombre en la base de datos
            await putNewOrderDeal(changeStage.stageID, { name: newName, order: changeStage.stageIndex }, () => { });

            // Aquí llamamos a la función updateCampaignData para actualizar el estado después de la actualización
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
                    <input className="form-input" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <div className='button-group row-between mt-5'>
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