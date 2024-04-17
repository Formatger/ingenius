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
              <p className="smallcaps">CREATOR</p>
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
          <span className="sec-button gray1" onClick={undefined}>
            <p className="text-20 bold">{projectsData?.name}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps">description</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="description">{projectsData?.description}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps">CAMPAIGN</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="text-20 bold">{projectsData?.campaign_name}</p>
          </span>
        </div>
        <div>
          <p className="smallcaps">CONTRACT VALUE</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="text-20 bold">${projectsData?.contract_value}</p>
          </span>
        </div>
        {/* <div>
          <p className="smallcaps">PROJECT STAGE</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="text-20 bold">{projectsData?.project_stage}</p>
          </span>
        </div> */}
        

      {/* INVOICE/CONTRACT SECTION - Hidden on Sidepanel */}

          <div className="sidepanel-hidden">
          <p className="smallcaps">MANAGE CREATOR</p>
          <div className="button-group">
          <button className="sec-button linen" onClick={undefined}>
              <Image src={Message} alt="Icon" width={15} height={15} />
              <p>Message</p>
            </button>
            <button className="sec-button linen" onClick={undefined}>
              {/* <Image className="" src={Folder} alt="Icon" width={15} height={15} /> */}
              <p>View Profile</p>
            </button>
          </div>
        </div>
        <div className="sidepanel-hidden">
          <p className="smallcaps">VIEW DOCUMENTS</p>
          <div className="button-group">
          <button className="sec-button linen" onClick={undefined}>
              <Image src={Folder} alt="Icon" width={15} height={15} />
              <p>View Contract</p>
            </button>
            <button className="sec-button linen" onClick={undefined}>
              <Image className="" src={Folder} alt="Icon" width={15} height={15} />
              <p>View Invoice</p>
            </button>
          </div>
        </div>
        {/* INVOICE/CONTRACT SECTION - Hidden on Sidepanel */}
{/* 
        <div className="profile-hidden">
          <p className="smallcaps">MANAGE PROJECT</p>
          <div className="button-group">
            <button className="sec-button linen" onClick={undefined}>
              <p>Edit</p>
            </button>
            <button className="sec-button stone" onClick={() => setModalOpen(true)}>
              <p>Delete</p>
            </button>
          </div>
        </div>

        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Delete Project"
          onConfirm={handleDelete}
          message="Are you sure you want to delete this project?"
        /> */}
      </div>
    </div >
  );
};

const ProjectInvoice = ({ projectsData }: ProjectInvoiceProps) => {
  return (
    <div className="card-container">

      <div className="agency-invoice">
        <p className="smallcaps">
          CREATOR INVOICE
        </p>
        <div className="invoice-data">
          <ul>
            <li className="invoice-data-list">
              <p>Invoice Number</p>
              <span className="invoice-tag">{projectsData?.invoice_number}</span>
            </li>
            <li className="invoice-data-list">
              <p>Invoice Date</p>
              <span className="invoice-tag">{projectsData?.invoice_date}</span>
            </li>
            <li className="invoice-data-list">
              <p>Invoice Status</p>
              <span className="invoice-tag">{projectsData?.invoice_paid}Unpaid</span>
            </li>
            <li className="invoice-data-list">
              <p>Creator</p>
              <span className="invoice-tag">{projectsData?.creator_name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Brand</p>
              <span className="invoice-tag">{projectsData?.brand_name}</span>
            </li>
            {/* <li className="invoice-data-list">
              <p>Campaign</p>
              <span className="invoice-tag">{projectsData?.campaign_name}</span>
            </li> */}
            <li className="invoice-data-list">
              <p>Project Duration</p>
              <span className="invoice-tag">{projectsData?.project_duration}</span>
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
              <p>Total Amount</p>
              <span className="invoice-tag">{projectsData?.contract_value}</span>
            </li>
          </ul>
        </div>

        <div className="">

          {/* <div className="mt-6">
            <p className="smallcaps">INVOICE STATUS</p>
            <span className="sec-button green" onClick={undefined}>
              <p className="text-20 bold">{projectsData?.invoice_paid} Paid</p>
            </span>
          </div> */}

          <p className="smallcaps mt-5" >MANAGE INVOICE</p>

          <div className="button-group">
          <button className="sec-button linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Invoice</p>
            </button>
            {/* <button className="sec-button w-50 img-btn linen" onClick={undefined}>
              <Image src={Download} alt="Icon" width={20} height={20} />
              <p>Download as PDF</p>
            </button> */}
          </div>
{/*     
          <div className="button-group mt-6">
          <button className="sec-button linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Invoice</p>
            </button>
            <button className="sec-button w-50 img-btn linen" onClick={undefined}>
              <Image src={Download} alt="Icon" width={20} height={20} />
              <p>Download Invoice</p>
            </button>
          </div> */}
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
            {/* <li className="invoice-data-list">
              <p>Invoice Number</p>
              <span className="invoice-tag">{projectsData?.invoice_number}</span>
            </li> */}
            <li className="invoice-data-list">
              <p>Contract Date</p>
              <span className="invoice-tag">{projectsData?.invoice_date}</span>
            </li>
            {/* <li className="invoice-data-list">
              <p>Invoice Status</p>
              <span className="invoice-tag">{projectsData?.invoice_paid}Unpaid</span>
            </li> */}
            <li className="invoice-data-list">
              <p>Creator</p>
              <span className="invoice-tag">{projectsData?.creator_name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Brand</p>
              <span className="invoice-tag">{projectsData?.brand_name}</span>
            </li>
            {/* <li className="invoice-data-list">
              <p>Campaign</p>
              <span className="invoice-tag">{projectsData?.campaign_name}</span>
            </li> */}
            <li className="invoice-data-list">
              <p>Project Duration</p>
              <span className="invoice-tag">{projectsData?.project_duration}</span>
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
              <p>Total Amount</p>
              <span className="invoice-tag">{projectsData?.contract_value}</span>
            </li>
          </ul>
        </div>

        <div className="sidepanel-hidden">
          <p className="smallcaps mt-5" >MANAGE CONTRACT</p>

          <div className="button-group">
            {/* <button className="sec-button linen" onClick={undefined}>
              <Image src={Folder} alt="Icon" width={15} height={15} />
              <p>View Contract</p>
            </button> */}
            <button className="sec-button linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Contract</p>
            </button>
          </div>
    
          <div className="button-group mt-6">
            <button className="sec-button w-50 img-btn linen" onClick={undefined}>
              <p>Update Contract</p>
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
//             <p className="text-20 bold">{creatorsData?.campaign_name}</p>
//           </span>
//         </div>
//         <div>
//           <p className="smallcaps mb-1">ADD STAGE</p>
//           <span className="sec-button gray1" onClick={undefined}>
//             <p className="text-20 bold">${creatorsData?.contract_value}</p>
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