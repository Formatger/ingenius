import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectDetails } from "@/components/dashboard/profile/ProjectProfile";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import ProfileSidepanel from '../../common/ProfileSidepanel';

type SidepanelProps = {
  open: boolean;
  projectsData: any;
  setSelectedProject: (project: any | null) => void;
  setOpenSidepanel: (isOpen: boolean) => void;
}

const ProjectSidepanel: React.FC<SidepanelProps> = ({ 
  projectsData,
  setSelectedProject,
  setOpenSidepanel
 }) => {

    const handleClose = () => {
      setSelectedProject(null);
      setOpenSidepanel(false);
    };

  return (
    <ProfileSidepanel handleClose={handleClose} >
      <div className='sidepanel-header'>
        <Link className="row-wrap-2 text-brown" 
          href={{ pathname: '/dashboard/partnerships/projects/profile', 
          query: { projectId: projectsData.id } }}
        >
          <Arrow className="arrow-left orange-fill" />
          {`Project Profile`}
        </Link>
        <div className='button-group'>
          <button className='sidepanel-button'>
            <HelpIcon />
            Get help
          </button>
          <button className='sidepanel-button'>
            <Image src={Edit} alt='' width={16} height={16} />
            Edit
          </button>
        </div>
      </div>
      <div className='sidepanel-wrap-space'>
        <ProjectDetails projectsData={projectsData} />  
      </div>
    </ProfileSidepanel>
  );
};

export default ProjectSidepanel;