import React from "react";
import Image from "next/image";
import Folder from "@/components/assets/icons/folder.svg";
import Download from "@/components/assets/icons/download.svg";
import Export from "@/components/assets/icons/export.svg";
import Plus from "@/components/assets/icons/plus.svg";
import Message from "@/components/assets/icons/message.svg";
import Send from "@/components/assets/icons/send.svg";
import { DealInterface } from "@/interfaces/interfaces";

interface DealDetailsProps {
  dealsData: any;
  updateDealData?: () => void;
  handleClose?: () => void;
}

interface DealInvoiceProps {
  dealsData: any;
}

const DealDetails = ({ dealsData }: DealDetailsProps) => {
  return (
    <div className="card-container">
      <div className="head-card mb-1" >
        <div className="profile-info">
          <div className="profile-info-image">
            <img src={dealsData?.brand_image_url} alt="Brand" className="profile-image" loading="lazy" />
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-info-box">
            <div className="profile-info-wrap">
              <p className="smallcaps">BRAND</p>
              <p className="profile-text ml-2">{dealsData?.brand_name}</p>
            </div>
            <div className="profile-info-wrap">
              <p className="smallcaps">CONTACT</p>
              <p className="profile-text ml-2 text-14">{dealsData?.brand_email}</p>
            </div>
            <div className="profile-info-wrap">
              <p className="smallcaps">WEBSITE</p>
              <div className="row-wrap-2 ml-2">
                <Image src={Export} alt="Icon" width={12} height={12} />
                <a
                  href={dealsData?.brand_website}
                  className="profile-text text-12"
                  target="_blank"
                >View Website</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-text">
        <div>
          <p className="smallcaps mb-2">DEAL</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="sec-tag">{dealsData.name}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps">DESCRIPTION</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="description">{dealsData?.description}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps mb-2">CONTRACT VALUE</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="sec-tag">${dealsData.contract_value}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps">DEAL STAGE</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="sec-tag">{dealsData?.deal_stage_name}</p>
          </span>
        </div>

        {/* Hidden on Sidepanel */}
        <div className="sidepanel-hidden">
          <p className="smallcaps">MANAGE BRAND</p>
          <div className="button-group">
          <button className="sec-button linen" onClick={undefined}>
              <Image src={Message} alt="Icon" width={15} height={15} />
              <p>Message</p>
            </button>
            <button className="sec-button linen" onClick={undefined}>
              <Image className="" src={Export} alt="Icon" width={14} height={14} />
              <p>View Profile</p>
            </button>
          </div>
        </div>


      </div>

    </div >
  );
};

const DealInvoice = ({ dealsData }: DealInvoiceProps) => {
  return (
    <div className="card-container">
      <div className="agency-invoice">
        <p className="smallcaps mb-2">
          CONTRACT DETAILS
        </p>
        <div className="invoice-data">
          <ul>
            <li className="invoice-data-list">
              <p>Brand</p>
              <span className="invoice-tag">{dealsData.brand_name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Representative</p>
              <span className="invoice-tag">{dealsData.representative}</span>
            </li>
            <li className="invoice-data-list">
              <p>Deal Duration</p>
              <span className="invoice-tag">{dealsData.deal_duration}</span>
            </li>
            <li className="invoice-data-list">
              <p>Campaigns</p>
              <span className="invoice-tag">{dealsData.total_campaigns}</span>
            </li>
            {/* <li className="invoice-data-list">
              <p className="mr-8">Deliverables</p>
              <div className="invoice-tag">
                <p className="invoice-tag-small">Drive Folder</p>
                <button className="center-btn ml-3" onClick={undefined}>
                  <Image src={Plus} alt="Icon" width={15} height={15} />
                </button>
              </div>
            </li> */}
            <li className="invoice-data-list">
              <p>Contract Value</p>
              <span className="invoice-tag">${dealsData.contract_value}</span>
            </li>
          </ul>
        </div>

        <div className="mt-5">
          <p className="smallcaps" >MANAGE CONTRACT</p>

          <input type="file" onChange={undefined} style={{ display: 'none' }} ref={undefined} />

          <div className="button-group">
            <button className="sec-button linen" onClick={undefined}>
              {/* <Image src={Send} alt="Icon" width={15} height={15} /> */}
              <p>Upload Contract</p>
            </button>
            <button className="sec-button w-50 img-btn linen" onClick={undefined}>
              <Image src={Folder} alt="Icon" width={15} height={15} />
              <p>View Contract</p>
            </button>      
          </div>

          <div className="button-group mt-3">
            <button className="sec-button linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Contract</p>
            </button>
            <button className="sec-button w-50 img-btn linen" onClick={undefined}>
            <Image src={Download} alt="Icon" width={18} height={18} />
              <p>Download as PDF</p>
            </button>
          </div>
        </div>

      </div>
    </div >
  );
};

export { DealDetails, DealInvoice };