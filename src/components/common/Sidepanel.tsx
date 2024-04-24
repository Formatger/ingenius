import React, { Fragment } from 'react';

type SidepanelProps = {
  handleClose: () => void; 
  children: React.ReactNode; 
}

const Sidepanel: React.FC<SidepanelProps> = ({ 
  handleClose, 
  children 
}) => {
  return (
    <Fragment>
      <button className="overlayer" onClick={handleClose} />
      <div className='sidepanel-container'>
        <div className='sidepanel-box'>
        {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Sidepanel;
