import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HelpIcon from "@/components/assets/svg/Help";
import { useForm } from "react-hook-form";
import FormSidepanel from "@/components/common/Sidepanel";
import {
  postUserProfile,
  putUserProfile,
} from "@/utils/httpCalls";
import { useRouter } from "next/router";
import ProfilePic from "@/components/assets/images/creator.png";

interface FormData {
  id?: number;
  first_name: string;
  last_name: string;
  // profile_picture_url?: string;
  // profile_picture?: File;
  email: string;
}

interface UserProfileFormProps {
  updateUserData: () => void;
  isEditing: boolean;
  userData: any;
  closeEdit: () => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  updateUserData,
  isEditing,
  userData,
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
  // const [imageURL, setImageURL] = useState<string | null>(
  //   userData.profile_picture_url || null
  // );

  /* UPLOAD PROFILE PICTURE */

  // const handleUploadImage = (event: any) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setValue("profile_picture", file);
  //     const url = URL.createObjectURL(file);
  //     setImageURL(url); 
  //   }
  // };

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
        const userId = userData.id;

        await putUserProfile(
          userId,
          formData,
          (response) => {
            reset();
            closeEdit();
            updateUserData();
          },
          (error) => {
            console.error("Error updating brand:", error);
          }
        );
      } else {
        console.log("Data for POST:", formData);

        await postUserProfile(
          formData,
          (response) => {
            reset();
            // handleClose();
            updateUserData();
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
    
    <div>
      {isEditing ? (
        <div className="">
          <form
            className="sidepanel-form"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            {/* <div className="form-box">
              <span className="smallcaps">PROFILE PICTURE</span>
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
            </div>*/}
            <div className="form-box">
              <span className="smallcaps">NAME</span>
              <input
                {...register("first_name", {
                  required: "Name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Name is required",
                })}
                className="form-input"
                type="text"
                placeholder="Enter name"
                defaultValue={userData.first_name}
              />
              {errors.first_name && (
                <span className="error-message">{errors.first_name.message}</span>
              )}
            </div> 
            <div className="form-box">
              <span className="smallcaps">LAST NAME</span>
              <input
                {...register("last_name")}
                className="form-input"
                type="text"
                defaultValue={userData.last_name}
                placeholder="Enter last name"
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">EMAIL</span>
              <input
                className="form-input disabled"
                defaultValue={userData.email}
                disabled
              />
            </div>
            <div className="button-group">
              <button
                className="sec-button stone"
                type="button"
                onClick={closeEdit}
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
        <div>
          <div className="sidepanel-form">
            {/* <div className="form-box">
              <div className="">
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
              </div>
            </div> */}
            <div className="card-text mt-4">
              <div>
                <p className="smallcaps">NAME</p>
                <span className="sec-button gray1 ">
                  <p className="sec-tag">{userData.first_name}</p>
                </span>
              </div> 
              <div>
                <p className="smallcaps">LAST NAME</p>
                <span className="sec-button gray1">
                  <p className="sec-tag">{userData.last_name}</p>
                </span>
              </div> 
              <div>
                <p className="smallcaps">EMAIL</p>
                <span className="sec-button gray1">
                  <p className="sec-tag">{userData.email}</p>
                </span>
              </div> 
            </div> 
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileForm;
