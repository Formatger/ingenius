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

  useEffect(() => {
    lockCreator(creatorsData.id);

    return () => {
      unlockCreator(creatorsData.id);
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

  /* SUBMIT FORM - POST CREATOR API CALL  */

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);

    const formData = new FormData();

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
            console.error("Error updating brand:", error);
          }
        );
      } else {
        console.log("Data for POST:", formData);

        await postCreators(
          formData,
          (response) => {
            reset();
            handleClose();
            updateCreatorData();
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
                defaultValue={creatorsData.name}
                onChange={(e) => setValue("name", e.target.value)}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>
            <div className="form-box">
              <span className="smallcaps">EMAIL*</span>
              <input
                {...register("email")}
                className="form-input"
                defaultValue={creatorsData.email}
                onChange={(e) => setValue("email", e.target.value)}
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">NICHE*</span>
              <input
                {...register("niche", { required: false })}
                className="form-input"
                type="text"
                defaultValue={creatorsData.niche}
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
              )}             </div>
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

            <button className="sec-button linen" type="submit">
              <p>SAVE</p>
            </button>
          </form>
        </div>
      )}
    </FormSidepanel>
  );
};

export default CreatorForm;
