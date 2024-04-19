import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { CampaignDetails } from "@/components/dashboard/profile/CampaignProfile";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import ProfileSidepanel from '../../common/ProfileSidepanel';
import CampaignForm from '../form/CampaignForm';
import { deleteCampaign } from "@/utils/httpCalls";
import ConfirmModal from "./ConfirmModal";

type ProfileSidepanelProps = {
  open: boolean;
  campaignsData: any;
  setSelectedCampaign: (campaign: any | null) => void;
  setOpenSidepanel: (isOpen: boolean) => void;
  updateCampaignData: () => void;
}

const CampaignSidepanel: React.FC<ProfileSidepanelProps> = ({ 
  campaignsData, 
  setSelectedCampaign, 
  setOpenSidepanel,
  updateCampaignData,

 }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);

  const handleClose = () => {
    setSelectedCampaign(null);
    setOpenSidepanel(false);
  };

  const closeEdit = () => {
    setEditData(false);
    setOpenSidepanel(false);
    updateCampaignData();
  }

  const handleDelete = () => {
    deleteCampaign(campaignsData.id, () => {
      console.log("Project deleted successfully");
      setModalOpen(false);
      if (handleClose) {
        handleClose();
      }
      if (updateCampaignData) {
        updateCampaignData();
      }
    }, (error) => {
      console.error("Failed to delete project:", error);
    });
  };

  return (
    <ProfileSidepanel handleClose={handleClose}>
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
      {editData ? (
        <CampaignForm
          campaignData={campaignsData}
          closeEdit={closeEdit}
          isEditing={editData}
          handleCloseFormSidepanel={handleClose}
          // updateProjectData={updateProjectData} 
          campaignStage={[]} 
          updateCampaignData={() => {}}     
          />
      ) : (
        <div className='sidepanel-wrap-space'>
          <CampaignDetails campaignsData={campaignsData}
            handleClose={handleClose}
            updateCampaignData={updateCampaignData} 
          />
          <div className="card-container">
            <p className="smallcaps">MANAGE CAMPAIGN</p>
            <div className="button-group">
              <button className="sec-button linen" onClick={() => setEditData(true)}>
                {/* <Image src={Message} alt="Icon" width={15} height={15} /> */}
                <p>Edit</p>
              </button>
              <button className="sec-button stone" onClick={() => setModalOpen(true)}>
                <p>Delete</p>
              </button>
            </div>
            
            <ConfirmModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              title="Delete Project"
              // onConfirm={handleDelete}
              message="Are you sure you want to delete this project?"
            />
          </div>
        </div> 
      )}
    </ProfileSidepanel>
  );
};

export default CampaignSidepanel;