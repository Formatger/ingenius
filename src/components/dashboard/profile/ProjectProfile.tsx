import React from "react";
import Image from "next/image";
import Insta from "@/components/assets/images/insta.png";
import Tiktok from "@/components/assets/images/tiktok.png";
import Folder from "@/components/assets/icons/folder.svg";
import Download from "@/components/assets/icons/download.svg";
import Plus from "@/components/assets/icons/plus.svg";
import Message from "@/components/assets/icons/message.svg";
import Send from "@/components/assets/icons/send.svg";

interface ProjectDetailsProps {
  projectsData: any;
}

interface ProjectInvoiceProps {
  projectsData: any;
}

const ProjectDetails = ({ projectsData }: ProjectDetailsProps) => {

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
        <div>
          <p className="smallcaps" >MANAGE CONTRACTS</p>
          <div className="button-group">
            <button className="sec-button linen" onClick={undefined}>
              <Image src={Folder} alt="Icon" width={15} height={15} />
              <p>View Contract</p>
            </button>
            <button className="sec-button linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Contract</p>
            </button>
          </div>
        </div>

        {/* INVOICE SECTION - Hidden on Sidepanel */}
        <div className="invoice-section">
          <p className="smallcaps">MANAGE INVOICE</p>
          <div className="button-group">
            <button className="sec-button linen" onClick={undefined}>
              <Image className="" src={Folder} alt="Icon" width={15} height={15} />
              <p>View Invoice</p>
            </button>
            <button className="sec-button linen" onClick={undefined}>
              <Image src={Send} alt="Icon" width={15} height={15} />
              <p>Send Invoice</p>
            </button>
          </div>
        </div>
        {/* INVOICE SECTION - Hidden on Sidepanel */}

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
  );
};

const ProjectInvoice = ({ projectsData }: ProjectInvoiceProps) => {
  return (
    <div className="card-container-invoice-campaigns">
      <div className="agency-invoice">
        <p className="smallcaps">
          AGENCY INVOICE
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
              <p>Creator</p>
              <span className="invoice-tag">{projectsData?.creator_name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Project Duration</p>
              <span className="invoice-tag">{projectsData?.project_duration}</span>
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
              <p>Total Amount</p>
              <span className="invoice-tag">{projectsData?.contract_value}</span>
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <button className="sec-button w-50 img-btn linen" onClick={undefined}>
            <Image src={Download} alt="Icon" width={20} height={20} />
            <p>Download as PDF</p>
          </button>
        </div>
      </div>
    </div >
  );
};

export { ProjectDetails, ProjectInvoice };



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