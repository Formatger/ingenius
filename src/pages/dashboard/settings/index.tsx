import React, { useEffect, useState } from "react";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Image from "next/image";
import withAuth from "@/components/common/WithAuth";
import { useRouter } from "next/router";
import { getUserProfile, postUserProfile, putUserProfile } from "@/utils/httpCalls";
import ProfilePic from "@/components/assets/images/creator.png";
import { useForm } from "react-hook-form";
import { UserProfile } from "@clerk/nextjs";
import UserProfileForm from "@/components/dashboard/form/UserProfileForm";
import TeamTable from "@/components/dashboard/dashboard/TeamTable";

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface TeamInfo {
  name: string;
  members: Member[];
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  team_info: TeamInfo;
  team_picture_url: string;
}

// interface FormData {
//   id?: number;
//   name: string;
//   representative: string;
//   email: string;
//   niche: string;
//   website?: string;
//   profile_picture_url?: string;
//   profile_picture?: File;
//   user?: string;
//   active_campaigns?: string;
//   active_campaigns_value?: string;
//   created_at?: Date;
// }

interface SettingsPageProps {
}

const SettingsPage: React.FC<SettingsPageProps> = ({
}) => {
  const router = useRouter();
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   setValue,
  //   formState: { errors },
  // } = useForm<FormData>();
  const [loader, setLoader] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [imageURL, setImageURL] = useState<string | null>(userData.profile_picture_url || null);
  const [imageURL, setImageURL] = useState<any[]>([]);
  const [userData, setUserData] = useState({});
  const [editData, setEditData] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);

  const breadcrumbLinks = [
    { label: "Settings", link: "/dashboard/settings"  },
    { label: "My Account", link: "/dashboard/settings" },
  ];

  /* UPDATE USER API CALL */

  const updateUserData = () => {
    setUpdateUser((prevState) => !prevState);
  };
  
  /* GET USER API CALL */

    useEffect(() => {
      fetchUserProfile();
    }, [router]);
  
    const fetchUserProfile = () => {
      getUserProfile(
        (response: any) => {
          console.log("User profile data:", response); 
          setUserData(response[0] || []);
        },
        (error: any) => {
          console.error("Error fetching profile data:", error);
          setUserData({});
        }
      ).finally(() => {});
    };

  return (
    <div className="main-container">
      <div>
        <Breadcrumbs items={breadcrumbLinks} />
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="dashboard">
            <div className="settings-box">
              <div className="section-title">
                <h4 className="">
                  User Profile
                </h4>
                <button className="app-button linen" type="button" onClick={() => setEditData(true)}>
                  <p>Edit</p>
                </button>
              </div>
              <div className="settings-form-box">
                <UserProfileForm 
                  userData={userData}
                  isEditing={editData}
                  closeEdit={() => setEditData(false)}
                  updateUserData={updateUserData}
                />
              </div>

              <div className="section-title mt-5">
                <h4 className="">
                  Team Profile
                </h4>
              </div>
          <div className="settings-form-box">
            <div className="form-box">
              <div className="">
                <div className="upload-image mt-4">
                  {imageURL ? (
                    <img
                      src={userData?.team_picture_url}
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
            </div>
                <div className="card-text mt-8">
                  <div>
                    <p className="smallcaps">TEAM NAME</p>
                    <span className="sec-button gray1 ">
                      <p className="sec-tag">{userData?.team_info?.name}</p>
                    </span>
                  </div> 
                  {/* <div>
                    <p className="smallcaps">BUSINESS EMAIL</p>
                    <span className="sec-button gray1">
                      <p className="sec-tag">{userData?.team_info?.email}</p>
                    </span>
                  </div>  */}
                  <div>
                    <p className="smallcaps">TEAM MEMBERS</p>
                    <TeamTable
                    teamMembers={userData?.team_info?.members}/>
                  </div> 
                </div>
               </div>

              <div className="manage-account">
                <div className="section-title mt-4">
                  <h4 className="">
                    Account Settings
                  </h4>
                </div>

                <div className="settings-form-box margintop30">
                  <div>
                      <p className="smallcaps">MANAGE ACCOUNT</p>
                      <p className="settings-text">If you need to manage your account username, email or password or you want to close your account, please contact support.</p>
                    <div className="button-group mt-6">
                      <button className="app-button orange" onClick={() => {
                        localStorage.clear();
                        router.push('/auth');
                        }} aria-label="Close" type="button">
                        Contact Support
                      </button>
                      <button className="app-button" onClick={() => {
                        localStorage.clear();
                        router.push('/auth');
                        }} aria-label="Close" type="button">
                        Logout
                      </button>
                    </div>
                  </div> 
                </div> 

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Settings = () => {
  return <Sidebar layout={<SettingsPage />} />;
};

export default withAuth(Settings);
