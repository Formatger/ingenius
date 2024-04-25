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
import {
  getBrands,
  getCreators,
  postBrands,
  putBrand,
} from "@/utils/httpCalls";
import DateInput from "@/components/common/DateInput";
import axios from "axios";
import { useRouter } from "next/router";

// interface Creators {
//   id: string;
//   name: string;
//   profile_picture_url: string;
//   email: string;
// }

interface FormData {
  id?: number; // Opcional porque es de sólo lectura
  name: string;
  representative: string;
  email: string;
  niche: string;
  website?: string; // Opcional, no es requerido
  profile_picture_url?: string; // Opcional porque es de sólo lectura
  profile_picture?: File; // Opcional, no es requerido
  user?: string; // Opcional porque es de sólo lectura
  active_campaigns?: string; // Opcional porque es de sólo lectura
  active_campaigns_value?: string; // Opcional porque es de sólo lectura
  created_at?: Date; // Opcional porque es de sólo lectura
}

interface BrandFormProps {
  projectStage: any[];
  handleCloseFormSidepanel: () => void;
  updateBrandData: () => void;
  isEditing: boolean;
  brandsData: any;
  closeEdit: () => void;
}

const BrandForm: React.FC<BrandFormProps> = ({
  handleCloseFormSidepanel,
  updateBrandData,
  isEditing,
  brandsData,
  closeEdit,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  /* SELECT DROPDOWNS */

  //   const handleSelectStage = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     const selectedId = parseInt(event.target.value);
  //     setSelectedStage(selectedId);
  //     setValue("project_stage", selectedId);
  //   };

  //   const handleInvoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     const isPaid = event.target.value === 'true';
  //     setInvoicePaid(isPaid);
  //     setValue("invoice_paid", isPaid);
  //   };

  //   /* SEARCH DROPDOWN */
  //   const [searchTerm, setSearchTerm] = useState("");

  //   const handleSearchChange = (term: any) => {
  //     setSearchTerm(term);
  //   };

  //   const filteredCreatorsData = creatorsData.filter((creator) =>
  //     creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   const filteredCampaignsData = campaignsData.filter(
  //     (campaign: { name: string }) =>
  //       campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  /* DATE INPUT CALENDAR  */
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // const handleDateChange = (newDate: Date) => {
  //   setSelectedDate(newDate);
  // };

  /* SIDEPANEL STATE */
  const handleClose = () => {
    handleCloseFormSidepanel();
  };

  const handlePictureChange = (event: any) => {
    const files = event.currentTarget.files; // Obtén todos los archivos seleccionados
    const lastFile = files[files.length - 1]; // Obtiene el último archivo seleccionado
    if (lastFile) {
      setValue("profile_picture", lastFile);
    }
  };

  //   /* GET CREATORS API CALL */

  //   useEffect(() => { fetchCreators() }, [router]);

  //   const fetchCreators = () => {
  //     getCreators(
  //       (response: any) => {

  //         setCreatorsData(response || []);
  //       },
  //       (error: any) => {
  //         console.error('Error fetching profile data:', error);
  //         setCreatorsData([]);
  //       }
  //     ).finally(() => {
  //     });
  //   };

  /* GET CAMPAIGNS API CALL */

  //   useEffect(() => { fetchCampaigns() }, [router]);

  //   const fetchCampaigns = () => {
  //     getCampaigns(
  //       (response: any) => {

  //         setCampaignsData(response || []);
  //       },
  //       (error: any) => {
  //         console.error('Error fetching profile data:', error);
  //         setCampaignsData([]);
  //       }
  //     ).finally(() => {
  //     });
  //   };

  /* SUBMIT FORM - POST PROJECTS API CALL  */

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing) {
        const brandId = brandsData.id;

        // Fusionamos los datos del formulario con los datos originales del proyecto
        const updatedData: FormData = {
          ...brandsData, // Datos originales del proyecto
          ...data, // Datos del formulario
        };

        // Realizamos una solicitud PUT con los datos fusionados
        await putBrand(
          brandId,
          updatedData,
          (response) => {
            reset();
            closeEdit();
            updateBrandData();
          },
          (error) => {
            console.error("Error updating project:", error);
          }
        );
      } else {
        // Si no se está editando, realizamos una solicitud POST
        await postBrands(
          data,
          (response) => {
            reset();
            handleClose();
            updateBrandData();
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
        <p className="row-wrap-2 text-brown">{`Add Brand`}</p>
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
          <form
            className="sidepanel-form"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="form-box">
              <span className="smallcaps">BRAND NAME*</span>
              <input
                {...register("name", { required: true })}
                className="form-input"
                type="text"
                defaultValue={brandsData.name}
                onChange={(e) => setValue("name", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">WEBSITE*</span>
              <input
                {...register("website")}
                className="form-input"
                defaultValue={brandsData.website}
                onChange={(e) => setValue("website", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">REPRESENTATIVE</span>
              <input
                {...register("representative")}
                className="form-input"
                defaultValue={brandsData.representative}
                onChange={(e) => setValue("representative", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">EMAIL*</span>
              <input
                {...register("email")}
                className="form-input"
                defaultValue={brandsData.email}
                onChange={(e) => setValue("email", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">NICHE*</span>
              <input
                {...register("niche", { required: false })}
                className="form-input"
                type="text"
                defaultValue={brandsData.niche}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">PROFILE PICTURE*</span>
              <input
                className="form-input"
                type="file"
                accept="image/jpeg, image/png, image/gif, image/jpg"
                onChange={handlePictureChange}
              />
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
          <form
            className="sidepanel-form"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="form-box">
              <span className="smallcaps">BRAND NAME*</span>
              <input
                {...register("name", {
                  required: "Brand name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Brand name is required",
                })}
                className="form-input"
                type="text"
                placeholder="Enter a name"
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">REPRESENTATIVE</span>
              <input
                {...register("representative", {
                  required: "Representative is required",
                  validate: (value) =>
                    value.trim() !== "" || "Representative is required",
                })}
                className="form-input"
                onChange={(e) => setValue("representative", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">EMAIL*</span>
              <input
                {...register("email", {
                  required: "Email is required",
                  validate: (value) =>
                    value.trim() !== "" || "Email is required",
                })}
                className="form-input"
                onChange={(e) => setValue("email", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">WEBSITE*</span>
              <input
                {...register("website")}
                className="form-input"
                onChange={(e) => setValue("website", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">NICHE*</span>
              <input
                {...register("niche", {
                  required: "Niche is required",
                  validate: (value) =>
                    value.trim() !== "" || "Niche is required",
                })}
                className="form-input"
                type="text"
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">PROFILE PICTURE*</span>
              <input
                className="form-input"
                type="file"
                accept="image/jpeg, image/png, image/gif, image/jpg"
                onChange={handlePictureChange}
              />
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

export default BrandForm;
