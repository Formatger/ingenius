// import React, { useState } from 'react';
// import Sidebar from "@/components/navigation/Sidebar";
// import Breadcrumbs from "@/components/navigation/Breadcrumbs";
// import Image from "next/image";
// import withAuth from "@/components/common/WithAuth";
// import { Arrow } from "@/components/assets/svg/Arrow";
// import Plus from "@/components/assets/icons/plus.svg";
// import Edit from "@/components/assets/icons/edit.svg";
// import Link from "next/link";
// import ProjectForm from "@/components/dashboard/form/ProjectForm";
// import ProjectsCard from '../kanban/ProjectCard';
// import { v4 as uuidv4 } from 'uuid'; 


// interface profileData {
//   id: string;
//   name: string;
//   profile_picture_url: string;
// }

// interface DragDropProps {
//   profileData: profileData;
// }

//   interface FormData {
//     id: string;
//     projectName: string;
//     description: string;
//     creator: profileData | null;
//   }
  
//   const DragDrop: React.FC<{ profileData: profileData[] }> = ({ profileData }) => {

//   // DROPDOWN FILTER
//     const typedocument = [
//         { id: "tf-1", value: "All" },
//         { id: "tf-2", value: "Contact" },
//         { id: "tf-3", value: "Content" },
//         { id: "tf-4", value: "Invoice" },
//     ];

//     const [isTypedocumentOpen, setIsTypedocumentOpen] = useState(false);
//     const [selectedTypedocument, setSelectedTypedocument] = useState(typedocument[0]);
    
//     const handleSelectTypedocument = (tf: any) => {
//         setSelectedTypedocument(tf);
//         setIsTypedocumentOpen(false);
//     };

// // SIDEPANEL OPEN/CLOSE

//     const [openSidepanel, setOpenSidepanel] = useState(false);
//     const handleOpenSidepanel = (campaign: any) => {
//         setOpenSidepanel(!openSidepanel);
//     };
//     const handleCloseSidepanel = () => {
//         setOpenSidepanel(false);
//     };

//  // SAVE FORM 
//     const [savedData, setSavedData] = useState<FormData | null>(null);
//     const [savedDataList, setSavedDataList] = useState<FormData[]>([]);

//     const handleSaveFormData = (data: FormData) => {
//         console.log("Data from form:", data);
//         setSavedData(data);
//         setOpenSidepanel(false);
//         setSavedDataList(currentList => [...currentList, data]);
//     };

//     const handleSaveCreatorData = (profile: any) => {
//         console.log("Data from form:", profile);
//         setCreatorSavedData(profile)
//     };

//     const [creatorSavedData, setCreatorSavedData] = useState<profileData | null>(null); 

//   // GENERATE UNIQUE ID
//     const [cardId, setCardId] = useState<string>(uuidv4());

//       console.log(cardId)

//     const generateCardId = () => {
//         setCardId(uuidv4());
//     };

//     return (
//         <div className='elements-container'>
//             { openSidepanel && 
//               <ProjectForm onSave={handleSaveFormData} 
//                 onCreatorSave={handleSaveCreatorData} 
//                 profileData={profileData} 
//                 generateCardId={generateCardId} />
//             }
            
//             <div className="table-container">
//                 <section className="visualisation-container">
//                     <button
//                         className={isTypedocumentOpen ? "documentdownButtonOpen" : "documentdownButton"}
//                         onClick={() => setIsTypedocumentOpen(!isTypedocumentOpen)}>
//                         <span className="documentTypeLabel">Document Type: &#160;</span>
//                         <span className="selectedValue">{selectedTypedocument.value}</span>
//                     </button>
//                     {isTypedocumentOpen && (
//                         <ul className="documentdownListStick">
//                             {typedocument.map((tf) => (
//                                 <li className="documentdownListItem" key={tf.id}>
//                                     <button
//                                         className="documentdownItem"
//                                         onClick={() => handleSelectTypedocument(tf)}
//                                     >
//                                         {tf.value}
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                     <div className="visualisation-icon">
//                         <button className="visualize-icon">
//                             <Arrow className="arrow-down" />
//                         </button>
//                         <button className="visualize-icon">
//                             <Arrow className="arrow-down" />
//                         </button>
//                     </div>
//                 </section>
//                 <section >
//                     <table className="dragdrop-table">
//                         <thead>
//                             <tr className="dragdrop-column">
//                                 <td className='type-column' >
//                                     <span className="dragdrop-tag">Contract Sent </span>
//                                     <div className='separation-line'></div>
//                                     {/* Render CreateCard component for each saved data */}
//                                     {savedDataList.map((item) => (
//                                         <ProjectsCard 
//                                         key={item.id} 
//                                         generateCard={item} 
//                                         creatorSavedData={creatorSavedData} 
//                                         createdDate={new Date()} />
//                                     ))}
//                                 </td>
//                                 <td className='type-column' >
//                                     <span className="dragdrop-tag">Contract Sent </span>
//                                     <div className='separation-line'></div>
//                                 </td>
//                                 <td className='type-column' >
//                                     <span className="dragdrop-tag">Contract Sent </span>
//                                     <div className='separation-line'></div>
//                                     <div className='project-card'>
//                                     </div>
//                                 </td>
//                                 <th className='type-column' >
//                                     <span className="dragdrop-tag">Contract Sent </span>
//                                     <div className='separation-line'></div>
//                                 </th>
//                             </tr>
//                         </thead>
//                         <div>
//                             <button className="visualize-icon" >
//                                 <Image src={Plus} alt="Icon" width={15} height={15} />

//                             </button>
//                             <button className="visualize-icon">
//                                 <Image src={Edit} alt="Icon" width={15} height={15} />
//                             </button>
//                         </div>
//                     </table>
//                 </section>
//             </div>
//             <div className='buttons-position'>
//                 <button className="add-button" onClick={() => setOpenSidepanel(true)}>
//                     <p>Add Project</p>
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default DragDrop;


