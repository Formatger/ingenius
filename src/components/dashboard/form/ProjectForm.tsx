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
  contract_value: number;
  description?: string;
  campaign: string;
  creator?: string;
  project_stage?: number;
  // invoice_paid?: boolean;
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
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [selectedStage, setSelectedStage] = useState<any>([]);
  const [creatorsData, setCreatorsData] = useState<Creators[]>([]);
  const [campaignsData, setCampaignsData] = useState<any>([]);

  const handleSelectStage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    setSelectedStage(selectedId);
    setValue("project_stage", selectedId);
    console.log("Selected Project Stage ID:", selectedId);
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
              <span className="smallcaps">CONTRACT VALUE</span>
              <input
                {...register("contract_value", { required: false })}
                className="form-input"
                type="text"
                defaultValue={projectsData.contract_value}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">START DATE</span>
              <input
                {...register("start_date", { required: true })}
                className="form-input"
                type="date"
                defaultValue={projectsData.start_date}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">END DATE</span>
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
            {/* <div className="form-box">
              <span className="smallcaps">INVOICE STATUS</span>
              <select
                {...register("invoice_paid")}
                className="form-input"
              >
              <option value="false">Unpaid</option> 
              <option value="true">Paid</option>

              </select>
            </div> */}
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
                {...register("project_stage")}
                onChange={handleSelectStage}
                value={selectedStage}
                className="form-input"
              >
                <option value="">Select Stage</option> {/* Default option */}
                {Array.isArray(projectStage) && projectStage.map((stage) => {
                  console.log("Stage Name:", stage.name); // Agregar console.log() aquí
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
