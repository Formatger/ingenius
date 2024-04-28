import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DealDetails } from "@/components/dashboard/profile/DealProfile";
import HelpIcon from "@/components/assets/svg/Help";
import { Arrow } from "@/components/assets/svg/Arrow";
import Sidepanel from "../../common/Sidepanel";
import { deleteDeal, getDataById } from "@/utils/httpCalls";
import ConfirmModal from "./ConfirmModal";
import DealForm from "../form/DealForm";
import ErrorModal from "@/components/common/ErrorModal";

type SidepanelProps = {
  dealId: any;
  setSelectedDeal: any;
  setOpenSidepanel: any;
  updateDealData: () => void;
};

const DealSidepanel: React.FC<SidepanelProps> = ({
  dealId,
  setSelectedDeal,
  setOpenSidepanel,
  updateDealData,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [dealsData, setDealsData] = useState<any>({});
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDataById("deals", dealId, (data: any) => {
      setDealsData(data);
      setIsLocked(data.is_locked);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleClose = () => {
    setSelectedDeal(null);
    setOpenSidepanel(false);
  };

  const closeEdit = () => {
    setEditData(false);
    setOpenSidepanel(false);
    updateDealData();
  };

  const handleDelete = () => {
    deleteDeal(
      dealsData.id,
      () => {
        setModalOpen(false);
        if (handleClose) {
          handleClose();
        }
        if (updateDealData) {
          updateDealData();
        }
      },
      (error) => {
        console.error("Failed to delete deal:", error);
      }
    );
  };

  return (
    <Sidepanel handleClose={handleClose}>
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
              title="Deal is locked"
              message="This deal is currently being edited by another user. Please try again later."
            />
          )}
          <div className="sidepanel-header">
            <Link
              className="row-wrap-2 text-brown"
              href={{
                pathname: "/dashboard/partnerships/deals/profile",
                query: { dealId: dealsData.id },
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
            <DealForm
              dealsData={dealsData}
              closeEdit={closeEdit}
              isEditing={editData}
              handleCloseFormSidepanel={handleClose}
              // updateProjectData={updateProjectData}
              dealStage={[]}
              updateDealData={() => { }}
            />
          ) : (
            <div className="sidepanel-wrap-space">
              <DealDetails dealsData={dealsData} />

              <div className="card-container">
                <p className="smallcaps">MANAGE DEAL</p>
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
                  title="Delete Deal"
                  onConfirm={handleDelete}
                  message="Are you sure you want to delete this deal?"
                  button="Yes, delete this deal"
                />
              </div>
            </div>
          )}
        </>
      )}
    </Sidepanel>
  );
};

export default DealSidepanel;
