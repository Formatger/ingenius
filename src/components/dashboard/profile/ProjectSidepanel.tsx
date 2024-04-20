import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { ProjectDetails } from "@/components/dashboard/profile/ProjectProfile";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import ProfileSidepanel from '../../common/ProfileSidepanel';
import ProjectForm from "@/components/dashboard/form/ProjectForm";
import ConfirmModal from "./ConfirmModal";
import { deleteProject } from "@/utils/httpCalls";

type SidepanelProps = {
  open: boolean;
  projectsData: any;
  setSelectedProject: (project: any | null) => void;
  setOpenSidepanel: (isOpen: boolean) => void;
  updateProjectData: () => void;
}

const ProjectSidepanel: React.FC<SidepanelProps> = ({
  projectsData,
  setSelectedProject,
  setOpenSidepanel,
  updateProjectData,
  
}) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(false);

  const handleClose = () => {
    setSelectedProject(null);
    setOpenSidepanel(false);
  };

  const closeEdit = () => {
    setEditData(false);
    setOpenSidepanel(false);
    updateProjectData();
  }

  const handleDelete = () => {
    deleteProject(projectsData.id, () => {
      console.log("Project deleted successfully");
      setModalOpen(false);
      if (handleClose) {
        handleClose();
      }
      if (updateProjectData) {
        updateProjectData();
      }
    }, (error) => {
      console.error("Failed to delete project:", error);
    });
  };

  console.log("PROJECTS DATA FORM", projectsData)

  return (
    <ProfileSidepanel handleClose={handleClose} >
      <div className='sidepanel-header'>
        <Link className="row-wrap-2 text-brown"
          href={{
            pathname: '/dashboard/partnerships/projects/profile',
            query: { projectId: projectsData.id }
          }}
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
        <ProjectForm
          projectsData={projectsData}
          closeEdit={closeEdit}
          isEditing={editData}
          handleCloseFormSidepanel={handleClose}
          // updateProjectData={updateProjectData} 
          projectStage={[]} 
          updateProjectData={() => {}}     
          />
      ) : (
        <div className='sidepanel-wrap-space'>
          <ProjectDetails projectsData={projectsData}
            handleClose={handleClose}
            updateProjectData={updateProjectData} 
          />
          <div className="card-container">
            <p className="smallcaps">MANAGE PROJECT</p>
            <div className="button-group">
              <button className="sec-button linen" onClick={() => setEditData(true)}>
                {/* <Image src={Edit} alt="Icon" width={15} height={15} /> */}
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
              onConfirm={handleDelete}
              message="Are you sure you want to delete this project?"
              button="Yes, delete this project"
            />
          </div>
        </div> 
      )}
    </ProfileSidepanel>
  );
};

export default ProjectSidepanel;