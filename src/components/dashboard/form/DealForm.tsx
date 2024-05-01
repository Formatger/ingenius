import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import SearchDropdown from "./SearchDropdown";
import { set, useForm } from "react-hook-form";
import FormSidepanel from "@/components/common/Sidepanel";
import {
  CampaignInterface,
  BrandInterface,
  DealInterface,
} from "@/interfaces/interfaces";
import {
  getBrands,
  lockDeal,
  postDeals,
  putDeal,
  unlockDeal,
} from "@/utils/httpCalls";
import { useRouter } from "next/router";
import InvoiceDropdown from "@/components/common/InvoiceDropdown";

interface FormData {
  id?: number;
  user?: string;
  brand_image_url?: string;
  brand_name?: string;
  brand_email?: string;
  brand_website?: string;
  representative?: string;
  total_campaigns?: number;
  invoice_number?: string;
  invoice_date?: string;
  deal_duration?: string;
  deal_stage_name?: string;
  deal_stage_order?: number;
  start_date: Date;
  deadline: Date;
  name: string;
  contract_value: number;
  invoice_paid?: boolean;
  description?: string;
  created_at?: Date;
  campaigns?: string;
  deal_stage?: any;
  brand?: string;
}

interface DealFormProps {
  dealsData: any;
  dealStage: any;
  handleCloseFormSidepanel: () => void;
  updateDealData: () => void;
  isEditing: boolean;
  closeEdit: () => void;
}

const DealForm: React.FC<DealFormProps> = ({
  dealsData,
  dealStage,
  handleCloseFormSidepanel,
  updateDealData,
  isEditing,
  closeEdit,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [brandsData, setBrandsData] = useState<any>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [invoiceStatus, setInvoiceStatus] = useState(
    dealsData?.invoice_paid ? "Paid" : "Unpaid"
  );
  const startDate = watch("start_date");

  /* LOCK FORM */
  useEffect(() => {
    lockDeal(dealsData.id);

    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      unlockDeal(dealsData.id);
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unlockDeal(dealsData.id);
      window.removeEventListener('beforeunload', handleBeforeUnload);
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

  /* BRANDS API CALL */

  useEffect(() => {
    fetchBrands();
  }, [router]);

  const fetchBrands = () => {
    getBrands(
      (response: any) => {
        setBrandsData(response || []);
      },
      (error: any) => {
        console.error("Error fetching profile data:", error);
        setBrandsData([]);
      }
    ).finally(() => { });
  };

  /* SUBMIT FORM - DEALS API */

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);

    try {
      if (isEditing) {
        const dealId = dealsData.id;

        const updatedData: FormData = {
          ...dealsData,
          ...data,
        };

        await putDeal(
          dealId,
          updatedData,
          (response) => {
            reset();
            closeEdit();
            updateDealData();
          },
          (error) => {
            console.error("Error updating project:", error);
          }
        ).finally(() => setSubmitting(false));
      } else {
        // Si no se está editando, realizamos una solicitud POST
        await postDeals(
          data,
          (response) => {
            reset();
            handleClose();
            updateDealData();
          },
          (error) => {
            console.error("Error creating deal:", error);
          }
        ).finally(() => setSubmitting(false));
      }
    } catch (error) {
      console.error("ERROR", error);
      setSubmitting(false);
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
          {isEditing ? "Edit Deal" : "Add Deal"}
        </p>
        <div className="sidepanel-button">
          <Link href="/dashboard/support" passHref>
            <button className="sidepanel-top-button">
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
              <span className="smallcaps">DEAL NAME*</span>
              <input
                {...register("name", {
                  required: "Deal name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Deal name is required",
                })}
                className="form-input"
                type="text"
                defaultValue={dealsData.name}
                onChange={(e) => setValue("name", e.target.value)}
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
                defaultValue={dealsData.description}
                onChange={(e) => setValue("description", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">SELECT PARTNER*</span>
              <SearchDropdown
                // {...register("brand")}
                data={brandsData}
                onSelect={(selectedItem) => {
                  setValue("brand", selectedItem.id);
                  trigger("brand");
                }}
                handleSearch={handleSearchChange}
                displayKey="name"
                placeholder={dealsData.brand_name}
              />
              {errors.brand && (
                <span className="error-message">Partner is required</span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">CONTRACT VALUE*</span>
              <input
                {...register("contract_value", { required: true })}
                className="form-input"
                type="number"
                defaultValue={dealsData.contract_value}
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
                defaultValue={dealsData.start_date}
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
                defaultValue={dealsData.deadline}
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
                {submitting ? (
                  <div className="spinner-container">
                    <div className="spinner-linen" />
                  </div>
                ) : (
                  <p>Save</p>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="sidepanel-wrap">
          <form className="sidepanel-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-box">
              <span className="smallcaps">DEAL NAME*</span>
              <input
                {...register("name", {
                  required: "Deal name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Deal name is required",
                })}
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
                // {...register("brand", { required: true })}
                data={brandsData}
                onSelect={(selectedItem) => {
                  setValue("brand", selectedItem.id);
                  trigger("brand");
                }}
                placeholder="Select Brand"
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
                data={dealStage}
                onSelect={(selectedItem) => {
                  setValue("deal_stage", selectedItem.stageID);
                  trigger("deal_stage");
                }}
                placeholder="Select Stage"
                handleSearch={handleSearchChange}
                displayKey="stageName"
                {...register("deal_stage", {
                  required: "Stage selection is required",
                })}
              />
              {errors.deal_stage && (
                <span className="error-message">Stage is required</span>
              )}
            </div>

            <button className="sec-button linen" type="submit">
              {submitting ? (
                <div className="spinner-container">
                  <div className="spinner-linen" />
                </div>
              ) : (
                <p>SAVE</p>
              )}
            </button>
          </form>
        </div>
      )}
    </FormSidepanel>
  );
};

export default DealForm;
