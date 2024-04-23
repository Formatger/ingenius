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
import { CampaignInterface, ProjectInterface } from "@/interfaces/interfaces";
import { getCampaigns, getCreators, postProjects, putProject } from "@/utils/httpCalls";
import DateInput from "@/components/common/DateInput";
import axios from "axios";
import { useRouter } from "next/router";

interface Creators {
  id: string;
  name: string;
  profile_picture_url: string;
  email: string;
}

interface FormData {
  id?: number;
  start_date: Date;
  deadline: Date;
  name: string;
  contract_value?: number;
  description?: string;
  campaign: string;
  creator?: string;
  project_stage?: number;
  invoice_paid?: boolean;
}

interface ProjectFormProps {
  projectStage: any[];
  handleCloseFormSidepanel: () => void;
  updateProjectData: () => void;
  isEditing: boolean; 
  projectsData: any;
  closeEdit: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  projectStage,
  handleCloseFormSidepanel,
  updateProjectData,
  isEditing,
  projectsData,
  closeEdit,

}) => {
  const router = useRouter()
  const { register, handleSubmit, reset, setValue,formState: { errors } } = useForm<FormData>();
  const [selectedStage, setSelectedStage] = useState<any>([]);
  const [creatorsData, setCreatorsData] = useState<Creators[]>([]);
  const [campaignsData, setCampaignsData] = useState<any>([]);
  const [invoicePaid, setInvoicePaid] = useState<boolean>(projectsData?.invoice_paid ?? false);
 
  /* SELECT DROPDOWNS */

  const handleSelectStage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    setSelectedStage(selectedId);
    setValue("project_stage", selectedId);
    console.log("Selected Project Stage ID:", selectedId);
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

  const filteredCreatorsData = creatorsData.filter((creator) =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCampaignsData = campaignsData.filter(
    (campaign: { name: string }) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  /* GET CREATORS API CALL */

  useEffect(() => { fetchCreators() }, [router]);

  const fetchCreators = () => {
    getCreators(
      (response: any) => {

        setCreatorsData(response || []);
      },
      (error: any) => {
        console.error('Error fetching profile data:', error);
        setCreatorsData([]);
      }
    ).finally(() => {
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

  /* SUBMIT FORM - POST PROJECTS API CALL  */

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    try {
      if (isEditing) {
        const projectId = projectsData.id;

        // Fusionamos los datos del formulario con los datos originales del proyecto
        const updatedData: FormData = {
          ...projectsData, // Datos originales del proyecto
          ...data, // Datos del formulario
        };

        // Realizamos una solicitud PUT con los datos fusionados
        await putProject(
          projectId,
          updatedData,
          (response) => {
            console.log("Project updated successfully:", response);
            reset();
            closeEdit();
            updateProjectData();
          },
          (error) => {
            console.error("Error updating project:", error);
          }
        );
      } else {
        // Si no se está editando, realizamos una solicitud POST
        await postProjects(
          data,
          (response) => {
            console.log("Project created successfully:", response);
            reset();
            handleClose();
            updateProjectData();
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
      {isEditing ? (
        <div className="sidepanel-wrap">
          <form className="sidepanel-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-box">
              <span className="smallcaps">PROJECT NAME*</span>
              <input
                {...register("name", { required: true })}
                className="form-input"
                type="text"
                defaultValue={projectsData.name}
                onChange={(e) => setValue("name", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">DESCRIPTION</span>
              <textarea
                {...register("description")}
                className="form-textarea"
                defaultValue={projectsData.description}
                onChange={(e) => setValue("description", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">SELECT CAMPAIGN*</span>
              <SearchDropdown
                data={campaignsData}
                onSelect={(selectedItem) => {
                  setValue("campaign", selectedItem.id);
                }}
                placeholder={projectsData.campaign_name}
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
                placeholder={projectsData.creator_name}
                handleSearch={handleSearchChange}
                displayKey="name"
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">CONTRACT VALUE*</span>
              <input
                {...register("contract_value", { required: false })}
                className="form-input"
                type="text"
                defaultValue={projectsData.contract_value}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">INVOICE STATUS*</span>
              <div className="select-wrap">
              <select
                {...register("invoice_paid", { required: true })}
                className="select-input"
                defaultValue={projectsData.invoice_paid}
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
                defaultValue={projectsData.start_date}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">END DATE*</span>
              <input
                {...register("deadline", { required: true })}
                className="form-input"
                type="date"
                defaultValue={projectsData.deadline}
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
      <span className="smallcaps">PROJECT NAME*</span>
      <input
        {...register("name", {
          required: "Project name is required",
          validate: value => value.trim() !== "" || "Project name is required"
        })}
        className="form-input"
        type="text"
        placeholder="Enter a name" 
      />
      {errors.name && <span className="error-message">Project name is required</span>}
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
        {...register("campaign", { required: true })}
      />
      {errors.campaign && <span className="error-message">Campaign is required</span>}
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
        {...register("creator", {
          required: "Contract value is required",
          validate: value => value !== "" && value != null || "Creator is required"
        })}
      />
      {errors.creator && <span className="error-message">Creator is required</span>}
    </div>
    <div className="form-box">
        <span className="smallcaps">CONTRACT VALUE*</span>
        <input
          {...register("contract_value", {
            required: "Contract value is required",
            valueAsNumber: true, // Ensure the value is treated as a number
            validate: {
              notEmpty: value => value !== undefined || "Contract value cannot be empty",
              isNumber: value => !isNaN(value ?? 0) || "Please enter a number", // Check if the value is not NaN
            }
          })}
          className="form-input"
          type="text" // Using type="text" to handle input manually
          placeholder="Add contract Value"
        />
        {errors.contract_value && <span className="error-message">{errors.contract_value.message}</span>}
      </div>

    <div className="form-box">
      <span className="smallcaps">INVOICE STATUS*</span>
      <div className="select-wrap">
        <select
          {...register("invoice_paid", { required: true })}
          onChange={handleInvoiceChange}
          value={invoicePaid.toString()}
          className="select-input"
        >
          <option value="false">Unpaid</option>
          <option value="true">Paid</option>
        </select>
      </div>
      {errors.invoice_paid && <span className="error-message">Please select invoice status</span>}
    </div>
    <div className="form-box">
      <span className="smallcaps">START DATE*</span>
      <input
        {...register("start_date", { required: true })}
        className="form-input"
        type="date"
        placeholder="YYYY-MM-DD"
      />
      {errors.start_date && <span className="error-message">Start date is required</span>}
    </div>
    <div className="form-box">
      <span className="smallcaps">END DATE*</span>
      <input
        {...register("deadline", { required: true })}
        className="form-input"
        type="date"
        placeholder="YYYY-MM-DD"
      />
      {errors.deadline && <span className="error-message">End date is required</span>}
    </div>
    <div className='form-box'>
      <span className='smallcaps'>SELECT STAGE*</span>
      <div className="select-wrap">
        <select
          {...register("project_stage", { required: true })}
          onChange={handleSelectStage}
          value={selectedStage}
          className="select-input"
        >
          <option value="">Select Stage</option> {/* Default option */}
          {Array.isArray(projectStage) && projectStage.map((stage) => {
            console.log("Stage Name:", stage.name);
            return (
              <option key={stage.stageID} value={stage.stageID}>
                {stage.stageName}
              </option>
            );
          })}
        </select>
      </div>
      {errors.project_stage && <span className="error-message">Please select a project stage</span>}
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

export default ProjectForm;



