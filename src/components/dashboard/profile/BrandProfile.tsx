import React, { useState } from "react";
import Image from "next/image";
import Message from "@/components/assets/icons/message.svg";

interface BrandDetailsProps {
  brandsData: any;
  updateBrandData?: () => void;
  handleClose?: () => void;
}

const BrandDetails = ({ brandsData, updateBrandData }: BrandDetailsProps) => {

  return (
    <div className="card-container">
      <div className="head-card mb-1" >
        <div className="profile-info">
          <div className="profile-info-image">
            {/* <Image
              src={brandsData?.profile_picture_url}
              alt="Brand"
              width={160}
              height={160}
              layout="fixed"
              className="profile-image"
              loading="lazy"
              quality={75}
            />    */}
            <img
              src={brandsData?.profile_picture_url}
              alt="Brand"
              className="profile-image"
              loading="lazy"
            />       
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
        <div>
          <p className="smallcaps">NICHE</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="sec-tag">{brandsData?.niche}</p>
          </span>
        </div> 
        <div>
          <p className="smallcaps">ACTIVE CAMPAIGNS</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="sec-tag">{brandsData?.active_campaigns}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps">ACTIVE CAMPAIGNS VALUE</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="sec-tag">${brandsData?.active_campaigns_value}</p>
          </span>
        </div>

        <div className="sidepanel-hidden">
          <p className="smallcaps">CONTACT BRAND</p>
          <div className="button-group">
          <button
            className="sec-button linen"
            onClick={() => window.location.href = `mailto:${brandsData?.email}?subject=Subject&body=Body`}
          >
            <Image className="" src={Message} alt="Icon" width={15} height={15} />
            <p>Message</p>
          </button>
          </div>
        </div>
      </div>
    </div>
      
  );
};

export { BrandDetails };
