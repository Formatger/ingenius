import React, { useEffect, useState } from "react";
import withAuth from "@/components/common/WithAuth";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Add from "@/components/assets/icons/add.svg";
import Image from "next/image";
import DashboardBrands from "@/components/dashboard/dashboard/DashboardBrands";
import DashboardCreators from "@/components/dashboard/dashboard/DashboardCreators";
import DashboardStats from "@/components/dashboard/dashboard/DashboardStats";
import InvoiceChart from "@/components/dashboard/dashboard/InvoiceChart";
import InvoiceChartProjects from "@/components/dashboard/dashboard/InvoiceChartProjects";
import PendingInvoices from "@/components/dashboard/dashboard/PendingInvoices";
import { getStats, getCreators, getBrands, getProjects, getCampaigns } from "@/utils/httpCalls";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [stats, setStats] = useState<any>(null); // Inicializa stats como null
  const [pieChartData, setPieChartData] = useState<any>(null); // Inicializa pieChartData como null
  const [updateStats, setUpdateStats] = useState(false);
  const router = useRouter();
  const [campaignsData, setCampaignsData] = useState<any[]>([]);
  const [projectsData, setProjectsData] = useState<any[]>([]);

  const breadcrumbLinks = [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: "/dashboard/dashboard" },
  ];

  const updateStatsData = () => {
    setUpdateStats((prevState) => !prevState);
  };

  useEffect(() => {
    fetchStats();
  }, [router]);

  const fetchStats = () => {
    setLoader(true);
    getStats(
      (response: any) => {
        setStats({
          total_contracts: response.total_contracts,
          total_clients: response.total_clients,
          total_profit: response.total_profit,
          expense_total: response.expense_total,
        });
        setPieChartData({
          campaigns: response.pie_charts.campaigns,
          projects: response.pie_charts.projects,
        });
        setUpdateStats(false);
        setLoader(false); // Establece loader en false después de recibir los datos
      },
      (error: any) => {
        console.error("Error fetching profile data:", error);
        setLoader(false); // Establece loader en false en caso de error
      }
    );
  };

  useEffect(() => {
    fetchCampaignsData();
  }, [router]);
  
  const fetchCampaignsData = () => {
    setLoader(true);
    getCampaigns(
      (response: any) => {
        setCampaignsData(response);
        setUpdateStats(false);
        setLoader(false);
      },
      (error: any) => {
        console.error("Error fetching profile data:", error);
        setLoader(false); 
      }
    );
  };

  useEffect(() => {
    fetchProjectsData();
  }, [router]);
  
  const fetchProjectsData = () => {
    setLoader(true);
    getProjects(
      (response: any) => {
        setProjectsData(response);
        setUpdateStats(false);
        setLoader(false); 
      },
      (error: any) => {
        console.error("Error fetching profile data:", error);
        setLoader(false); 
      }
    );
  };

  return (
    <div className="main-container">
      <div className="fixed-heading">
        <Breadcrumbs items={breadcrumbLinks} />
      </div>
      {loader ? (
        <MainLoader />
      ) : stats && pieChartData ? ( // Verifica si stats y pieChartData tienen valores
        <div className="page-container">
          <div className="dashboard-container">
            <div className="summary-wrap">
              <DashboardStats
                stats={stats}
                updateStatsData={updateStatsData}
              />
            </div>
            <div className="brands-clients">
              <DashboardBrands 
                campaignsData={campaignsData} 
              />
              <div className="invoice-stats">
                <InvoiceChart 
                pieChartData={pieChartData}/>
                {/* <PendingInvoices/> */}
              </div>
            </div>
            <div className="brands-clients">
              <DashboardCreators 
              projectsData={projectsData} 
              />
              <div className="invoice-stats">
                <InvoiceChartProjects
                pieChartData={pieChartData}
                 />
                {/* <PendingInvoices/> */}
              </div>
            </div>
          </div>
        </div>
      ) : null} 
    </div>
  );
};

const Dashboard = () => {
  return <Sidebar layout={<DashboardPage />} />;
};

export default withAuth(Dashboard);