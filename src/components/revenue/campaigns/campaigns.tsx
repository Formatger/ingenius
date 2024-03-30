import React from "react";
import Image from "next/image";
import Folder from "@/components/assets/icons/folder.svg";
import Download from "@/components/assets/icons/download.svg";
import Export from "@/components/assets/icons/export.svg";
import Plus from "@/components/assets/icons/plus.svg";
import Message from "@/components/assets/icons/message.svg";
import Send from "@/components/assets/icons/send.svg";

interface CampaignsDetailsProps {
  campaignData: any;
}

interface CampaignsInvoiceProps {
  campaignData: any;
}

const CampaignsDetails = ({ campaignData }: CampaignsDetailsProps) => {
  return (
    <div className="card-container">
      <div className="head-card mb-1" >
        <div className="profile-info">
          <div className="profile-info-image">
            <img src={campaignData.brand_image_url} alt="Brand" className="profile-image" loading="lazy" />
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-info-text-campaigns">
            <div className="profile-info-campaigns">
              <p className="profile-subtitle-campaigns">BRAND</p>
              <p className="profile-campaigns-text ml-2">{campaignData?.brand_name}</p>
            </div>
            <div className="profile-info-campaigns">
              <p className="profile-subtitle-campaigns">CONTACT</p>
              <p className="profile-campaigns-text ml-2 text-14">{campaignData?.brand_email}</p>
            </div>
            <div className="profile-info-campaigns">
              <p className="profile-subtitle-campaigns">TAGS</p>
              <div className="row-wrap-2 ml-2">
                <Image src={Export} alt="Icon" width={12} height={12} />
                <a
                  href={campaignData?.brand_website}
                  className="profile-campaigns-text text-12 profile-campaigns-link"
                  target="_blank"
                >View Website</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-text">
        <div>
          <p className="profile-subtitle mb-1">CAMPAIGN</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="text-20 bold">{campaignData?.campaign_name}</p>
          </span>
        </div>
        <div>
          <p className="profile-subtitle mb-1">CONTRACT VALUE</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="text-20 bold">${campaignData?.contract_value}</p>
          </span>
        </div>
        <div>
          <p className="profile-subtitle mb-1" >MANAGE CONTRACTS</p>
          <div className="button-group">
            <button className="sec-button img-btn linen" onClick={undefined}>
              <Image src={Folder} alt="Icon" width={15} height={15} />
              <p>View Contract</p>
            </button>
            <button className="sec-button img-btn linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Contract</p>
            </button>
          </div>
        </div>

        {/* INVOICE SECTION - Hidden on Sidepanel */}
        <div className="invoice-section">
          <p className="profile-subtitle mb-1">MANAGE INVOICE</p>
          <div className="button-group">
            <button className="sec-button img-btn linen" onClick={undefined}>
              <Image className="" src={Folder} alt="Icon" width={15} height={15} />
              <p>View Invoice</p>
            </button>
            <button className="sec-button img-btn linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Invoice</p>
            </button>
          </div>
        </div>
        {/* INVOICE SECTION - Hidden on Sidepanel */}

        <div>
          <p className="profile-subtitle mb-1">MANAGE BRAND</p>
          <div className="button-group">
            <button className="sec-button img-btn linen" onClick={undefined}>
              <Image src={Message} alt="Icon" width={15} height={15} />
              <p>Message</p>
            </button>
            <button className="sec-button img-btn stone" onClick={undefined}>
              <p>Delete</p>
            </button>
          </div>
        </div>
      </div>

    </div >
  );
};

const CampaignsInvoice = ({ campaignData }: CampaignsInvoiceProps) => {
  return (
    <div className="card-container-invoice-campaigns">
      <div className="agency-invoice">
        <p className="invoice-subtitle">
          AGENCY INVOICE
        </p>
        <div className="invoice-data">
          <ul>
            <li className="invoice-data-list">
              <p>Invoice number</p>
              <span className="invoice-tag">{campaignData.invoice_number}</span>
            </li>
            <li className="invoice-data-list">
              <p>Invoice date</p>
              <span className="invoice-tag">{campaignData.invoice_date}</span>
            </li>
            <li className="invoice-data-list">
              <p>Brand</p>
              <span className="invoice-tag">{campaignData.brand_name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Campaign Duration</p>
              <span className="invoice-tag">{campaignData.campaign_duration}</span>
            </li>
            <li className="invoice-data-list">
              <p className="mr-8">Deliverables</p>
              <div className="invoice-tag">
                <p className="invoice-tag-small">Drive Folder</p>
                <button className="center-btn ml-3" onClick={undefined}>
                  <Image src={Plus} alt="Icon" width={15} height={15} />
                </button>
              </div>
            </li>
            <li className="invoice-data-list">
              <p>Representative</p>
              <span className="invoice-tag">data</span>
            </li>
            <li className="invoice-data-list">
              <p>Total Amount</p>
              <span className="invoice-tag">data</span>
            </li>
          </ul>
        </div>
        <div className="send-contract mt-6">
          <button className="sec-button w-50 img-btn linen" onClick={undefined}>
            <Image src={Download} alt="Icon" width={20} height={20} />
            <p>Download as PDF</p>
          </button>
        </div>
      </div>
    </div >
  );
};

export { CampaignsDetails, CampaignsInvoice };