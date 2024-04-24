import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import ProfileSidepanel from '../../common/Sidepanel';
import { CreatorDetails } from './CreatorProfile';
import CreatorForm from "@/components/dashboard/form/CreatorForm";
import ConfirmModal from "./ConfirmModal";
import { deleteCreator } from "@/utils/httpCalls";

type SidepanelProps = {
  open: boolean;
  creatorsData: any;
  setSelectedCreator: (creator: any | null) => void;
  setOpenSidepanel: (isOpen: boolean) => void;
  updateCreatorData: () => void;
}

const CreatorSidepanel: React.FC<SidepanelProps> = ({ 
  creatorsData,
  setSelectedCreator,
  setOpenSidepanel,
  updateCreatorData, 
 }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);

    const handleClose = () => {
      setSelectedCreator(null);
      setOpenSidepanel(false);
    };

    const closeEdit = () => {
      setEditData(false);
      setOpenSidepanel(false);
      updateCreatorData();
    }
  
    const handleDelete = () => {
      deleteCreator(creatorsData.id, () => {
        console.log("Creator deleted successfully");
        setModalOpen(false);
        if (handleClose) {
          handleClose();
        }
        if (updateCreatorData) {
          updateCreatorData();
        }
      }, (error) => {
        console.error("Failed to delete project:", error);
      });
    };

  return (
    <ProfileSidepanel handleClose={handleClose} >
      <div className='sidepanel-header'>
        <Link className="row-wrap-2 text-brown" 
          href={{ pathname: '/dashboard/clients/creators/profile', 
          query: { creatorId: creatorsData.id } }}
        >
          <Arrow className="arrow-left orange-fill" />
          {`View Profile`}
        </Link>
        <div className='button-group'>
           <Link href="/dashboard/support" passHref>
              <button className="sidepanel-button-style">
                <HelpIcon />
                Get help
              </button>
            </Link>
        </div>
      </div>

      {editData ? (
        <CreatorForm
          creatorsData={creatorsData}
          closeEdit={closeEdit}
          isEditing={editData}
          handleCloseFormSidepanel={handleClose}
          updateCreatorData={() => {}}     
          />
        ) : (
      <div className='sidepanel-wrap-space'>
        <CreatorDetails creatorsData={creatorsData} /> 

        <div className="card-container">
          <p className="smallcaps">MANAGE PROJECT</p>
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
            title="Delete Creator"
            onConfirm={handleDelete}
            message="Are you sure you want to delete this creator profile?"
            button="Yes, delete this creator"
          />
        </div>
 
      </div>
    )}
    </ProfileSidepanel>
  );
};

export default CreatorSidepanel;