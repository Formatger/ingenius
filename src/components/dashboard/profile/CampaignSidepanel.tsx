import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CampaignDetails } from "@/components/dashboard/profile/CampaignProfile";
import HelpIcon from "@/components/assets/svg/Help";
import { Arrow } from "@/components/assets/svg/Arrow";
import CampaignForm from "../form/CampaignForm";
import { deleteCampaign, getDataById } from "@/utils/httpCalls";
import ProfileSidepanel from "../../common/Sidepanel";
import ConfirmModal from "./ConfirmModal";
import ErrorModal from "@/components/common/ErrorModal";

type ProfileSidepanelProps = {
  campaignId: any;
  setSelectedCampaign: (campaign: any | null) => void;
  setOpenSidepanel: (isOpen: boolean) => void;
  updateCampaignData: () => void;
};

const CampaignSidepanel: React.FC<ProfileSidepanelProps> = ({
  campaignId,
  setSelectedCampaign,
  setOpenSidepanel,
  updateCampaignData,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [campaignsData, setCampaignsData] = useState<any>({});
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDataById("campaigns", campaignId, (data) => {
      setCampaignsData(data);
      setIsLocked(data.is_locked);
    }, (error) => {
      console.error("Failed to get campaign data:", error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleClose = () => {
    setSelectedCampaign(null);
    setOpenSidepanel(false);
  };

  const closeEdit = () => {
    setEditData(false);
    setOpenSidepanel(false);
    updateCampaignData();
  };

  const handleDelete = () => {
    deleteCampaign(
      campaignsData.id,
      () => {
        setModalOpen(false);
        if (handleClose) {
          handleClose();
        }
        if (updateCampaignData) {
          updateCampaignData();
        }
      },
      (error) => {
        console.error("Failed to delete campaign:", error);
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
              title="Campaign is locked"
              message="This campaign is currently being edited by another user. Please try again later."
            />
          )}
          <div className="sidepanel-header">
            <Link
              className="row-wrap-2 text-brown"
              href={{
                pathname: "/dashboard/partnerships/campaigns/profile",
                query: { campaignId: campaignsData.id },
              }}
            >
              <Arrow className="arrow-left orange-fill" />
              {`View Profile`}
            </Link>
            <div className="button-group">
              <Link href="/dashboard/support" passHref>
                <button className="sidepanel-top-button">
                  <HelpIcon />
                  Get help
                </button>
              </Link>
            </div>
          </div>
          {editData ? (
            <CampaignForm
              campaignsData={campaignsData}
              closeEdit={closeEdit}
              isEditing={editData}
              handleCloseFormSidepanel={handleClose}
              campaignStage={[]}
              updateCampaignData={() => { }}
            />
          ) : (
            <div className="sidepanel-wrap-space">
              <CampaignDetails campaignsData={campaignsData} />
              <div className="card-container">
                <p className="smallcaps">MANAGE CAMPAIGN</p>
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
                  title="Delete Campaign>"
                  onConfirm={handleDelete}
                  message="Are you sure you want to delete this campaign?"
                  button="Yes, delete this campaign"
                />
              </div>
            </div>
          )}
        </>
      )}
    </ProfileSidepanel>
  );
};

export default CampaignSidepanel;
