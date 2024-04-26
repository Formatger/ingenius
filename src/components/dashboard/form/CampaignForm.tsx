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
import FormSidepanel from "@/components/common/Sidepanel";
import {
  putCampaign,
  getDeals,
  postCampaigns,
  lockCampaign,
  unlockCampaign,
} from "@/utils/httpCalls";
import {
  CampaignInterface,
  BrandInterface,
  DealInterface,
} from "@/interfaces/interfaces";
import DateInput from "@/components/common/DateInput";
import { useRouter } from "next/router";
import InvoiceDropdown from "@/components/common/InvoiceDropdown";

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
  total_projects?: number;
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

const CampaignForm: React.FC<CampaignFormProps> = ({
  campaignStage,
  handleCloseFormSidepanel,
  updateCampaignData,
  campaignsData,
  isEditing,
  closeEdit,
}) => {
  const router = useRouter();
  const { register, handleSubmit, reset, setValue, trigger, watch, formState: { errors }, } =
    useForm<FormData>();
  const [selectedStage, setSelectedStage] = useState("");
  const [dealsData, setDealsData] = useState<any>([]);
  const [invoiceStatus, setInvoiceStatus] = useState(
    campaignsData?.invoice_paid ? "Paid" : "Unpaid"
  );
  const startDate = watch("start_date");

  /* LOCK FORM */

  useEffect(() => {
    lockCampaign(campaignsData.id);

    return () => {
      unlockCampaign(campaignsData.id);
    };
  }, []);

  /* INVOICE DROPDOWN */

  const handleInvoiceSelect = (value: string) => {
    setInvoiceStatus(value);
    setValue("invoice_paid", value === "Paid");
    trigger("invoice_paid");
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

  useEffect(() => {
    fetchDeals();
  }, [router]);

  const fetchDeals = () => {
    getDeals(
      (response: any) => {
        setDealsData(response || []);
      },
      (error: any) => {
        console.error("Error fetching profile data:", error);
        setDealsData([]);
      }
    ).finally(() => {});
  };

  /* SUBMIT FORM - POST CAMPAIGNS API CALL */

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    try {
      if (isEditing) {
        const campaignId = campaignsData.id;

        const updatedData: FormData = {
          ...campaignsData,
          ...data,
        };

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
        await postCampaigns(
          data,
          (response) => {
            console.log("Project updated successfully:", response);
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
                {...register("name", {
                  required: "Campaign name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Campaign name is required",
                })}               
                className="form-input"
                type="text"
                placeholder="Enter campaign name"
                defaultValue={campaignsData.name}
                onChange={(e) => setValue("name", e.target.value)}
              />
              {errors.name && (
                <span className="error-message">Name is required</span>
              )}
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
                  trigger("deal");
                }}
                placeholder={campaignsData.deal_name}
                handleSearch={handleSearchChange}
                displayKey="name"
              />
              {errors.deal && (
                <span className="error-message">Deal is required</span>
              )}            </div>
                        <div className="form-box">
              <span className="smallcaps">CONTRACT VALUE*</span>
              <input
                {...register("contract_value", {
                  required: "Contract value is required",
                  valueAsNumber: true,
                  validate: {
                    notEmpty: (value) =>
                      value !== undefined || "Contract value cannot be empty",
                    isNumber: (value) =>
                      !isNaN(value ?? 0) || "Please enter a number",
                  },
                })}
                className="form-input"
                type="text"
                defaultValue={campaignsData.contract_value}
              />
              {errors.contract_value && (
                <span className="error-message">
                  {errors.contract_value.message}
                </span>
              )}
            </div>
            <div>
              <InvoiceDropdown
                selectedValue={invoiceStatus}
                onSelect={handleInvoiceSelect}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">START DATE*</span>
              <input
                {...register("start_date", {
                  required: "Start date is required",
                })}
                className="form-input"
                type="date"
                defaultValue={campaignsData.start_date}
              />
              {errors.start_date && (
                <span className="error-message">
                  {errors.start_date.message}
                </span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">END DATE*</span>
              <input
                {...register("deadline", {
                  required: "End date is required",
                  validate: {
                    isAfterStartDate: (value) =>
                      new Date(value) >= new Date(startDate) ||
                      "End date cannot be before start date",
                  },
                })}
                className="form-input"
                type="date"
                defaultValue={campaignsData.deadline}
              />
              {errors.deadline && (
                <span className="error-message">{errors.deadline.message}</span>
              )}
            </div>
            <div className="button-group">
              <button
                className="sec-button stone"
                type="button"
                onClick={handleClose}
              >
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
                {...register("name", {
                  required: "Campaign name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Campaign name is required",
                })}     
                className="form-input"
                type="text"
                placeholder="Enter a name"
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
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
                {...register("deal", { required: true })}
                data={dealsData}
                onSelect={(selectedItem) => {
                  setValue("deal", selectedItem.id);
                  trigger("deal");
                }}
                placeholder="Select Deal"
                handleSearch={handleSearchChange}
                displayKey="name"
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">CONTRACT VALUE*</span>
              <input
                {...register("contract_value", {
                  required: "Contract value is required",
                  valueAsNumber: true,
                  validate: {
                    notEmpty: (value) =>
                      value !== undefined || "Contract value cannot be empty",
                    isNumber: (value) =>
                      !isNaN(value ?? 0) || "Please enter a number",
                  },
                })}
                className="form-input"
                type="text"
                placeholder="Enter contract value"
              />
              {errors.contract_value && (
                <span className="error-message">
                  {errors.contract_value.message}
                </span>
              )}
            </div>
            <div>
              <InvoiceDropdown
                selectedValue={invoiceStatus}
                onSelect={handleInvoiceSelect}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">START DATE*</span>
              <input
                {...register("start_date", {
                  required: "Start date is required",
                })}
                className="form-input"
                type="date"
              />
              {errors.start_date && (
                <span className="error-message">
                  {errors.start_date.message}
                </span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">END DATE*</span>
              <input
                {...register("deadline", {
                  required: "End date is required",
                  validate: {
                    isAfterStartDate: (value) =>
                      new Date(value) >= new Date(startDate) ||
                      "End date cannot be before start date",
                  },
                })}
                className="form-input"
                type="date"
              />
              {errors.deadline && (
                <span className="error-message">{errors.deadline.message}</span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">SELECT STAGE*</span>
              <SearchDropdown
                data={campaignStage}
                onSelect={(selectedItem) => {
                  setValue("campaign_stage", selectedItem.stageID);
                  trigger("campaign_stage");
                }}
                placeholder="Select Stage"
                handleSearch={handleSearchChange}
                displayKey="stageName"
                {...register("campaign_stage", {
                  required: "Stage selection is required",
                })}
              />
              {errors.campaign_stage && (
                <span className="error-message">Stage is required</span>
              )}
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

export default CampaignForm;
