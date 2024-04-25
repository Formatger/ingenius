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
import { getStats, getCreators, getBrands } from "@/utils/httpCalls";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [stats, setStats] = useState<any>(null); // Inicializa stats como null
  const [pieChartData, setPieChartData] = useState<any>(null); // Inicializa pieChartData como null
  const [updateStats, setUpdateStats] = useState(false);
  const router = useRouter();
  const [brandsData, setBrandsData] = useState<any[]>([]);
  const [creatorsData, setCreatorsData] = useState<any[]>([]);

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

  console.log("???????????", stats);
  console.log("???????", pieChartData);


   /* BRANDS API CALL  */

  //  useEffect(() => {
  //   setLoader(true);
  //   getBrands(
  //     (response) => {
  //       setBrandsData(response);
  //       setLoader(false);
  //     },
  //     (error) => {
  //       console.error("Error fetching brands data:", error);
  //       setLoader(false);
  //     }
  //   );
  // },[]);


  useEffect(() => {
    fetchBrandsData();
  }, [router]);
  
  const fetchBrandsData = () => {
    setLoader(true);
    getBrands(
      (response: any) => {
        setBrandsData(response); // Aquí elimina el objeto adicional alrededor de response
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
    fetchCreatorsData();
  }, [router]);
  
  const fetchCreatorsData = () => {
    setLoader(true);
    getCreators(
      (response: any) => {
        setCreatorsData(response); // Aquí elimina el objeto adicional alrededor de response
        setUpdateStats(false);
        setLoader(false); // Establece loader en false después de recibir los datos
      },
      (error: any) => {
        console.error("Error fetching profile data:", error);
        setLoader(false); // Establece loader en false en caso de error
      }
    );
  };

  // Renderiza el componente DashboardStats solo si stats y pieChartData no son nulos
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
            brandsData={brandsData} 
            />
              <div className="invoice-stats">
                <InvoiceChart 
                pieChartData={pieChartData}/>
                {/* <PendingInvoices/> */}
              </div>
            </div>
            <div className="brands-clients">
              <DashboardCreators 
              creatorsData={creatorsData} 
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
      ) : null} {/* Si stats o pieChartData son nulos, no renderiza nada */}
    </div>
  );
};

const Dashboard = () => {
  return <Sidebar layout={<DashboardPage />} />;
};

export default withAuth(Dashboard);