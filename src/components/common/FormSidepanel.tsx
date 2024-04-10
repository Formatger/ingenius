import React, { Fragment } from 'react';

type FormSidepanelProps = {
  handleCloseForm: () => void; 
  children: React.ReactNode; 
}

const FormSidepanel: React.FC<FormSidepanelProps> = ({ 
  handleCloseForm, 
  children 
}) => {
  return (
    <Fragment>
      <button className="overlayer" onClick={handleCloseForm} />
      <div className='sidepanel-container'>
        {children}
      </div>
    </Fragment>
  );
};

export default FormSidepanel;

// import React, { Fragment } from 'react';

// type SidepanelProps = {
//   campaignData: any; // make this dynamic to accept projectData and dealData
//   setSelectedCampaign: any; // make this dynamic to accept setSelectedProject and setSelecteDeal
//   setOpenSidepanel: any; 
//   children: React.ReactNode;
// }

// const Sidepanel: React.FC<SidepanelProps> = ({ 
//   campaignData, // make this dynamic to accept projectData and dealData
//   setSelectedCampaign, // make this dynamic to accept setSelectedProject and setSelecteDeal
//   setOpenSidepanel, 
//   children }) => {

//   const handleCloseSidepanel = () => {
//     setSelectedCampaign({} as CampaignInterface);
//     setOpenSidepanel(false);
//   }

//   return (
//     <Fragment>
//       <button className="overlayer" onClick={handleCloseSidepanel} />

//       <div className='sidepanel-container' id="sidepanel">
//         {children}
//       </div>
//     </Fragment>
//   );
// };

// export default Sidepanel;