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
import { CampaignInterface, BrandInterface, DealInterface } from "@/interfaces/interfaces";
import { postCampaigns } from "@/utils/httpCalls";
import DateInput from "@/components/common/DateInput";
import axios from "axios";

interface Stages {
  id: number;
  name: string;
  order: number;
  user: string;
}

interface FormData {
  id?: number;
  user?: string;
  brand_image_url?: string;
  brand_name?: string;
  brand_email?: string;
  brand_website?: string;
  representative?: string;
  total_projects?:number;
  invoice_number?: string;
  invoice_date?: string;
  campaign_duration?: string;
  start_date: Date;
  deadline: Date;
  name: string;
  contract_value: number;
  invoice_paid?: boolean;
  description?: string;
  created_at?: string;
  deal?: string;
  campaign_stage?: string;
}

interface CampaignFormProps {
  brandsData: BrandInterface[];  // This should be an array of BrandInterface
  dealsData: DealInterface[];   // This should be an array of DealInterface
  campaignStage: Stages[];
  handleCloseFormSidepanel: () => void;
}

const  CampaignForm: React.FC< CampaignFormProps> = ({
  brandsData,
  dealsData,
  campaignStage,
  handleCloseFormSidepanel,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [selectedStage, setSelectedStage] = useState('');

  const handleSelectStage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedStage(selectedId);
    setValue("campaign_stage", selectedId); // Update the form control value if using react-hook-form
    console.log("Selected Campaign Stage ID:", selectedId);
  };

  /* SEARCH DROPDOWN */
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term: any) => {
    setSearchTerm(term);
  };

  /* SIDEPANEL STATE */
  const handleClose = () => {
    handleCloseFormSidepanel();
  };

  /* SUBMIT FORM  */

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    try {
      await postCampaigns(
        data,
        (response) => {
          console.log("Campaign created successfully:", response);
          reset();
          handleCloseFormSidepanel();
        },
        (error) => {
          console.error("Error creating campaign:", error);
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
              {`Add Campaign`}
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
                <span className="smallcaps">SELECT DEAL*</span>
                <SearchDropdown
                  data={dealsData}
                  onSelect={(selectedItem) => {
                    setValue("deal", selectedItem.id); 
                  }}
                  placeholder="Select Deal"
                  handleSearch={handleSearchChange}
                  displayKey="name"
                />
              </div>
              <div className="form-box">
                <span className="smallcaps">CAMPAIGN NAME*</span>
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
                <span className="smallcaps">SELECT PARTNER*</span>
                <SearchDropdown
                  data={brandsData}
                  onSelect={(selectedItem) => {
                    setValue("brand_name", selectedItem.id);
                  }}
                  placeholder="Select Brand"
                  handleSearch={handleSearchChange}
                  displayKey="name"
                />
              </div>
              <div className="form-box">
                <span className="smallcaps">CONTRACT VALUE</span>
                <input
                  {...register("contract_value", { required: true })}
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
                      {...register("campaign_stage")}
                      onChange={handleSelectStage}
                      value={selectedStage}
                      className="form-input"
                    >
                      <option value="">Select Stage</option> {/* Default option */}
                      {Array.isArray(campaignStage) && campaignStage.map((stage) => (                        <option key={stage.id} value={stage.id}>
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

export default  CampaignForm;