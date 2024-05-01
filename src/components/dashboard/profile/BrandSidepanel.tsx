import React, { useEffect, useState } from "react";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import { Arrow } from "@/components/assets/svg/Arrow";
import ProfileSidepanel from "../../common/Sidepanel";
import { deleteBrand, getDataById } from "@/utils/httpCalls";
import ConfirmModal from "./ConfirmModal";
import { BrandDetails } from "./BrandProfile";
import BrandForm from "@/components/dashboard/form/BrandForm";
import ErrorModal from "@/components/common/ErrorModal";

type SidepanelProps = {
  brandId: any;
  setSelectedBrand: (brand: any | null) => void;
  setOpenSidepanel: (isOpen: boolean) => void;
  updateBrandData: () => void;
};

const BrandSidepanel: React.FC<SidepanelProps> = ({
  brandId,
  setSelectedBrand,
  setOpenSidepanel,
  updateBrandData,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [brandsData, setBrandsData] = useState<any>({});
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    getDataById("brands", brandId, (data) => {
      setBrandsData(data);
      setIsLocked(data.is_locked);
    }, (error) => {
      console.error("Failed to get brand data:", error);
    }).finally(() => {
      setIsLoading(false)
    });
  }, [])

  const handleClose = () => {
    setSelectedBrand(null);
    setOpenSidepanel(false);
  };

  const closeEdit = () => {
    setEditData(false);
    setOpenSidepanel(false);
    updateBrandData();
  };

  const handleDelete = () => {
    deleteBrand(
      brandsData.id,
      () => {
        setModalOpen(false);
        if (handleClose) {
          handleClose();
        }
        if (updateBrandData) {
          updateBrandData();
        }
      },
      (error) => {
        console.error("Failed to delete brand:", error);
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
              title="Brand is locked"
              message="This brand is currently being edited by another user. Please try again later."
            />
          )}
          <div className="sidepanel-header">
            <Link
              className="row-wrap-2 text-brown"
              href={{
                pathname: "/dashboard/clients/brands/profile",
                query: { brandId: brandsData.id },
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
            <BrandForm
              brandsData={brandsData}
              closeEdit={closeEdit}
              isEditing={editData}
              handleCloseFormSidepanel={handleClose}
              updateBrandData={() => { }}
            />
          ) : (
            <div className="sidepanel-wrap-space">
              <BrandDetails brandsData={brandsData} />

              <div className="card-container">
                <p className="smallcaps">MANAGE BRAND</p>
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
                  title="Delete Brand"
                  onConfirm={handleDelete}
                  message="Are you sure you want to delete this brand profile?"
                  button="Yes, delete this brand"
                />
              </div>
            </div>
          )}</>
      )}

    </ProfileSidepanel>
  );
};

export default BrandSidepanel;
