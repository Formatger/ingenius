import React from "react";
import Image from "next/image";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import { useState } from "react";
import SearchDropdown from "./SearchDropdown";
import { profile } from "console";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import FormSidepanel from "@/components/common/ProfileSidepanel";
import { CampaignInterface, ProjectInterface } from "@/interfaces/interfaces";
import { postProjects } from "@/utils/httpCalls";
import DateInput from "@/components/common/DateInput";
import axios from "axios";

interface Stages {
  id: number;
  name: string;
  order: number;
  user: string;
}

interface Creators {
  id: string;
  name: string;
  profile_picture_url: string;
  email: string;
}

interface FormData {
  id?: number;
  user?: string;
  campaign_name?: string;
  brand_image_url?: string;
  brand_name?: string;
  brand_email?: string;
  brand_website?: string;
  representative?: string;
  creator_name?: string;
  invoice_number?: string;
  invoice_date?: string;
  project_duration?: string;
  start_date: Date;
  deadline: Date;
  name: string;
  contract_value: number;
  invoice_paid?: boolean;
  description?: string;
  created_at?: string;
  campaign: string;
  creator?: string;
  project_stage?: string;
}

interface ProjectFormProps {
  creatorsData: Creators[];
  campaignsData: CampaignInterface[];
  projectStage: Stages[];
  handleCloseFormSidepanel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  creatorsData,
  campaignsData,
  projectStage,
  handleCloseFormSidepanel,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [selectedStage, setSelectedStage] = useState('');

  const handleSelectStage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedStage(selectedId);
    setValue("project_stage", selectedId); // Update the form control value if using react-hook-form
    console.log("Selected Project Stage ID:", selectedId);
  };

  /* SEARCH DROPDOWN */
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term: any) => {
    setSearchTerm(term);
  };
  // const filteredCreatorsData = creatorsData.filter((creator) =>
  //   creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // const filteredCampaignsData = campaignsData.filter(
  //   (campaign: { name: string }) =>
  //     campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  /* DATE INPUT CALENDAR  */
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // const handleDateChange = (newDate: Date) => {
  //   setSelectedDate(newDate);
  //   console.log("New date selected:", newDate);
  // };

  /* SIDEPANEL STATE */
  const handleClose = () => {
    handleCloseFormSidepanel();
  };

  /* SUBMIT FORM  */

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    try {
      await postProjects(
        data,
        (response) => {
          console.log("Project created successfully:", response);
          reset();
          handleCloseFormSidepanel();
        },
        (error) => {
          console.error("Error creating project:", error);
        }
      );
    } catch (error) {
      console.error("ERROR", error);
    }
    reset();  
    handleCloseFormSidepanel();
  };

  
  return (
    <FormSidepanel handleClose={handleClose}>
          <div className="sidepanel-header">
            <p
              className="row-wrap-2 text-brown"
              // href={{ pathname: "dashboard/partnerships/projects" }}
            >
              {/* <Arrow className="arrow-left orange-fill" /> */}
              {`Add Project`}
            </p>
            <div className="sidepanel-button">
            <Link href="/dashboard/support" passHref>
              <button className="sidepanel-button-style">
                <HelpIcon />
                Get help
              </button>
            </Link>
            </div>
          </div>
          <div className="sidepanel-wrap">
            <form className="sidepanel-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-box">
                <span className="smallcaps">PROJECT NAME*</span>
                <input
                  {...register("name", { required: true })}
                  className="form-input"
                  type="text"
                  placeholder="Enter a name"
                />
              </div>
              <div className="form-box">
                <span className="smallcaps">DESCRIPTION</span>
                <textarea
                  {...register("description")}
                  className="form-textarea"
                  placeholder="Add a description"
                />
              </div>
              <div className="form-box">
                <span className="smallcaps">SELECT CAMPAIGN*</span>
                <SearchDropdown
                  data={campaignsData}
                  onSelect={(selectedItem) => {
                    setValue("campaign", selectedItem.id); 
                  }}
                  placeholder="Select Campaign"
                  handleSearch={handleSearchChange}
                  displayKey="name"
                />
              </div>
              <div className="form-box">
                <span className="smallcaps">SELECT CREATOR*</span>
                <SearchDropdown
                  data={creatorsData}
                  onSelect={(selectedItem) => {
                    setValue("creator", selectedItem.id);
                  }}
                  placeholder="Select Creator"
                  handleSearch={handleSearchChange}
                  displayKey="name"
                />
              </div>
              <div className="form-box">
                <span className="smallcaps">CONTRACT VALUE</span>
                <input
                  {...register("contract_value", { required: false })}
                  className="form-input"
                  type="text"
                  placeholder="Add contract Value"
                />
              </div>
              <div className="form-box">
                <span className="smallcaps">START DATE</span>
                <input
                  {...register("start_date", { required: true })}
                  className="form-input"
                  type="date"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="form-box">
                <span className="smallcaps">END DATE</span>
                <input
                  {...register("deadline", { required: true })}
                  className="form-input"
                  type="date"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              {/* <DateInput
                name="deadline"
                onChange={handleDateChange}
              /> */}
              {/* <div className='form-box'>
                  <span className='smallcaps'>PROJECT STAGE</span>
                  <SearchDropdown
                    data={projectStage}
                    onSelect={(selectedItem) => {
                      console.log("Selected Project Stage:", selectedItem);
                      setValue("name", selectedItem.name);
                    }}
                    placeholder="Select Stage"
                    handleSearch={handleSearchChange}
                    displayKey="name"
                  />
              </div> */}
              <div className='form-box'>
                  <span className='smallcaps'>SELECT STAGE*</span>
                  <select
                      {...register("project_stage")}
                      onChange={handleSelectStage}
                      value={selectedStage}
                      className="form-input"
                    >
                      <option value="">Select Stage</option> {/* Default option */}
                      {Array.isArray(projectStage) && projectStage.map((stage) => (                        <option key={stage.id} value={stage.id}>
                          {stage.name}
                        </option>
                      ))}
                    </select>
              </div>

              {/* SELECT CREATOR DROPDOWN */}

              <button className="sec-button linen" type="submit">
                <p>SAVE</p>
              </button>
            </form>
          </div>
    </FormSidepanel>
  );
};

export default ProjectForm;


/* DOCUMENT TYPE DROPDOWN -> CREATORS DROPDOWN */
//   const typedocument = [
//     { id: "tf-1", value: "All" },
//     { id: "tf-2", value: "Contact" },
//     { id: "tf-3", value: "Content" },
//     { id: "tf-4", value: "Invoice" },
// ];
// const [isTypedocumentOpen, setIsTypedocumentOpen] = useState(false);
// const [selectedTypedocument, setSelectedTypedocument] = useState(typedocument[0]);

// const handleSelectTypedocument = (tf: any) => {
//     setSelectedTypedocument(tf);
//     setIsTypedocumentOpen(false);
// };


  /* SELECT CREATOR DROPDOWN */


  /* <div className='campaign-box'>
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
  </div> */

  /* SELECT CREATOR DROPDOWN */
