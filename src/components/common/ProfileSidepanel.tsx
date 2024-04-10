import React, { Fragment } from 'react';

type ProfileSidepanelProps = {
  handleClose: () => void; 
  children: React.ReactNode; 
}

const ProfileSidepanel: React.FC<ProfileSidepanelProps> = ({ 
  handleClose, 
  children 
}) => {
  return (
    <Fragment>
      <button className="overlayer" onClick={handleClose} />
      <div className='sidepanel-container'>
        {children}
      </div>
    </Fragment>
  );
};

export default ProfileSidepanel;
