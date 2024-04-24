import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import SearchDropdown from "./SearchDropdown";
import { useForm } from "react-hook-form";
import FormSidepanel from "@/components/common/Sidepanel";
import { CampaignInterface, BrandInterface, DealInterface } from "@/interfaces/interfaces";
import { getBrands, getCampaigns, postCampaigns, postDeals, putDeal } from "@/utils/httpCalls";
import DateInput from "@/components/common/DateInput";
import { useRouter } from 'next/router';

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
  total_campaigns?:number;
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
  deal_stage?: string;
  brand?:string;
}

interface DealFormProps {
  dealsData: any;
  dealStage: any;
  handleCloseFormSidepanel: () => void;
  updateDealData: () => void;
  isEditing: boolean; 
  closeEdit: () => void;
}

const DealForm: React.FC< DealFormProps> = ({
  dealsData,
  dealStage,
  handleCloseFormSidepanel,
  updateDealData,
  isEditing,
  closeEdit,
}) => {
  const router = useRouter()
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [selectedStage, setSelectedStage] = useState('');
  const [brandsData, setBrandsData] = useState<any>([]);
  const [invoicePaid, setInvoicePaid] = useState<boolean>(dealsData.invoice_paid ?? false);

  /* SELECT DROPDOWNS */

  const handleSelectStage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedStage(selectedId);
    setValue("deal_stage", selectedId);
    console.log("Selected Deal Stage ID:", selectedId);
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

  /* BRANDS API CALL */

  useEffect(() => { fetchBrands() }, [router]);

  const fetchBrands = () => {
    getBrands(
      (response: any) => {
        
        setBrandsData(response || []);
      },
      (error: any) => {
        console.error('Error fetching profile data:', error);
        setBrandsData([]); 
      }
    ).finally(() => {
    });
  };

  /* SUBMIT FORM - DEALS API */

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
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
            console.log("Project updated successfully:", response);
            reset();
            closeEdit();
            updateDealData();
          },
          (error) => {
            console.error("Error updating project:", error);
          }
        );
      } else {
        // Si no se está editando, realizamos una solicitud POST
        await postDeals(
          data,
          (response) => {
            console.log("Deal created successfully:", response);
            reset();
            handleClose();
            updateDealData();
          },
          (error) => {
            console.error("Error creating deal:", error);
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
              {isEditing ? "Edit Deal" : "Add Deal"}
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
                <span className="smallcaps">DEAL NAME*</span>
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
                    setValue("brand", selectedItem.id);
                  }}
                  placeholder="Select Brand"
                  handleSearch={handleSearchChange}
                  displayKey="name"
                />
              </div>
              <div className="form-box">
                <span className="smallcaps">CONTRACT VALUE*</span>
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
                {...register("invoice_paid", { required: false })}
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
                <span className="smallcaps">START DATE*</span>
                <input
                  {...register("start_date", { required: true })}
                  className="form-input"
                  type="date"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="form-box">
                <span className="smallcaps">END DATE*</span>
                <input
                  {...register("deadline", { required: true })}
                  className="form-input"
                  type="date"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className='form-box'>
                  <span className='smallcaps'>SELECT STAGE*</span>
                  <div className="select-wrap">
                  <select
                      {...register("deal_stage")}
                      onChange={handleSelectStage}
                      value={selectedStage}
                      className="select-input"
                    >
                      <option value="">Select Stage</option>
                      {Array.isArray(dealStage) && dealStage.map((stage) => (                        
                      <option key={stage.id} value={stage.id}>
                          {stage.stageName}
                        </option>
                      ))}
                    </select>
                    </div>
              </div>

              <button className="sec-button linen" type="submit">
                <p>SAVE</p>
              </button>
            </form>
          </div>
    </FormSidepanel>
  );
};

export default DealForm;