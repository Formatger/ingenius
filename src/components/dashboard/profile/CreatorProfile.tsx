import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import Image from "next/image";
import Insta from "@/components/assets/images/insta.png";
import Tiktok from "@/components/assets/images/tiktok.png";
import Folder from "@/components/assets/icons/folder.svg";
import Download from "@/components/assets/icons/download.svg";
import Plus from "@/components/assets/icons/plus.svg";
import Message from "@/components/assets/icons/message.svg";
import Send from "@/components/assets/icons/send.svg";
import { deleteCreator } from "@/utils/httpCalls";
import Export from "@/components/assets/icons/export.svg";


interface CreatorDetailsProps {
  creatorsData: any;
  updateCreatorData?: () => void;
  handleClose?: () => void;
}

const CreatorDetails = ({ creatorsData, handleClose, updateCreatorData }: CreatorDetailsProps) => {

  return (
    <div className="card-container">
          <div className="head-card mb-1" >
            <div className="profile-info">
              <div className="profile-info-image">
                <img src={creatorsData?.profile_picture_url} alt="Creator" className="profile-image" loading="lazy" />
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
            <div>
              <p className="smallcaps">NICHE</p>
              <span className="sec-button gray1" onClick={undefined}>
                <p className="sec-tag">{creatorsData?.niche}</p>
              </span>
            </div> 
            <div>
              <p className="smallcaps">ACTIVE PROJECTS</p>
              <span className="sec-button gray1" onClick={undefined}>
                <p className="sec-tag">{creatorsData?.active_projects}</p>
              </span>
            </div>
            <div>
              <p className="smallcaps">ACTIVE PROJECTS VALUE</p>
              <span className="sec-button gray1" onClick={undefined}>
                <p className="sec-tag">${creatorsData?.active_projects_value}</p>
              </span>
            </div>

            <div className="sidepanel-hidden">
              <p className="smallcaps">CONTACT CREATOR</p>
              <button className="sec-button linen" onClick={undefined}>
              <Image className="" src={Message} alt="Icon" width={15} height={15} />
                <p>Message</p>
              </button>
            </div>

          </div>
        </div>
      
  );
};

export { CreatorDetails };
