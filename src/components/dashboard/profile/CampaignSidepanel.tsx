import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CampaignDetails } from "@/components/dashboard/profile/CampaignProfile";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import Sidepanel from '../../common/ProfileSidepanel';

type SidepanelProps = {
  open: boolean;
  campaignsData: any;
  setSelectedCampaign: any;
  setOpenSidepanel: any;
}

const CampaignSidepanel: React.FC<SidepanelProps> = ({ 
  campaignsData, 
  setSelectedCampaign, 
  setOpenSidepanel }) => {

  const handleClose = () => {
    setSelectedCampaign(null);
    setOpenSidepanel(false);
  };

  return (
    <Sidepanel handleClose={handleClose}>
      <div className='sidepanel-header'>
        <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/partnerships/campaigns/profile', 
        query: { campaignId: campaignsData.id } }}>
          <Arrow className="arrow-left orange-fill" />
          {`Campaign Profile`}
        </Link>
        <div className='button-group'>
           <Link href="/dashboard/support" passHref>
              <button className="sidepanel-button-style">
                <HelpIcon />
                Get help
              </button>
            </Link>
          {/* <button className='sidepanel-button'>
            <Image src={Edit} alt='' width={16} height={16} />
            Edit
          </button> */}
        </div>
      </div>
      <div className='sidepanel-wrap-space'>
        <CampaignDetails campaignsData={campaignsData} 
        />
          <div className="card-container">
            <p className="smallcaps">MANAGE CAMPAIGN</p>
            <div className="button-group">
              <button className="sec-button linen" onClick={undefined}>
              {/* <button className="sec-button linen" onClick={() => setEditProject(true)}> */}
                <p>Edit</p>
              </button>
              <button className="sec-button stone" onClick={undefined}>
              {/* <button className="sec-button stone" onClick={() => setModalOpen(true)}> */}
                <p>Delete</p>
              </button>
            </div>
{/*             
            <ConfirmModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              title="Delete Project"
              onConfirm={handleDelete}
              message="Are you sure you want to delete this project?"
            /> */}
          </div>
      </div>
    </Sidepanel>
  );
};

export default CampaignSidepanel;

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { CampaignsDetails } from "@/components/dashboard/profile/CampaignsProfile";
// import HelpIcon from "@/components/assets/svg/Help";
// import Edit from "@/components/assets/icons/edit.svg";
// import { Arrow } from "@/components/assets/svg/Arrow";
// import SidepanelContainer from '../../common/Sidepanel';

// type SidepanelProps = {
//   open: boolean;
//   campaignsData: any;
//   setSelectedCampaign: any;
//   setOpenSidepanel: any;
// }

// const CampaignsSidepanel: React.FC<SidepanelProps> = ({ campaignsData, setSelectedCampaign, setOpenSidepanel }) => {

//   return (
//     <Sidepanel campaignsData={campaignsData} setOpenSidepanel={setOpenSidepanel} setSelectedCampaign={setSelectedCampaign}>
//       <div className='sidepanel-header'>
//         <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/partnerships/campaigns/profile', query: { campaignId: campaignsData.id } }}>
//           <Arrow className="arrow-left orange-fill" />
//           {`Campaign Profile`}
//         </Link>
//         <div className='button-group'>
//           <button className='sidepanel-button'>
//             <HelpIcon />
//             Get help
//           </button>
//           <button className='sidepanel-button'>
//             <Image src={Edit} alt='' width={16} height={16} />
//             Edit
//           </button>
//         </div>
//       </div>
//       <div className='sidepanel-wrap'>
//         <CampaignsDetails campaignsData={campaignsData} />
//       </div>
//     </Sidepanel>
//   );
// };

// export default CampaignsSidepanel;
