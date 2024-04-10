import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import ProfileSidepanel from '../../common/ProfileSidepanel';
import Insta from "@/components/assets/images/insta.png";
import Tiktok from "@/components/assets/images/tiktok.png";
import Folder from "@/components/assets/icons/folder.svg";
import Message from "@/components/assets/icons/message.svg";
import Send from "@/components/assets/icons/send.svg";

type SidepanelProps = {
  open: boolean;
  creatorsData: any;
  setSelectedCreator: (creator: any | null) => void;
  setOpenSidepanel: (isOpen: boolean) => void;
}

const CreatorSidepanel: React.FC<SidepanelProps> = ({ 
  creatorsData,
  setSelectedCreator,
  setOpenSidepanel
 }) => {

    const handleClose = () => {
      setSelectedCreator(null);
      setOpenSidepanel(false);
    };

  return (
    <ProfileSidepanel handleClose={handleClose} >
      <div className='sidepanel-header'>
        <div></div>
        {/* <Link className="row-wrap-2 text-brown" 
          href={{ pathname: '/dashboard/brands/projects/profile', 
          query: { projectId: brandsData.id } }}
        >
          <Arrow className="arrow-left orange-fill" />
          {`Creator Profile`}
        </Link> */}
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

        <div className="card-container">
          <div className="head-card mb-1" >
            <div className="profile-info">
              <div className="profile-info-image">
                <img src={creatorsData?.profile_picture} alt="Creator" className="profile-image" loading="lazy" />
              </div>
            </div>
            <div className="profile-info">
              <div className="profile-info-box">
                <div className="profile-info-wrap">
                  <p className="smallcaps">CREATOR</p>
                  <p className="profile-text ml-2">{creatorsData?.name}</p>
                </div>
                <div className="profile-info-wrap">
                  <p className="smallcaps">CONTACT</p>
                  <p className="profile-text ml-2 text-14">{creatorsData?.email}</p>
                </div>
                <div className="profile-info-wrap">
                  <p className="smallcaps">SOCIALS</p>
                  <div className="row-wrap-2 ml-2">
                    <Image src={Insta} alt="Icon" width={18} height={18} />
                    <Image src={Tiktok} alt="Icon" width={18} height={18} />
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="card-text">
            {/* <div>
              <p className="smallcaps">PAST CAMPAIGNS</p>
              <span className="sec-button gray1" onClick={undefined}>
                <p className="text-20 bold">{brandsData?.campaign_name}</p>
              </span>
            </div>
            <div>
              <p className="smallcaps">PAST CAMPAIGNS VALUE</p>
              <span className="sec-button gray1" onClick={undefined}>
                <p className="text-20 bold">${brandsData?.contract_value}</p>
              </span>
            </div> */}

            <div>
              <p className="smallcaps">NICHE</p>
              <span className="sec-button gray1" onClick={undefined}>
                <p className="text-20 bold">{creatorsData?.niche}</p>
              </span>
            </div> 
            <div>
              <p className="smallcaps">ACTIVE PROJECTS</p>
              <span className="sec-button gray1" onClick={undefined}>
                <p className="text-20 bold">{creatorsData?.active_projects}</p>
              </span>
            </div>
            <div>
              <p className="smallcaps">ACTIVE PROJECTS VALUE</p>
              <span className="sec-button gray1" onClick={undefined}>
                <p className="text-20 bold">${creatorsData?.active_projects_value}</p>
              </span>
            </div>

            <div>
              <p className="smallcaps">MANAGE CREATOR</p>
              <div className="button-group">
                <button className="sec-button linen" onClick={undefined}>
                  <Image src={Message} alt="Icon" width={15} height={15} />
                  <p>Message</p>
                </button>
                <button className="sec-button stone" onClick={undefined}>
                  <p>Delete</p>
                </button>
              </div>
            </div>
          </div>
        </div >
 
      </div>
    </ProfileSidepanel>
  );
};

export default CreatorSidepanel;