import React, { useRef, useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import Image from "next/image";
import Insta from "@/components/assets/images/insta.png";
import Tiktok from "@/components/assets/images/tiktok.png";
import Folder from "@/components/assets/icons/folder.svg";
import Download from "@/components/assets/icons/download.svg";
import Link from "@/components/assets/icons/link.svg";
import Message from "@/components/assets/icons/message.svg";
import Export from "@/components/assets/icons/export.svg";
import ErrorModal from "@/components/common/ErrorModal";
import UploadFileModal from "@/components/common/UploadFileModal";
import { useRouter } from "next/router";

interface ProjectDetailsProps {
  projectsData: any;
  updateProjectData?: () => void;
  handleClose?: () => void;
}

interface ProjectInvoiceProps {
  projectsData: any;
  setRefreshData: (value: boolean) => void;
}

const ProjectDetails = ({ projectsData }: ProjectDetailsProps) => {
  const router = useRouter();

  return (
    <div className="card-container">
      <div className="head-card mb-1">
        <div className="profile-info">
          <div className="profile-info-image">
            {/* <Image
              src={projectsData?.creator_profile_picture}
              alt="Creator"
              width={160}
              height={160}
              layout="fixed"
              className="profile-image"
              loading="lazy"
              quality={75}
            /> */}
            <img
              src={projectsData?.creator_profile_picture}
              alt="Creator"
              className="profile-image"
              loading="lazy"
            />
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-info-box">
            <div className="profile-info-wrap">
              <div className="viewprofile-wrap">
                <p className="smallcaps">CREATOR</p>
                {/* <button className="sec-button small linen mb-2" onClick={undefined}>
                <Image className="" src={Export} alt="Icon" width={10} height={10} />
                 <p>View Profile</p>
              </button> */}
              </div>
              <p className="profile-text ml-2">{projectsData?.creator_name}</p>
            </div>
            <div className="profile-info-wrap">
              <p className="smallcaps">CONTACT</p>
              <p className="profile-text ml-2 text-14">
                {projectsData?.creator_email}
              </p>
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
          <p className="smallcaps">PROJECT</p>
          <span className="sec-button gray1">
            <p className="sec-tag">{projectsData?.name}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps">CAMPAIGN</p>
          <span className="sec-button gray1">
            <p className="sec-tag">{projectsData?.campaign_name}</p>
          </span>
        </div>

        <div>
          <p className="smallcaps">description</p>
          <span className="sec-tag gray1">
            <p className="description">{projectsData?.description}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps">CONTRACT VALUE</p>
          <span className="sec-button gray1">
            <p className="sec-tag">${projectsData?.contract_value}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps">PROJECT STAGE</p>
          <span className="sec-button gray1">
            <p className="sec-tag">{projectsData?.project_stage_name}</p>
          </span>
        </div>

        {/* Hidden on Sidepanel */}
        <div className="sidepanel-hidden">
          <p className="smallcaps">MANAGE CREATOR</p>
          <div className="button-group">
            <button
              className="sec-button linen"
              onClick={() => window.location.href = `mailto:${projectsData?.creator_email}?subject=Subject&body=Body`}
            >
              <Image src={Message} alt="Icon" width={15} height={15} />
              <p>Message</p>
            </button>

            <button className="sec-button linen" onClick={() => {
              router.push(`/dashboard/clients/creators/profile?creatorId=${projectsData?.creator}`)
            }}>
              <Image
                className=""
                src={Export}
                alt="Icon"
                width={14}
                height={14}
              />
              <p>View Profile</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectInvoice = ({ projectsData, setRefreshData }: ProjectInvoiceProps) => {
  const [isFileModalOpenContract, setFileModalOpenContract] = useState(false);
  const [isFileModalOpenInvoice, setFileModalOpenInvoice] = useState(false);

  return (
    <div className="card-container">
      <div className="agency-invoice">
        <p className="smallcaps">CONTRACT DETAILS</p>
        <div className="invoice-data">
          <ul>
            <li className="invoice-data-list">
              <p>Creator</p>
              <span className="invoice-tag">{projectsData?.creator_name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Scope of Work</p>
              <span className="invoice-tag">{projectsData?.name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Delivery Period</p>
              <span className="invoice-tag">
                {projectsData?.project_duration}
              </span>
            </li>
            <li className="invoice-data-list">
              <p>Contract Value</p>
              <span className="invoice-tag">
                ${projectsData?.contract_value}
              </span>
            </li>
            <li className="invoice-data-list">
              <p>Invoice Status</p>
              <span className="invoice-tag">
                {projectsData?.invoice_paid ? "Paid" : "Unpaid"}
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-5">
          <p className="smallcaps">MANAGE CONTRACT</p>

          <div className="button-group">
            <button
              className="sec-button linen"
              onClick={() => {
                setFileModalOpenContract(true);
              }}
            >
              <Image src={Link} alt="Icon" width={14} height={14} />
              <p>Upload Contract</p>
            </button>
            <UploadFileModal
              isOpen={isFileModalOpenContract}
              onClose={() => {
                setFileModalOpenContract(false)
                setRefreshData(true)
              }}
              title="Upload Contract"
              message="Upload a Contract File in PDF format."
              button="Upload File"
              id={projectsData?.id}
              endpoint="projects"
              type="contract"
            />
            <a
              target="_blank"
              className="sec-button w-50 img-btn linen"
              href={projectsData?.contract_file}
            >
              <Image src={Folder} alt="Icon" width={15} height={15} />
              <p>View Contract</p>
            </a>
          </div>

          <div className="button-group mt-3">
            {/* <button className="sec-button linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Contract</p>
            </button> */}
            <a
              target="_blank"
              className="sec-button w-50 img-btn linen"
              href={projectsData?.contract_file}
              download
            >
              <Image src={Download} alt="Icon" width={18} height={18} />
              <p>Download as PDF</p>
            </a>
          </div>
        </div>

        <div className="">
          <p className="smallcaps mt-5">MANAGE INVOICE</p>
          <div className="button-group">
            <button
              className="sec-button linen"
              onClick={() => {
                setFileModalOpenInvoice(true);
              }}
            >
              <Image src={Link} alt="Icon" width={14} height={14} />
              <p>Upload Invoice</p>
            </button>
            <UploadFileModal
              isOpen={isFileModalOpenInvoice}
              onClose={() => {
                setFileModalOpenInvoice(false)
                setRefreshData(true)
              }}
              title="Upload Invoice"
              message="Upload an Invoice File in PDF format."
              button="Upload File"
              id={projectsData?.id}
              endpoint="projects"
              type="invoice"
            />
            <a
              target="_blank"
              className="sec-button w-50 img-btn linen"
              href={projectsData?.invoice_file}
            >
              <Image src={Folder} alt="Icon" width={15} height={15} />
              <p>View Invoice</p>
            </a>
          </div>
          <div className="button-group mt-3">
            {/* <button className="sec-button linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Invoice</p>
            </button> */}
            <a
              target="_blank"
              className="sec-button w-50 img-btn linen"
              href={projectsData?.invoice_file}
              download="invoice.pdf"
            >
              <Image src={Download} alt="Icon" width={18} height={18} />
              <p>Download as PDF</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProjectDetails, ProjectInvoice };
