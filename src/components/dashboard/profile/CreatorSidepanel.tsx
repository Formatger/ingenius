import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import ProfileSidepanel from "../../common/Sidepanel";
import { CreatorDetails } from "./CreatorProfile";
import CreatorForm from "@/components/dashboard/form/CreatorForm";
import ConfirmModal from "./ConfirmModal";
import { deleteCreator, getDataById } from "@/utils/httpCalls";
import ErrorModal from "@/components/common/ErrorModal";

type SidepanelProps = {
  creatorId: any;
  setSelectedCreator: (creator: any | null) => void;
  setOpenSidepanel: (isOpen: boolean) => void;
  updateCreatorData: () => void;
};

const CreatorSidepanel: React.FC<SidepanelProps> = ({
  creatorId,
  setSelectedCreator,
  setOpenSidepanel,
  updateCreatorData,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [creatorsData, setCreatorsData] = useState<any>({});
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    getDataById("creators", creatorId, (data: any) => {
      setCreatorsData(data);
      setIsLocked(data.is_locked);
    }, (error) => {
      console.error("Failed to get creator data:", error);
    }).finally(() => {
      setIsLoading(false)
    });
  }, [])

  const handleClose = () => {
    setSelectedCreator(null);
    setOpenSidepanel(false);
  };

  const closeEdit = () => {
    setEditData(false);
    setOpenSidepanel(false);
    updateCreatorData();
  };

  const handleDelete = () => {
    deleteCreator(
      creatorsData.id,
      () => {
        setModalOpen(false);
        if (handleClose) {
          handleClose();
        }
        if (updateCreatorData) {
          updateCreatorData();
        }
      },
      (error) => {
        console.error("Failed to delete project:", error);
      }
    );
  };

  return (
    <ProfileSidepanel handleClose={handleClose}>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      ) : (
        <>
          {showLockModal && (
            <ErrorModal
              isOpen={showLockModal}
              onClose={() => setShowLockModal(false)}
              title="Creator is locked"
              message="This creator is currently being edited by another user. Please try again later."
            />
          )}
          <div className="sidepanel-header">
            <Link
              className="row-wrap-2 text-brown"
              href={{
                pathname: "/dashboard/clients/creators/profile",
                query: { creatorId: projectsData.creator },
              }}
            >
              <Arrow className="arrow-left orange-fill" />
              {`View Profile`}
            </Link>
            <div className="button-group">
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
              updateCreatorData={() => { }}
            />
          ) : (
            <div className="sidepanel-wrap-space">
              <CreatorDetails creatorsData={creatorsData} />

              <div className="card-container">
                <p className="smallcaps">MANAGE PROJECT</p>
                <div className="button-group">
                  <button
                    className="sec-button linen"
                    onClick={() => {
                      if (isLocked) {
                        setShowLockModal(true);
                      } else {
                        setEditData(true);
                      }
                    }}
                  >
                    {/* <Image src={Message} alt="Icon" width={15} height={15} /> */}
                    <p>Edit</p>
                  </button>
                  <button
                    className="sec-button stone"
                    onClick={() => {
                      if (isLocked) {
                        setShowLockModal(true);
                      } else {
                        setModalOpen(true);
                      }
                    }}
                  >
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
          )}</>
      )}
    </ProfileSidepanel>
  );
};

export default CreatorSidepanel;
