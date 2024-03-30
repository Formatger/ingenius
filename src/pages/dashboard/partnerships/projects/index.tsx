import React, { useEffect, useState } from "react";
// import { Profiledetails, Profileinvoice } from "@/components/partnerships/Projects";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Icon from "@/components/assets/icons/icon.svg";
import Image from "next/image";
import withAuth from "@/components/common/WithAuth";

const PartnershipsPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <div className="main-container">
      {/* <Breadcrumbs items={breadcrumbItems} /> */}
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="dashboard">
            <div className="profile-container">
              {/* <Profiledetails />
              <Profileinvoice /> */}
            </div>

          </div>
        </>
      )
      }
    </div >
  );
};

const Partnerships = () => {
  return <Sidebar layout={<PartnershipsPage />} />;
};

export default withAuth(Partnerships);
