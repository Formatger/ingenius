import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import { useForm } from "react-hook-form";
import FormSidepanel from "@/components/common/ProfileSidepanel";
import { CampaignInterface, ProjectInterface } from "@/interfaces/interfaces";
import { getBrands, postBrands, putBrand } from "@/utils/httpCalls";
import { useRouter } from "next/router";
import ProfilePic from "@/components/assets/images/creator.png";

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
  const router = useRouter()
  const { register, handleSubmit, reset, setValue,formState: { errors } } = useForm<FormData>();
  const [imageURL, setImageURL] = useState<string | null>(null);
  /* SIDEPANEL STATE */
  const handleClose = () => {
    handleCloseFormSidepanel();
  };


  /* UPLOAD PROFILE PICTURE */
  // const handleUploadImage = (event:any) => {
  //   const files = event.currentTarget.files; // Obtén todos los archivos seleccionados
  //   const lastFile = files[files.length - 1]; // Obtiene el último archivo seleccionado
  //   if (lastFile) {
  //     setValue("profile_picture", lastFile);
  //     console.log("Último archivo seleccionado:", lastFile);
  //   }
  // };

  const handleUploadImage = (event: any) => {
    const file = event.target.files[0];  // Get the first file
    if (file) {
      setValue("profile_picture", file);
      const url = URL.createObjectURL(file);  // Create a URL for the file
      setImageURL(url);  // Update the imageURL state
    }
  };

  /* SUBMIT FORM - POST BRANDS API CALL  */

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
  
    const formData = new FormData();
  
    // Append all form data fields to the FormData object
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
  
    try {
      if (isEditing) {
        const brandId = brandsData.id;
        console.log("Updated Data for PUT:", formData);
  
        await putBrand(
          brandId,
          formData,
          (response) => {
            console.log("Brand updated successfully:", response);
            reset();
            closeEdit();
            updateBrandData();
          },
          (error) => {
            console.error("Error updating brand:", error);
          }
        );
      } else {
        console.log("Data for POST:", formData);
  
        await postBrands(
          formData,
          (response) => {
            console.log("Brand created successfully:", response);
            reset();
            handleClose();
            updateBrandData();
          },
          (error) => {
            console.error("Error creating brand:", error);
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
        <p className="row-wrap-2 text-brown">
        {isEditing ? "Edit Brand" : "Add Brand"}
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
          <form className="sidepanel-form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="form-box">
              <span className="smallcaps">PROFILE PICTURE*</span>
              <input
                id="fileInput"
                style={{ display: 'none' }}
                type="file"
                accept="image/jpeg, image/png, image/gif, image/jpg"
                onChange={handleUploadImage}
              />
              <div className="upload-image-box">
                <div className="upload-image">
                {imageURL 
                  ? <img src={imageURL} alt="Uploaded" style={{ width: '120px', height: '120px' }} />
                  : <Image src={ProfilePic} alt="Icon" width={120} height={120} />
                }
                </div>
                {imageURL 
                ? <label htmlFor="fileInput" className="custom-file-upload">Change Image</label>
                :  <label htmlFor="fileInput" className="custom-file-upload">Upload Image</label>}
              </div>
            </div>
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
            {/* <div className="form-box">
            <span className="smallcaps">PROFILE PICTURE*</span>
                <input
                    className="form-input"
                    type="file"
                    accept="image/jpeg"
                    onChange={handleUploadImage}
                />
            </div> */}
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
         <form className="sidepanel-form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
         <div className="form-box">
            <span className="smallcaps">PROFILE PICTURE*</span>
            <input
              id="fileInput"
              style={{ display: 'none' }}
              type="file"
              accept="image/jpeg, image/png, image/gif, image/jpg"
              onChange={handleUploadImage}
            />
            <div className="upload-image-box">
              <div className="upload-image">
              {imageURL 
                ? <img src={imageURL} alt="Uploaded" style={{ width: '120px', height: '120px' }} />
                : <Image src={ProfilePic} alt="Icon" width={120} height={120} />
              }
              </div>
              {imageURL 
              ? <label htmlFor="fileInput" className="custom-file-upload">Change Image</label>
              :  <label htmlFor="fileInput" className="custom-file-upload">Upload Image</label>}
            </div>
          </div>

            <div className="form-box">
              <span className="smallcaps">BRAND NAME*</span>
              <input
                {...register("name", {
                  required: "Brand name is required",
                  validate: value => value.trim() !== "" || "Brand name is required"
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
                  validate: value => value.trim() !== "" || "Representative is required"
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
                  validate: value => value.trim() !== "" || "Email is required"
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
                  validate: value => value.trim() !== "" || "Niche is required"
                })}
                className="form-input"
                type="text"
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
