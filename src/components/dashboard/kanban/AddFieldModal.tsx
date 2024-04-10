// Modal.tsx
import React from 'react';

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  // children?: React.ReactNode;
}

const AddFieldModal: React.FC<AddFieldModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h5 className="subtitle">{title}</h5>
            <button type="button" onClick={onClose} className="close-button">×</button>
          </div>
        )}
        <div className="modal-content">
          <p className='text'>
             Add a new field to your kanban board here
          </p>
          <p className='smallcaps mt-4'>
             Add Label
          </p>
          <input
              type="text"
              placeholder="Label (eg. Prospective)"
              className="app-input"
              // value={searchTerm}
              // onChange={handleInputChange}
          />
          <div className='column-center'>
            <button className="app-button mt-4" type="submit" onClick={undefined}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModal;
