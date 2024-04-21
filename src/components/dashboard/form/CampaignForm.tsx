import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import SearchDropdown from "./SearchDropdown";
import { profile } from "console";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import FormSidepanel from "@/components/common/ProfileSidepanel";
import { CampaignInterface, BrandInterface, DealInterface } from "@/interfaces/interfaces";
import { getBrands, putCampaign, getDeals, postCampaigns } from "@/utils/httpCalls";
import DateInput from "@/components/common/DateInput";
import axios from "axios";
import { useRouter } from "next/router";

// interface Stages {
//   id: number;
//   name: string;
//   order: number;
//   user: string;
// }

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
  campaign_stage_name: string;
  campaing_stage_order: string;
  name: string;
  contract_value: number;
  invoice_paid?: boolean;
  description?: string;
  created_at?: string;
  deal?: string;
  campaign_stage?: string;
}

interface CampaignFormProps {
  campaignStage: any;
  handleCloseFormSidepanel: () => void;
  updateCampaignData: () => void;
  campaignsData: any;
  closeEdit: () => void;
  isEditing: boolean; 
}

const  CampaignForm: React.FC< CampaignFormProps> = ({
  campaignStage,
  handleCloseFormSidepanel,
  updateCampaignData,
  campaignsData,
  isEditing,
  closeEdit,
}) => {
  const router = useRouter()
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [selectedStage, setSelectedStage] = useState('');
  const [dealsData, setDealsData] = useState<any>([]);
  const [invoicePaid, setInvoicePaid] = useState<boolean>(campaignsData.invoice_paid ?? false);
  
  /* SELECT DROPDOWNS */

  const handleSelectStage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedStage(selectedId);
    setValue("campaign_stage", selectedId);
    console.log("Selected Campaign Stage ID:", selectedId);
  };

  const handleInvoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const isPaid = event.target.value === 'true';
    setInvoicePaid(isPaid);
    setValue("invoice_paid", isPaid);
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

  /* GET DEALS API CALL */

  useEffect(() => { fetchDeals() }, [router]);

  const fetchDeals = () => {
    getDeals(
      (response: any) => {
        console.log("fetch deals", response)

        setDealsData(response || []);
      },
      (error: any) => {
        console.error('Error fetching profile data:', error);
        setDealsData([]); 
      }
    ).finally(() => {
    });
  };

  /* SUBMIT FORM - POST CAMPAIGNS API CALL */

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    try {
      if (isEditing) {
        const campaignId = campaignsData.id;

        // Fusionamos los datos del formulario con los datos originales del proyecto
        const updatedData: FormData = {
          ...campaignsData, // Datos originales del proyecto
          ...data, // Datos del formulario
        };

        // Realizamos una solicitud PUT con los datos fusionados
        await putCampaign(
          campaignId,
          updatedData,
          (response) => {
            console.log("Project updated successfully:", response);
            reset();
            closeEdit();
            updateCampaignData();
          },
          (error) => {
            console.error("Error updating project:", error);
          }
        );
      } else {
        // Si no se está editando, realizamos una solicitud POST
        await postCampaigns(
          data,
          (response) => {
            console.log("Project created successfully:", response);
            reset();
            handleClose();
            updateCampaignData();
          },
          (error) => {
            console.error("Error creating project:", error);
          }
        );
      }
    } catch (error) {
      console.error("ERROR", error);
    }
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
          {isEditing ? (
        <div className="sidepanel-wrap">
          <form className="sidepanel-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-box">
              <span className="smallcaps">CAMPAIGN NAME*</span>
              <input
                {...register("name", { required: true })}
                className="form-input"
                type="text"
                defaultValue={campaignsData.name}
                onChange={(e) => setValue("name", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">DESCRIPTION</span>
              <textarea
                {...register("description")}
                className="form-textarea"
                defaultValue={campaignsData.description}
                onChange={(e) => setValue("description", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">SELECT DEAL*</span>
              <SearchDropdown
                data={dealsData}
                onSelect={(selectedItem) => {
                  setValue("deal", selectedItem.id);
                }}
                placeholder={campaignsData.deal}
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
                defaultValue={campaignsData.contract_value}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">INVOICE STATUS*</span>
              <div className="select-wrap">
              <select
                {...register("invoice_paid", { required: true })}
                className="select-input"
                defaultValue={campaignsData.invoice_paid}
              >
              <option value="false">Unpaid</option> 
              <option value="true">Paid</option>
              </select>
              </div>
            </div>
            <div className="form-box">
              <span className="smallcaps">START DATE</span>
              <input
                {...register("start_date", { required: true })}
                className="form-input"
                type="date"
                defaultValue={campaignsData.start_date}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">END DATE</span>
              <input
                {...register("deadline", { required: true })}
                className="form-input"
                type="date"
                defaultValue={campaignsData.deadline}
              />
            </div>
            <div className="button-group">
              <button className="sec-button stone" type="button" onClick={handleClose}>
                <p>Cancel</p>
              </button>
              <button className="sec-button linen" type="submit">
                <p>Save</p>
              </button>
            </div>
          </form>
        </div>

      ) : (

        <div className="sidepanel-wrap">
          <form className="sidepanel-form" onSubmit={handleSubmit(onSubmit)}>
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
              <span className="smallcaps">CONTRACT VALUE</span>
              <input
                {...register("contract_value", { required: true })}
                className="form-input"
                type="text"
                placeholder="Add contract Value"
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">INVOICE STATUS*</span>
              <div className="select-wrap">
                <select
                {...register("invoice_paid", { required: true })}
                onChange={handleInvoiceChange}
                value={invoicePaid.toString()}
                className="form-input"
              >
                <option value="false">Unpaid</option>
                <option value="true">Paid</option>
              </select>
              </div>
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
            <div className='form-box'>
                <span className='smallcaps'>SELECT STAGE*</span>
                <select
                    {...register("campaign_stage")}
                    onChange={handleSelectStage}
                    value={selectedStage}
                    className="form-input"
                  >
                    <option value="">Select Stage</option> {/* Default option */}
                    {Array.isArray(campaignStage) && campaignStage.map((stage) => {
                    
                    return (                        
                    <option key={stage.stageID} value={stage.stageID}>
                        {stage.stageName}
                      </option>
                    );
                    })}
                  </select>
            </div>

            <button className="sec-button linen" type="submit">
              <p>SAVE</p>
            </button>
          </form>
        </div>

      )}

    </FormSidepanel>
  );
};
          

export default  CampaignForm;