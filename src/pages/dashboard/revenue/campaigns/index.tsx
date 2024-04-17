import React, { useEffect, useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import EasyFilters from "@/components/common/EasyFilters";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import withAuth from "@/components/common/WithAuth";
import { getCampaignsDetail } from "@/utils/httpCalls";
import { useWindowSize } from "@/utils/hooks/useWindowSize";
import { transformDate } from "@/utils/dateManager";
import CampaignsTable from "@/components/dashboard/table/CampaignTable";
import Pagination from "@/components/dashboard/table/Pagination";
import { CampaignInterface } from "@/interfaces/interfaces";
import SidepanelCampaign from "@/components/dashboard/profile/CampaignSidepanel";

const RevenueCampaignsPage = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [httpError, setHttpError] = useState({
    hasError: false,
    status: 0,
    message: "",
  });
  const [openSidepanel, setOpenSidepanel] = useState(false);
  const [revenueCampaigns, setRevenueCampaigns] = useState([]);
  const [noSlicedData, setNoSlicedData] = useState<CampaignInterface[]>([]);
  const [data, setData] = useState<CampaignInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState({} as CampaignInterface);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { height } = useWindowSize();

  const breadcrumbLinks = [
    { label: "Home", link: "/" },
    { label: "Revenue", link: "/dashboard/revenue/campaigns" },
    { label: "Campaigns & Brands", link: "/dashboard/revenue/campaigns", current: true },
  ];

  const totalPages = Math.ceil(
    noSlicedData.length / itemsPerPage
  );

  useEffect(() => {
    // items per page must be an integer value between 0 and 10 depending on the height of the window
    const calculateItemsPerPage = () => {
      const minRows = 2;
      const maxRows = 10;
      const ratio = height / 96;
      const itemsPerPage = Math.max(minRows, Math.min(maxRows, Math.floor(ratio)));
      setItemsPerPage(itemsPerPage);

      const revenueCampaignsCopy = [...revenueCampaigns];
      setData(revenueCampaignsCopy.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));
    };

    calculateItemsPerPage();
  }, [height]);

  useEffect(() => {
    setLoader(true);
    getCampaignsDetail((response: any) => {
      setRevenueCampaigns(response);
      setNoSlicedData(response);
      setData(response.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));
    }, (error: any) => {
      setHttpError({
        hasError: true,
        status: error.status,
        message: error.message,
      });
    })
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    const revenueCampaignsCopy = [...revenueCampaigns];
    setNoSlicedData(revenueCampaignsCopy);
    setData(revenueCampaignsCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  }, [currentPage]);

  const handleOpenSidepanel = (campaign: any) => {
    setSelectedCampaign(campaign)
    setOpenSidepanel(!openSidepanel);
  };

  const handleCloseSidepanel = () => {
    setSelectedCampaign({} as CampaignInterface);
    setOpenSidepanel(false);
  }

  const handlePrevious = () => setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));

  const handleNext = () => setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));

  /**
   * Sort the table by the specified field
   * It toggles between ascending and descending order
   * totalProjects and contractValue are treated as numbers, 
   * while the rest are treated as strings
   * @param field - Field to sort by
   */
  const sortBy = (field: keyof typeof revenueCampaigns[0]) => {
    // Sort by specified field
    const revenueCampaignsCopy = [...revenueCampaigns];
    if (field === "total_projects" || field === "contract_value") {
      revenueCampaignsCopy.sort((a, b) => a[field] - b[field]);
      if (JSON.stringify(revenueCampaignsCopy) === JSON.stringify(revenueCampaigns)) {
        // Already sorted in ascending order, so sort in descending order
        revenueCampaignsCopy.sort((a, b) => b[field] - a[field]);
      }
    } else {
      revenueCampaignsCopy.sort((a, b) => (a[field] as string)?.localeCompare(b[field] as string));
      if (JSON.stringify(revenueCampaignsCopy) === JSON.stringify(revenueCampaigns)) {
        // Already sorted in ascending order, so sort in descending order
        revenueCampaignsCopy.sort((a, b) => (b[field] as string)?.localeCompare(a[field] as string));
      }
    }
    setRevenueCampaigns(revenueCampaignsCopy);
    setNoSlicedData(revenueCampaignsCopy);
    setData(revenueCampaignsCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  };

  const handleSearch = (search: string) => {
    const filteredData = revenueCampaigns.filter((campaign: any) => {
      return campaign.brand_name.toLowerCase().includes(search.toLowerCase()) ||
        campaign.campaign_name.toLowerCase().includes(search.toLowerCase());
    });
    setNoSlicedData(filteredData);
    setData(filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  };

  const filterByDate = (type: string) => {
    const currentDate = new Date();
    const endDate = new Date();
    let filteredData: CampaignInterface[] = [...revenueCampaigns]

    switch (type) {
      case "Today":
        filteredData = filteredData.filter((campaign: CampaignInterface) => {
          const [, endDate] = transformDate(campaign.campaign_duration);
          console.log(endDate)
          if (endDate.getDate() === currentDate.getDate() &&
            endDate.getMonth() === currentDate.getMonth() &&
            endDate.getFullYear() === currentDate.getFullYear()) {
            return campaign;
          }
        });
        console.log(filteredData)
        break;
      case "Yesterday":
        filteredData = filteredData.filter((campaign: CampaignInterface) => {
          const [, endDate] = transformDate(campaign.campaign_duration);
          endDate.setDate(endDate.getDate() + 1);
          if (endDate.getDate() === currentDate.getDate() &&
            endDate.getMonth() === currentDate.getMonth() &&
            endDate.getFullYear() === currentDate.getFullYear()) {
            return campaign;
          }
        });
        break;
      case "Week":
        filteredData = filteredData.filter((campaign: CampaignInterface) => {
          const [, endDate] = transformDate(campaign.campaign_duration);
          const weekStart = new Date();
          weekStart.setDate(currentDate.getDate() - 7);
          weekStart.setHours(0, 0, 0, 0);
          if (endDate >= weekStart && endDate <= currentDate) {
            return campaign;
          }
        });
        break;
      case "Month":
        filteredData = filteredData.filter((campaign: CampaignInterface) => {
          const [, endDate] = transformDate(campaign.campaign_duration);
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          monthAgo.setHours(0, 0, 0, 0);
          if (endDate >= monthAgo && endDate <= currentDate) {
            return campaign;
          }
        });
        break;
      default:
        filteredData = [...revenueCampaigns];
        break;
    }

    setNoSlicedData(filteredData);
    setData(filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  }

  return (
    <div className="main-container">
      <div className="breadcrumb-nav"><Breadcrumbs items={breadcrumbLinks} /></div>
      {loader ? (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      ) : (
        <>
          <div className="page-container" id="revenueCampaigns">
            {openSidepanel && (
              <SidepanelCampaign
                campaignsData={selectedCampaign}
                open={openSidepanel}
                setOpenSidepanel={setOpenSidepanel}
                setSelectedCampaign={setSelectedCampaign}
              />
            )}
            <EasyFilters filterByDate={filterByDate} handleSearch={handleSearch} />
            <CampaignsTable
              httpError={httpError}
              data={data}
              sortBy={sortBy}
              handleOpenSidepanel={handleOpenSidepanel}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              noSlicedData={noSlicedData}
              data={data}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              totalPages={totalPages}
            />
          </div>

        </>
      )}
    </div>
  );
};

const RevenueCampaigns = () => {
  return <Sidebar layout={<RevenueCampaignsPage />} />;
};

export default withAuth(RevenueCampaigns);
