import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import { set, useForm } from "react-hook-form";
import FormSidepanel from "@/components/common/Sidepanel";
import {
  lockBrand,
  postBrands,
  putBrand,
  unlockBrand,
} from "@/utils/httpCalls";
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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormData>();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    lockBrand(brandsData.id);

    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      unlockBrand(brandsData.id);
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unlockBrand(brandsData.id);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  /* SIDEPANEL STATE */
  const handleClose = () => {
    handleCloseFormSidepanel();
  };

  /* UPLOAD PROFILE PICTURE */

  const handleUploadImage = (event: any) => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      setValue("profile_picture", file);
      const url = URL.createObjectURL(file); // Create a URL for the file
      setImageURL(url); // Update the imageURL state
    }
  };

  /* SUBMIT FORM - POST BRANDS API CALL  */

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    setSubmitting(true);
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

        await putBrand(
          brandId,
          formData,
          (response) => {
            console.log("Item updated successfully:", response);
            reset();
            closeEdit();
            updateBrandData();
          },
          (error) => {
            console.error("Error updating brand:", error);
          }
        ).finally(() => setSubmitting(false));
      } else {
        console.log("Data for POST:", formData);

        await postBrands(
          formData,
          (response) => {
            console.log("Item updated successfully:", response);
            reset();
            handleClose();
            updateBrandData();
          },
          (error) => {
            console.error("Error creating brand:", error);
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
          <form
            className="sidepanel-form"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="form-box">
              <span className="smallcaps">PROFILE PICTURE*</span>
              <input
                id="fileInput"
                style={{ display: "none" }}
                type="file"
                accept="image/jpeg, image/png, image/gif, image/jpg"
                onChange={handleUploadImage}
              />
              <div className="upload-image-box">
                <div className="upload-image">
                  {imageURL ? (
                    <img
                      src={imageURL}
                      alt="Uploaded"
                      style={{ width: "120px", height: "120px" }}
                    />
                  ) : (
                    <Image
                      src={ProfilePic}
                      alt="Icon"
                      width={120}
                      height={120}
                    />
                  )}
                </div>
                {imageURL ? (
                  <label htmlFor="fileInput" className="custom-image-upload">
                    Change Image
                  </label>
                ) : (
                  <label htmlFor="fileInput" className="custom-image-upload">
                    Upload Image
                  </label>
                )}
              </div>
            </div>
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
                defaultValue={brandsData.name}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">REPRESENTATIVE*</span>
              <input
                {...register("representative", {
                  required: "Representative name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Representative name is required",
                })}
                className="form-input"
                type="text"
                placeholder="Enter representative name"
                defaultValue={brandsData.representative}
              />
              {errors.representative && (
                <span className="error-message">{errors.representative.message}</span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">EMAIL*</span>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address"
                  }
                })}
                className="form-input"
                placeholder="Enter email"
                defaultValue={brandsData.email}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">WEBSITE*</span>
              <input
                {...register("website", {
                  required: "Website is required",
                  pattern: {
                    value: /^(http:\/\/|https:\/\/)(www\.)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:/~\+#]*)*$/i,
                    message: "Website must start with http:// or https:// and be a valid format"
                  }
                })}
                className="form-input"
                defaultValue={brandsData.website}
                placeholder="https://"
              />
              {errors.website && (
                <span className="error-message">{errors.website.message}</span>
              )}
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
                placeholder="Enter brand niche"
                defaultValue={brandsData.niche}
              />
              {errors.niche && (
                <span className="error-message">{errors.niche.message}</span>
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
          <form
            className="sidepanel-form"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="form-box">
              <span className="smallcaps">PROFILE PICTURE*</span>
              <input
                id="fileInput"
                style={{ display: "none" }}
                type="file"
                accept="image/jpeg, image/png, image/gif, image/jpg"
                onChange={handleUploadImage}
              />
              <div className="upload-image-box">
                <div className="upload-image">
                  {imageURL ? (
                    <img
                      src={imageURL}
                      alt="Uploaded"
                      style={{ width: "120px", height: "120px" }}
                    />
                  ) : (
                    <Image
                      src={ProfilePic}
                      alt="Icon"
                      width={120}
                      height={120}
                    />
                  )}
                </div>
                {imageURL ? (
                  <label htmlFor="fileInput" className="custom-image-upload">
                    Change Image
                  </label>
                ) : (
                  <label htmlFor="fileInput" className="custom-image-upload">
                    Upload Image
                  </label>
                )}
              </div>
            </div>

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
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">REPRESENTATIVE*</span>
              <input
                {...register("representative", {
                  required: "Representative name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Representative is required",
                })}
                className="form-input"
                type="text"
                placeholder="Enter representative name"
              />
              {errors.representative && (
                <span className="error-message">{errors.representative.message}</span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">EMAIL*</span>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address"
                  }
                })}
                className="form-input"
                placeholder="Enter email"
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">WEBSITE*</span>
              <input
                {...register("website", {
                  required: "Website is required",
                  pattern: {
                    value: /^(http:\/\/|https:\/\/)(www\.)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:/~\+#]*)*$/i,
                    message: "Website must start with http:// or https:// and be a valid format"
                  }
                })}
                className="form-input"
                placeholder="https://"
              />
              {errors.website && (
                <span className="error-message">{errors.website.message}</span>
              )}
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
                placeholder="Enter brand niche"
              />

              {errors.niche && (
                <span className="error-message">{errors.niche.message}</span>
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

export default BrandForm;
