import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  button: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, title, message, button }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="subtitle">{title}</h5>
          <button type="button" onClick={onClose} className="close-button">×</button>
        </div>
        <div className="modal-content">
          <p className='text'>{message}</p>
          <div className='button-group row-between mt-5'>
          <button className="app-button cream mt-4" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="app-button mt-4" type="button" onClick={onConfirm}>
              {button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
