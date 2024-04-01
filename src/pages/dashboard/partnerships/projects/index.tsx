import React, { useEffect, useState } from "react";
import { ProfileDetails, ProfileInvoice } from "@/components/partnerships/Projects";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Icon from "@/components/assets/icons/icon.svg";
import Image from "next/image";
import withAuth from "@/components/common/WithAuth";
import { getProfileDetail } from "@/utils/httpCalls";
import { Arrow } from "@/components/assets/svg/Arrow";
import { useRouter } from "next/router";
import Link from "next/link";

interface ProfileDataInterface {
  name: string,
  email: string
  internal: boolean,
  active_campaigns: number,
  active_projects: number,
  active_projects_value: number,
  profile_picture_url: string
}

const PartnershipsPage = () => {
  const router = useRouter()
  const { profileId } = router.query;
  const [loader, setLoader] = useState<boolean>(false);
  // const [invoiceData, setInvoiceData] = useState(null);
  const [profileData, setProfileData] = useState<ProfileDataInterface | null>(null);

  useEffect(() => { fetchData() }, [router]);

  const fetchData = () => {
    setLoader(true);
    Promise.all([
      getProfileDetail(
        (response: any) => {
          const profile = response.find((profile: any) => profile.name === profileId)
          console.log(profile)
          setProfileData(profile);
        },
        (error: any) => {
          console.error('Error fetching invoice data:', error);
        }
      )]).finally(() => {
        setLoader(false)
      });
  };

  return (
    <div className="main-container">
      <div className="breadcrumb-nav profile">
        <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/partnerships/projects' }}>
          <Arrow className="arrow-left orange-fill" />
          {`Profile`}
        </Link>
      </div>
      {loader ? (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      ) : (
        <>
          <div className="page-container" id="">
            <div className="profile-container">
              <div>
                <ProfileDetails profileData={profileData} />
              </div>
              <div>
                <ProfileInvoice profileData={profileData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const PartnershipsProfile = () => {
  return <Sidebar layout={<PartnershipsPage />} />;
};

export default withAuth(PartnershipsProfile);


// const PartnershipsPage = () => {
//   const [loader, setLoader] = useState<boolean>(false);

//   return (
//     <div className="main-container">
//       {/* <Breadcrumbs items={breadcrumbItems} /> */}
//       {loader ? (
//         <MainLoader />
//       ) : (
//         <>
//           <div className="page-container" id="dashboard">
//             <div className="profile-container">
//               <ProfileDetails />
//               <ProfileInvoice />
//             </div>

//           </div>
//         </>
//       )
//       }
//     </div >
//   );
// };

// const Partnerships = () => {
//   return <Sidebar layout={<PartnershipsPage />} />;
// };

// export default withAuth(Partnerships);
