import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import SearchDropdown from "./SearchDropdown";
import { useForm } from "react-hook-form";
import FormSidepanel from "@/components/common/ProfileSidepanel";
import { CampaignInterface, BrandInterface, DealInterface } from "@/interfaces/interfaces";
import { getBrands, getCampaigns, postCampaigns, postDeals } from "@/utils/httpCalls";
import DateInput from "@/components/common/DateInput";
import { useRouter } from 'next/router';

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
  total_campaigns?:number;
  invoice_number?: string;
  invoice_date?: string;
  deal_duration?: string;
  start_date: Date;
  deadline: Date;
  name: string;
  contract_value: number;
  invoice_paid?: boolean;
  description?: string;
  created_at?: Date;
  campaigns?: string;
  campaign?: string[];
  deal_stage?: string;
  brand?:string;
}

interface DealFormProps {
  // brandsData: BrandInterface[];  // This should be an array of BrandInterface
  // dealsData: DealInterface[];   // This should be an array of DealInterface
  dealStage: Stages[];
  handleCloseFormSidepanel: () => void;
}

const  DealForm: React.FC< DealFormProps> = ({
  // brandsData,
  // dealsData,
  dealStage,
  handleCloseFormSidepanel,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [selectedStage, setSelectedStage] = useState('');
  const router = useRouter()
  const [brandsData, setBrandsData] = useState<any>([]);
  const [campaignsData, setCampaignsData] = useState<any>([]);


  const handleSelectStage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedStage(selectedId);
    setValue("deal_stage", selectedId);
    console.log("Selected Deal Stage ID:", selectedId);
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
    // setLoader(true);
    getBrands(
      (response: any) => {
        
        setBrandsData(response || []);
      },
      (error: any) => {
        console.error('Error fetching profile data:', error);
        setBrandsData([]); 
      }
    ).finally(() => {
      // setLoader(false);
    });
  };

      /* GET CAMPAIGNS API CALL */

      useEffect(() => { fetchCampaigns() }, [router]);

      const fetchCampaigns = () => {
        getCampaigns(
          (response: any) => {
            
            setCampaignsData(response || []);
          },
          (error: any) => {
            console.error('Error fetching profile data:', error);
            setCampaignsData([]); 
          }
        ).finally(() => {
        });
      };

  /* SUBMIT FORM - DEALS API */

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    try {
      await postDeals(
        data,
        (response) => {
          console.log("Deal created successfully:", response);
          reset();
          handleCloseFormSidepanel();
        },
        (error) => {
          console.error("Error creating deal:", error);
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
              {`Add Deal`}
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
              {/* <div className="form-box">
                <span className="smallcaps">SELECT BRAND*</span>
                <SearchDropdown
                  data={brandsData}
                  onSelect={(selectedItem) => {
                    setValue("deal", selectedItem.id); 
                  }}
                  placeholder="Select Deal"
                  handleSearch={handleSearchChange}
                  displayKey="name"
                />
              </div> */}

              {/* <div className="form-box">
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
              </div> */}

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
              <div className='form-box'>
                  <span className='smallcaps'>SELECT STAGE*</span>
                  <select
                      {...register("deal_stage")}
                      onChange={handleSelectStage}
                      value={selectedStage}
                      className="form-input"
                    >
                      <option value="">Select Stage</option>
                      {Array.isArray(dealStage) && dealStage.map((stage) => (                        
                      <option key={stage.id} value={stage.id}>
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

export default DealForm;