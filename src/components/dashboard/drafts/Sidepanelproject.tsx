import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import { useState } from 'react';
// import SearchProfile from "../form/SearchProfile";
import { profile } from 'console';
// import { ProjectsDetailsSidebar } from "@/components/dashboard/profile/ProjectsProfile";
import { v4 as uuidv4 } from 'uuid';

interface SidepanelprojectProps {
    profileData: any;
    onSave:(data: any) => void;
    onCreatorSave:(data: any) => void;
    generateCardId:() => void;
  }

const Sidepanelproject: React.FC<SidepanelprojectProps> = ({ profileData, onSave, onCreatorSave, generateCardId }) => {
    console.log("======================")
    console.log(profileData)
    console.log("====================")

    const typedocument = [
        { id: "tf-1", value: "All" },
        { id: "tf-2", value: "Contact" },
        { id: "tf-3", value: "Content" },
        { id: "tf-4", value: "Invoice" },
    ];
    const [isTypedocumentOpen, setIsTypedocumentOpen] = useState(false);
    const [selectedTypedocument, setSelectedTypedocument] = useState(typedocument[0]);

    const handleSelectTypedocument = (tf: any) => {
        setSelectedTypedocument(tf);
        setIsTypedocumentOpen(false);
    };

    /* SIDEPANEL STATE */

    const [openSidepanel, setOpenSidepanel] = useState(false);
    const handleOpenSidepanel = (campaign: any) => {
        setOpenSidepanel(!openSidepanel);
    };

    const handleCloseSidepanel = () => {
        setOpenSidepanel(false);
    }


    /*VARIABLE SAVE FORM <FORMULARIO></FORMULARIO>*/

    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
    });

    const handleFormInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSave = () => {
        const newCardData = {
            ...formData,
            creator: creatorsData, // Include the currently selected creator data
            id: uuidv4(), // Ensure each card has a unique ID
        };
        onSave(newCardData); // Pass the new data structure including creator data
        setCreatorsData(null); // Reset selected creator to prevent it from being assigned to new cards by default
        generateCardId();
    };
    
    /* SEARCH */

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const filteredProfileData = profileData ? profileData.filter((profile: { name: string; }) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const [creatorsData, setCreatorsData] = useState(null);

    const onSetCreatorData = (profile: any) => {
        const data = (profile)
        setCreatorsData(profile)
        console.log("SIDEPANEL CREATOR DATA", creatorsData)
        console.log(profile.name)
        onCreatorSave(profile)
    }

    /* RENDER COMPONENT <PROFILEDETAILS></PROFILEDETAILS */ 

    const [showProfileDetails, setShowProfileDetails] = useState(false);

    return (
        <div className='sidepanel-projects-container' id="sidepanel">
            {!showProfileDetails && (
                <div>
                    <div className='sidepanel-button-group'>
                        <Link className="row-wrap-2 text-brown" href={{ pathname: 'dashboard/partnerships/projects' }}>
                            <Arrow className="arrow-left orange-fill" />
                            {`Add Project`}
                        </Link>
                        <div className='sidepanel-button'>
                            <button className='sidepanel-button-style'>
                                <HelpIcon />
                                Get help
                            </button>
                            <button className='sidepanel-button-style'>
                                <Image src={Edit} alt='' width={16} height={16} />
                                Edit
                            </button>
                        </div>
                    </div>
                    <div>
                        <form className='sidepanel-project-form'>
                            <div className='projectname-box'>
                                <span className='sidepanel-title'>PROJECT NAME*</span>
                                <input
                                    className='title-text'
                                    type='text'
                                    name='projectName'
                                    value={formData ? formData.projectName : ''}
                                    onChange={handleFormInputChange}
                                    placeholder='Enter a name'>
                                </input>
                            </div>
                            <div className='description-box'>
                                <span className='sidepanel-title'>DESCRIPTION</span>
                                <textarea
                                    className='description-text'
                                    name='description'
                                    value={formData ? formData.description : ''}
                                    onChange={handleFormInputChange}
                                    placeholder='Add a description'>
                                </textarea>
                            </div>
                            <span className='sidepanel-title'>SELECT PARTNER</span>
                            {/* <SearchProfile handleSearch={handleSearchChange} filteredProfileData={filteredProfileData} onSetCreatorData={onSetCreatorData} /> */}
                            <div>
                                {/* ADDING ROWS */}
                            </div>
                            <div className='campaign-box'>
                                <span className='sidepanel-title'>CAMPAIGN</span>
                                <button type="button"
                                    className={isTypedocumentOpen ? "documentdownButtonOpen" : "documentdownButton"}
                                    onClick={() => setIsTypedocumentOpen(!isTypedocumentOpen)}>
                                    <span className="documentTypeLabel">Select campaign(s): &#160;</span>
                                    <span className="selectedValue">{selectedTypedocument.value}</span>
                                </button>
                                {isTypedocumentOpen && (
                                    <ul className="documentdownListStick">
                                        {typedocument.map((tf) => (
                                            <li className="documentdownListItem" key={tf.id}>
                                                <button type="button"
                                                    className="documentdownItem"
                                                    onClick={() => handleSelectTypedocument(tf)}
                                                >
                                                    {tf.value}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                    <button className="sec-button img-btn pink" type="button" onClick={() => setShowProfileDetails(true)}>
                        <p>CONTINUE</p>
                    </button>
                </form>
                </div>
            </div>
            )}
            {showProfileDetails && (
                <div>
                    {/* <ProfileDetailsSidebar creatorsData={creatorsData}/> */}
                    <button className="sec-button img-btn pink" type="button" onClick={handleFormSave}>
                        <p>SAVE</p>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Sidepanelproject;