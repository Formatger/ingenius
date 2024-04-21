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
import { deleteProject } from "@/utils/httpCalls";
import Export from "@/components/assets/icons/export.svg";

interface ProjectDetailsProps {
  projectsData: any;
  updateProjectData?: () => void;
  handleClose?: () => void;
}

interface ProjectInvoiceProps {
  projectsData: any;
}

interface ProjectContractProps {
  projectsData: any;
}

const ProjectDetails = ({ projectsData, handleClose, updateProjectData }: ProjectDetailsProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

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

  return (
    <div className="card-container">
      <div className="head-card mb-1" >
        <div className="profile-info">
          <div className="profile-info-image">
            <img src={projectsData?.creator_profile_picture} alt="Creator" className="profile-image" loading="lazy" />
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
              <p className="profile-text ml-2 text-14">{projectsData?.creator_email}</p>
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
          <span className="sec-button gray1" >
            <p className="sec-tag">{projectsData?.name}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps">CAMPAIGN</p>
          <span className="sec-button gray1" >
            <p className="sec-tag">{projectsData?.campaign_name}</p>
          </span>
        </div>

        <div>
          <p className="smallcaps">description</p>
          <span className="sec-button gray1" >
            <p className="description">{projectsData?.description}</p>
          </span>
        </div>
        {/* <div>
          <p className="smallcaps">deliverables</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="description">2 youtube videos and 1 Instragram reel</p>
          </span>
        </div> */}
        <div>
          <p className="smallcaps">CONTRACT VALUE</p>
          <span className="sec-button gray1" >
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

const ProjectInvoice = ({ projectsData }: ProjectInvoiceProps) => {
  return (
    <div className="card-container">

      <div className="agency-invoice">
        <p className="smallcaps">
          CONTRACT DETAILS
        </p>
        <div className="invoice-data">
          <ul>
            {/* <li className="invoice-data-list">
              <p>Invoice Number</p>
              <span className="invoice-tag">{projectsData?.invoice_number}</span>
            </li>
            <li className="invoice-data-list">
              <p>Invoice Date</p>
              <span className="invoice-tag">{projectsData?.invoice_date}</span>
            </li> */}
            <li className="invoice-data-list">
              <p>Company</p>
              <span className="invoice-tag">company_name</span>
            </li>
            <li className="invoice-data-list">
              <p>Creator</p>
              <span className="invoice-tag">{projectsData?.creator_name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Scope of Work</p>
              <span className="invoice-tag">{projectsData?.name}</span>
            </li>
            {/* <li className="invoice-data-list">
              <p>Deliverables</p>
              <span className="invoice-tag">{projectsData?.deliverables}deliverables</span>
            </li> */}
            <li className="invoice-data-list">
              <p>Delivery Period</p>
              <span className="invoice-tag">{projectsData?.project_duration}</span>
            </li>
            <li className="invoice-data-list">
              <p>Contract Value</p>
              <span className="invoice-tag">${projectsData?.contract_value}</span>
            </li>
            <li className="invoice-data-list">
              <p>Invoice Status</p>
              <span className="invoice-tag">{projectsData?.invoice_paid ? "Paid" : "Unpaid"}</span>
            </li>
          </ul>
        </div>

        <div className="sidepanel-hidden">
          <p className="smallcaps mt-5" >MANAGE CONTRACT</p>

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
              <Image src={Download} alt="Icon" width={20} height={20} />
              <p>Download as PDF</p>
            </button>
          </div>
        </div>

        <div className="">
          <p className="smallcaps mt-5" >MANAGE INVOICE</p>
          <div className="button-group">
            <button className="sec-button linen" onClick={undefined}>
              {/* <Image src={Send} alt="Icon" width={15} height={15} /> */}
              <p>Upload Invoice</p>
            </button>
            <button className="sec-button w-50 img-btn linen" onClick={undefined}>
              <Image src={Folder} alt="Icon" width={15} height={15} />
              <p>View Invoice</p>
            </button>      
          </div>
          <div className="button-group mt-3">
            <button className="sec-button linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Invoice</p>
            </button>
            <button className="sec-button w-50 img-btn linen" onClick={undefined}>
              <Image src={Download} alt="Icon" width={20} height={20} />
              <p>Download as PDF</p>
            </button>      
          </div>
        </div>

      </div>
    </div >
  );
};

const ProjectContract = ({ projectsData }: ProjectContractProps) => {
  return (
    <div className="card-container">

      <div className="agency-invoice">
        <p className="smallcaps">
          CREATOR CONTRACT
        </p>
        <div className="invoice-data">
        <ul>
           <li className="invoice-data-list">
              <p>Company</p>
              <span className="invoice-tag">company_name</span>
            </li>
            <li className="invoice-data-list">
              <p>Creator</p>
              <span className="invoice-tag">{projectsData?.creator_name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Project</p>
              <span className="invoice-tag">{projectsData?.name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Project Duration</p>
              <span className="invoice-tag">{projectsData?.project_duration}</span>
            </li>
            <li className="invoice-data-list">
              <p>Contract Value</p>
              <span className="invoice-tag">${projectsData?.contract_value}</span>
            </li>
            <li className="deliverable-wrap">
              <div><p>Deliverables</p></div>
              <div className="deliverables mt-3">
                <span className="invoice-tag">{projectsData?.deliverables} 1 Instagram reel, 2 youtube videos, 1 tiktok video </span>
                <span className="invoice-tag">{projectsData?.deliverables} 2 Tiktok videos</span>
                <span className="invoice-tag">{projectsData?.deliverables} 1 Youtube videos</span>
              </div>
            </li>
            <li className="deliverable-wrap">
              <div><p>Payment Terms</p></div>
              <div className="deliverables mt-3">
                <span className="invoice-textarea">{projectsData?.deliverables}  10 days after content delivery </span>
              </div>
            </li>
        </ul>
        
        {/* <div className="contract-parties">
          <ul>
            <li className="invoice-data-list">
              <p>Company</p>
              <span className="invoice-tag">company_name</span>
            </li>
            <li className="invoice-data-list">
              <p>Address</p>
              <span className="invoice-tag">company_address</span>
            </li>
            <li className="invoice-data-list">
              <p>Contact Name</p>
              <span className="invoice-tag">company_contact</span>
            </li>
            <li className="invoice-data-list">
              <p>Email</p>
              <span className="invoice-tag">company_mail</span>
            </li>
          </ul>

          <ul>
            <li className="invoice-data-list">
              <p>Creator Partner</p>
              <span className="invoice-tag">{projectsData?.creator_name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Address</p>
              <span className="invoice-tag">creator_address</span>
            </li>
            <li className="invoice-data-list">
              <p>Contact Name</p>
              <span className="invoice-tag">creator_contact</span>
            </li>
            <li className="invoice-data-list">
              <p>Email</p>
              <span className="invoice-tag">{projectsData?.creator_email}</span>
            </li>
          </ul>
          </div>
          <div>
          <ul>
            <li className="invoice-data-list">
              <p>Project</p>
              <span className="invoice-tag">{projectsData?.name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Deliverables</p>
              <span className="invoice-tag">{projectsData?.deliverables}deliverables</span>
            </li>
            <li className="invoice-data-list">
              <p>Project Duration</p>
              <span className="invoice-tag">{projectsData?.project_duration}</span>
            </li>
            <li className="invoice-data-list">
              <p>Compensation</p>
              <span className="invoice-tag">${projectsData?.contract_value}</span>
            </li>
          </ul>
          </div> */}
        </div>

        <div className="sidepanel-hidden">
          <p className="smallcaps mt-5" >MANAGE CONTRACT</p>

          <div className="button-group">
            <button className="sec-button linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Contract</p>
            </button>
            <button className="sec-button w-50 img-btn linen" onClick={undefined}>
              <Image src={Download} alt="Icon" width={20} height={20} />
              <p>Download as PDF</p>
            </button>
          </div>
        </div>

      </div>
    </div >
  );
};

export { ProjectDetails, ProjectInvoice, ProjectContract };



/* SECOND STEP */
// const ProfileDetailsSidebar = ({ creatorsData }: ProfileDetailsSidebarProps) => {
//   return (
//     <div className="card-container">
//             <div className="head-card mb-1" >
//         <div className="profile-info">
//           <div className="profile-info-image">
//             <img src={creatorsData?.profile_picture_url} alt="Brand" className="profile-image" loading="lazy" />
//           </div>
//         </div>
//         <div className="profile-info">
//           <div className="profile-info-box">
//             <div className="profile-info-wrap">
//               <p className="smallcaps">CREATOR</p>
//               <p className="profile-text ml-2">{creatorsData?.name}</p>
//             </div>
//             <div className="profile-info-wrap">
//               <p className="smallcaps">CONTACT</p>
//               <p className="profile-text ml-2 text-14">{creatorsData?.email}</p>
//             </div>
//             <div className="profile-info-wrap">
//               <p className="smallcaps">WEBSITE</p>
//               <div className="row-wrap-2 ml-2">
//                 <Image src={Export} alt="Icon" width={12} height={12} />
//                 <a
//                   href={creatorsData?.brand_website}
//                   className="profile-text text-12"
//                   target="_blank"
//                 >View Website</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="card-text">
//         <div>
//           <p className="smallcaps mb-1">CAMPAIGN</p>
//           <span className="sec-button gray1" onClick={undefined}>
//             <p className="sec-tag">{creatorsData?.campaign_name}</p>
//           </span>
//         </div>
//         <div>
//           <p className="smallcaps mb-1">ADD STAGE</p>
//           <span className="sec-button gray1" onClick={undefined}>
//             <p className="sec-tag">${creatorsData?.contract_value}</p>
//           </span>
//         </div>
//         <div>
//           <p className="smallcaps mb-1" >MANAGE CONTRACTS</p>
//           <div className="button-group">
//           <button className="sec-button linen" onClick={undefined}>
//               <Image src={Message} alt="Icon" width={15} height={15} />
//               <p>Message</p>
//             </button>
//             <button className="sec-button linen" onClick={undefined}>
//               <Image src={Send} alt="Icon" width={15} height={15} />
//               <p>Send Contract</p>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };