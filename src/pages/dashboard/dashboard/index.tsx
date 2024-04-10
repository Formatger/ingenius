import React, { useEffect, useState } from "react";
import withAuth from "@/components/common/WithAuth";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Add from "@/components/assets/icons/add.svg";
import Image from "next/image";
import DashboardBrands from "@/components/dashboard/dashboard/DasboardBrands";
import DashboardStats from "@/components/dashboard/dashboard/DashboardStats";
import InvoiceChart from "@/components/dashboard/dashboard/InvoiceChart";
import PendingInvoices from "@/components/dashboard/dashboard/PendingInvoices";

const DashboardPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

  const breadcrumbLinks = [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: "/dashboard/dashboard" },
  ];

  return (
    <div className="main-container">
      <div className="fixed-heading">
        <Breadcrumbs items={breadcrumbLinks} />
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container">
            <div className="dashboard-container">
              <div className="summary-wrap">
                <DashboardStats />
              </div>
              <div className="brands-clients">
                  <DashboardBrands/>
                <div className="invoice-stats">
                <PendingInvoices/>
                <InvoiceChart/>
                </div>
              </div>
            </div>
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