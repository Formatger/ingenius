import React, { useEffect, useState } from "react";
import withAuth from "@/components/common/WithAuth";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Add from "@/components/assets/icons/add.svg";
import Image from "next/image";
import DashboardBrands from "@/components/dashboard/DasboardBrands";
import DashboardStats from "@/components/dashboard/DashboardStats";
import HelpIcon from "@/components/assets/svg/Help";

const DashboardPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <div className="main-container">
      <div className="fixed-heading">
        {/* <Breadcrumbs items={items} /> */}
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="dashboard">
            {/* <div className="summary-wrap">
              <DashboardStats />
            </div>
            <div className="row-group">
              <div className="">
                <DashboardBrands/>
              </div>
              <div className="column-group">
                <DashboardBrands/>
                <DashboardBrands/>
              </div>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

const Dashboard = () => {
  return <Sidebar layout={<DashboardPage />} />;
};

export default withAuth(Dashboard);