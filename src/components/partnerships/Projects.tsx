import React from "react";
import Image from "next/image";
import Img from "@/components/assets/images/image.png";
import Folder from "@/components/assets/icons/folder.svg";
import Download from "@/components/assets/icons/download.svg";
import Export from "@/components/assets/icons/export.svg";
import Plus from "@/components/assets/icons/plus.svg";
import Message from "@/components/assets/icons/message.svg";
import Send from "@/components/assets/icons/send.svg";




interface ProfileDetailsProps {
  profileData: any;
}

interface ProfileInvoiceProps {
  profileData: any;
}

const ProfileDetails = ({ profileData }: ProfileDetailsProps) => {
  return (
    <div className="card-container">
      <div className="head-card mb-1" >
        <div className="profile-info">
          <div className="profile-info-image">
            <img src={profileData?.profile_picture_url} alt="Brand" className="profile-image" loading="lazy" />
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-info-text-campaigns">
            <div className="profile-info-campaigns">
              <p className="profile-campaigns-text ml-2">{profileData?.name}</p>
            </div>
            <div className="profile-info-campaigns">
              <p className="profile-campaigns-text ml-2 text-14">{profileData?.email}</p>
            </div>
            <div className="profile-info-campaigns">
              <div className="row-wrap-2 ml-2">
                <Image src={Export} alt="Icon" width={12} height={12} />
                <a
                  href={profileData?.brand_website}
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
            <p className="text-20 bold">{profileData?.campaign_name}</p>
          </span>
        </div>
        <div>
          <p className="profile-subtitle mb-1">CONTRACT VALUE</p>
          <span className="sec-button gray1" onClick={undefined}>
            <p className="text-20 bold">${profileData?.contract_value}</p>
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

const ProfileInvoice = ({ profileData }: ProfileInvoiceProps) => {
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
              <span className="invoice-tag">{profileData?.invoice_number}</span>
            </li>
            <li className="invoice-data-list">
              <p>Invoice date</p>
              <span className="invoice-tag">{profileData?.invoice_date}</span>
            </li>
            <li className="invoice-data-list">
              <p>Brand</p>
              <span className="invoice-tag">{profileData?.brand_name}</span>
            </li>
            <li className="invoice-data-list">
              <p>Campaign Duration</p>
              <span className="invoice-tag">{profileData?.campaign_duration}</span>
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

export { ProfileDetails, ProfileInvoice };

// const Profiledetails = () => {
//   return (
//     <div className="card-container">
//       <div className="head-card">
//         <div className="profile-info">
//           <div className="profile-info-image">
//             <Image src={Img} alt="Icon" width={130} height={130} className="" />
//           </div>
//         </div>
//         <div className="profile-info">
//           <div className="profile-info-text">
//             <div className="profile-info-name">Alix Earle</div>
//             <div className="profile-info-web">aearle@tiktok.com</div>
//             <div className="profile-info-location">
//               <div className="profile-info-home">
//                 <Image
//                   src={Img}
//                   alt="Icon"
//                   width={20}
//                   height={20}
//                   className=""
//                 />
//                 Miami, FL
//               </div>
//               <div className="profile-info-home-icon">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/747/747393.png"
//                   alt="Icon"
//                   width={20}
//                   height={20}
//                 />
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/747/747393.png"
//                   alt="Icon"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="card-text">
//         <div>
//           <p className="profile-subtitle">SELECT CAMPAIGN</p>
//           <button className="sec-button gray" onClick={undefined}>
//             Hot Mes Podcast January Updates
//           </button>
//         </div>
//         <div>
//           <p className="profile-subtitle">SELECT STAGE</p>
//           <button className="sec-button gray" onClick={undefined}>
//             Content Created
//           </button>
//         </div>
//         <div>
//           <p className="profile-subtitle">MANAGE CONTRACT</p>
//           <button className="sec-button" onClick={undefined}>
//             Send Contract
//           </button>
//         </div>
//         <div>
//           <p className="profile-subtitle">MANAGE INVOICE</p>
//           <button className="sec-button" onClick={undefined}>
//             Send Invoice
//           </button>
//         </div>
//         <div>
//           <p className="profile-subtitle">MANAGE CREATOR</p>
//           <div className="button-group">
//             <button className="sec-button" onClick={undefined}>
//               Message
//             </button>
//             <button className="sec-button stone" onClick={undefined}>
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Profileinvoice = () => {
//   return (
//     <div className="card-container-invoice">
//       <div className="head-card-invoice">
//         <p className="profile-subtitle">HISTORY</p>
//         <div className="history-invoice">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/747/747393.png"
//             alt="Icon"
//             width={15}
//             height={15}
//           />
//           <p>Contract sent on 01/20/24.</p>
//           <button
//             className="sec-button transparent"
//             style={{
//               width: "40px",
//               minHeight: "10px",
//               marginLeft: "30px",
//               color: "gold",
//             }}
//             onClick={undefined}
//           >
//             VIEW
//           </button>
//         </div>
//         <div className="history-invoice">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/747/747393.png"
//             alt="Icon"
//             width={15}
//             height={15}
//           />
//           <p>Contract sent on 01/20/24.</p>
//           <button
//             className="sec-button transparent"
//             style={{
//               width: "40px",
//               minHeight: "10px",
//               marginLeft: "30px",
//               color: "gold",
//             }}
//             onClick={undefined}
//           >
//             VIEW
//           </button>
//         </div>
//       </div>
//       <div className="agency-invoice">
//         <p className="invoice-subtitle">AGENCY INVOICE</p>
//         <div className="invoice-data">
//           <ul>
//             <li className="invoice-data-list">
//               <p>Invoice number</p>
//               <span className="round-tag gray1">INV 32</span>
//             </li>
//             <li className="invoice-data-list">
//               <p>Invoice date</p>
//               <p className="round-tag gray1">January 11, 2024</p>
//             </li>
//             <li className="invoice-data-list">
//               <p>Creator</p>
//               <p className="round-tag gray1">Alix Earle</p>
//             </li>
//             <li className="invoice-data-list">
//               <p>Niche</p>
//               <p className="round-tag gray1">
//                 Tiktok Influencer, Women's Lifestyle
//               </p>
//             </li>
//             <li className="invoice-data-list">
//               <p>Campaign duration</p>
//               <p className="round-tag gray1">Jan 12-22(10 d)</p>
//             </li>
//             <li className="invoice-data-list">
//               <p>Deliverables</p>
//               <p className="round-tag gray1">drive folder</p>
//             </li>
//             <li className="invoice-data-list">
//               <p>Total Amount</p>
//               <p className="round-tag gray1">8.000$</p>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { Profiledetails, Profileinvoice };
