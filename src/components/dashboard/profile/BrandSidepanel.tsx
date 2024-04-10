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
  brandsData: any;
  setSelectedBrand: (brand: any | null) => void;
  setOpenSidepanel: (isOpen: boolean) => void;
}

const BrandSidepanel: React.FC<SidepanelProps> = ({ 
  brandsData,
  setSelectedBrand,
  setOpenSidepanel
 }) => {

    const handleClose = () => {
      setSelectedBrand(null);
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
          {`Brand Profile`}
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
                <img src={brandsData?.profile_picture} alt="Creator" className="profile-image" loading="lazy" />
              </div>
            </div>
            <div className="profile-info">
              <div className="profile-info-box">
                <div className="profile-info-wrap">
                  <p className="smallcaps">BRAND</p>
                  <p className="profile-text ml-2">{brandsData?.name}</p>
                </div>
                <div className="profile-info-wrap">
                  <p className="smallcaps">CONTACT</p>
                  <p className="profile-text ml-2 text-14">{brandsData?.email}</p>
                </div>
                <div className="profile-info-wrap">
                  <p className="smallcaps">WEBSITE</p>
                  <p className="profile-text ml-2 text-14">{brandsData?.website}</p>
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
                <p className="text-20 bold">{brandsData?.niche}</p>
              </span>
            </div> 
            <div>
              <p className="smallcaps">ACTIVE CAMPAIGNS</p>
              <span className="sec-button gray1" onClick={undefined}>
                <p className="text-20 bold">{brandsData?.active_campaigns}</p>
              </span>
            </div>
            <div>
              <p className="smallcaps">ACTIVE CAMPAIGNS VALUE</p>
              <span className="sec-button gray1" onClick={undefined}>
                <p className="text-20 bold">${brandsData?.active_campaigns_value}</p>
              </span>
            </div>

            <div>
              <p className="smallcaps">MANAGE BRAND</p>
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

export default BrandSidepanel;