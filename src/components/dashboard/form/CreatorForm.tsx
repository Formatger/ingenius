import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import { useForm } from "react-hook-form";
import FormSidepanel from "@/components/common/Sidepanel";
import { CampaignInterface, ProjectInterface } from "@/interfaces/interfaces";
import {
  getBrands,
  lockCreator,
  postBrands,
  postCreators,
  putBrand,
  putCreator,
  unlockCreator,
} from "@/utils/httpCalls";
import { useRouter } from "next/router";
import ProfilePic from "@/components/assets/images/creator.png";

interface FormData {
  id?: number;
  name: string;
  representative: string;
  email: string;
  niche: string;
  website?: string;
  profile_picture_url?: string;
  profile_picture?: File;
  user?: string;
  active_campaigns?: string;
  active_campaigns_value?: string;
  created_at?: Date;
}

interface CreatorFormProps {
  handleCloseFormSidepanel: () => void;
  updateCreatorData: () => void;
  isEditing: boolean;
  creatorsData: any;
  closeEdit: () => void;
}

const CreatorForm: React.FC<CreatorFormProps> = ({
  handleCloseFormSidepanel,
  updateCreatorData,
  isEditing,
  creatorsData,
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
  const [imageURL, setImageURL] = useState<string | null>(
    creatorsData.profile_picture_url || null
  );
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    lockCreator(creatorsData.id);

    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      unlockCreator(creatorsData.id);
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unlockCreator(creatorsData.id);
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

  /* RELOAD */

  /* SUBMIT FORM - POST CREATOR API CALL  */

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    setSubmitting(true);
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    try {
      if (isEditing) {
        const creatorId = creatorsData.id;

        await putCreator(
          creatorId,
          formData,
          (response) => {
            reset();
            closeEdit();
            updateCreatorData();
          },
          (error) => {
            console.error("Error updating creator:", error);
          }
        ).finally(() => setSubmitting(false));
      } else {

        await postCreators(
          formData,
          (response) => {
            reset();
            handleClose();
            updateCreatorData();
          },
          (error) => {
            console.error("Error creating creator:", error);
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
          {isEditing ? "Edit Creator" : "Add Creator"}
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
                      loading="lazy"
                    />
                  //   <Image
                  //   src={imageURL}
                  //   alt="image"
                  //   width={120}
                  //   height={120}
                  //   layout="fixed"
                  //   className="partner-image"
                  //   loading="lazy"
                  //   quality={75}
                  // /> 
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
              <span className="smallcaps">CREATOR NAME*</span>
              <input
                {...register("name", {
                  required: "Creator name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Creator name is required",
                })}
                className="form-input"
                type="text"
                defaultValue={creatorsData.name}
                placeholder="Enter a name"
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
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
                defaultValue={creatorsData.email}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
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
                defaultValue={creatorsData.niche}
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
                      loading="lazy"
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
              <span className="smallcaps">CREATOR NAME*</span>
              <input
                {...register("name", {
                  required: "Creator name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Creator name is required",
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

export default CreatorForm;
