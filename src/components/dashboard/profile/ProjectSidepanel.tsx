import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectDetails } from "@/components/dashboard/profile/ProjectProfile";
import HelpIcon from "@/components/assets/svg/Help";
import { Arrow } from "@/components/assets/svg/Arrow";
import ProfileSidepanel from "../../common/Sidepanel";
import ProjectForm from "@/components/dashboard/form/ProjectForm";
import ConfirmModal from "./ConfirmModal";
import { deleteProject, getDataById } from "@/utils/httpCalls";
import ErrorModal from "@/components/common/ErrorModal";

type SidepanelProps = {
  projectId: any;
  setSelectedProject: (project: any | null) => void;
  setOpenSidepanel: (isOpen: boolean) => void;
  updateProjectData: () => void;
};

const ProjectSidepanel: React.FC<SidepanelProps> = ({
  projectId,
  setSelectedProject,
  setOpenSidepanel,
  updateProjectData,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [projectsData, setProjectsData] = useState<any>({});
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDataById("projects", projectId, (data) => {
      setProjectsData(data);
      setIsLocked(data.is_locked);
    }, (error) => {
      console.error("Failed to get project data:", error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleClose = () => {
    setSelectedProject(null);
    setOpenSidepanel(false);
  };

  const closeEdit = () => {
    setEditData(false);
    setOpenSidepanel(false);
    updateProjectData();
  };

  const handleDelete = () => {
    deleteProject(
      projectsData.id,
      () => {
        setModalOpen(false);
        if (handleClose) {
          handleClose();
        }
        if (updateProjectData) {
          updateProjectData();
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
              title="Project is locked"
              message="This project is currently being edited by another user. Please try again later."
            />
          )}
          <div className="sidepanel-header">
            <Link
              className="row-wrap-2 text-brown"
              href={{
                pathname: "/dashboard/partnerships/projects/profile",
                query: { projectId: projectsData.id },
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
            <ProjectForm
              projectsData={projectsData}
              closeEdit={closeEdit}
              isEditing={editData}
              handleCloseFormSidepanel={handleClose}
              projectStage={[]}
              updateProjectData={() => { }}
            />
          ) : (
            <div className="sidepanel-wrap-space">
              <ProjectDetails
                projectsData={projectsData}
                handleClose={handleClose}
                updateProjectData={updateProjectData}
              />
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
                  title="Delete Project"
                  onConfirm={handleDelete}
                  message="Are you sure you want to delete this project?"
                  button="Yes, delete this project"
                />
              </div>
            </div>
          )}</>
      )}
    </ProfileSidepanel>
  );
};

export default ProjectSidepanel;
