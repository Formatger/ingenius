import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DealDetails } from "@/components/dashboard/profile/DealProfile";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import Sidepanel from "../../common/Sidepanel";
import { deleteDeal } from "@/utils/httpCalls";
import ConfirmModal from "./ConfirmModal";
import DealForm from "../form/DealForm";

type SidepanelProps = {
  open: boolean;
  dealsData: any;
  setSelectedDeal: any;
  setOpenSidepanel: any;
  updateDealData: () => void;
};

const DealSidepanel: React.FC<SidepanelProps> = ({
  dealsData,
  setSelectedDeal,
  setOpenSidepanel,
  updateDealData,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);

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
        console.log("Deal deleted successfully");
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
          updateDealData={() => {}}
        />
      ) : (
        <div className="sidepanel-wrap-space">
          <DealDetails dealsData={dealsData} />

          <div className="card-container">
            <p className="smallcaps">MANAGE DEAL</p>
            <div className="button-group">
              <button
                className="sec-button linen"
                onClick={() => setEditData(true)}
              >
                <p>Edit</p>
              </button>
              <button
                className="sec-button stone"
                onClick={() => setModalOpen(true)}
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
    </Sidepanel>
  );
};

export default DealSidepanel;
