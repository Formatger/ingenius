import React, { useEffect, useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import { Arrow } from "@/components/assets/svg/Arrow";
import EasyFilters from "@/components/common/EasyFilters";
import Sidepanel from "@/components/common/Sidepanel";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import withAuth from "@/components/common/WithAuth";
import { getCampaignsDetail } from "@/utils/httpCalls";

const ITEMS_PER_PAGE = 10;

interface DataInterface {
  id: number;
  brand_name: string;
  campaign_name: string;
  total_projects: number;
  contract_value: number;
  brand_image_url: string;
  representative: string;
  invoice_number: string;
  invoice_date: string;
  campaign_duration: string;
}


const RevenueCampaignsPage = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [httpError, setHttpError] = useState({
    hasError: false,
    status: 0,
    message: "",
  });
  const [openSidepanel, setOpenSidepanel] = useState(false);
  const [revenueCampaigns, setRevenueCampaigns] = useState([]);
  const [noSlicedData, setNoSlicedData] = useState([]);
  const [data, setData] = useState<DataInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState({} as DataInterface);
  const totalPages = Math.ceil(
    noSlicedData.length / ITEMS_PER_PAGE
  );

  const breadcrumbLinks = [
    { label: "Home", link: "/" },
    { label: "Revenue", link: "/dashboard/revenue" },
    { label: "Campaigns & Brands", link: "/dashboard/revenue/campaigns", current: true },
  ];

  useEffect(() => {
    setLoader(true);
    getCampaignsDetail((response: any) => {
      setRevenueCampaigns(response);
      setNoSlicedData(response);
      setData(response);
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
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    ));
  }, [currentPage]);

  const handleOpenSidepanel = (campaign: any) => {
    setSelectedCampaign(campaign)
    setOpenSidepanel(!openSidepanel);
  };

  const handleCloseSidepanel = () => {
    setSelectedCampaign({} as DataInterface);
    setOpenSidepanel(false);
  }

  const handlePrevious = () => setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));


  const handleNext = () => setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));

  /**
   * Sort the table by the specified field
   * 
   * It toggles between ascending and descending order
   * 
   * totalProjects and contractValue are treated as numbers, 
   * while the rest are treated as strings
   * 
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
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    ));
  };

  const handleSearch = (search: string) => {
    const filteredData = revenueCampaigns.filter((campaign: DataInterface) => {
      return campaign.brand_name.toLowerCase().includes(search.toLowerCase()) ||
        campaign.campaign_name.toLowerCase().includes(search.toLowerCase());
    });
    setNoSlicedData(filteredData);
    setData(filteredData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    ));
  };

  const renderTable = () => {
    return (
      <div className="table-container">
        {httpError.hasError ? (
          <div className="error-message">
            Error: {httpError.status} - {httpError.message}
          </div>
        )
          : (
            <table className="revenue-campaigns-table">
              <thead>
                <tr className="table-header">
                  <th>
                    <div className="table-header-content">
                      <button className="header-button" onClick={() => sortBy("brand_name")}>
                        <Arrow className="arrow-down" />
                      </button>
                      <p>Partner</p>
                    </div>
                  </th>
                  <th>
                    <div className="table-header-content" onClick={() => sortBy("campaign_name")}>
                      <button className="header-button">
                        <Arrow className="arrow-down" />
                      </button>
                      <p>Campaign</p>
                    </div>
                  </th>
                  <th>
                    <div className="table-header-content-center" onClick={() => sortBy("total_projects")}>
                      <button className="header-button">
                        <Arrow className="arrow-down" />
                      </button>
                      <p>Total Projects</p>
                    </div>
                  </th>
                  <th>
                    <div className="table-header-content-center" onClick={() => sortBy("contract_value")}>
                      <button className="header-button">
                        <Arrow className="arrow-down" />
                      </button>
                      <p>Contract Value</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="table-body">
                {data.map((campaign) => (
                  <tr key={campaign.id} className="table-row" onClick={() => handleOpenSidepanel(campaign)}>
                    <td className="table-brand-cell">
                      <img src={campaign.brand_image_url} alt={campaign.brand_name} className="partner-image" />
                      {campaign.brand_name}
                    </td>
                    <td className="table-cell"><span className="round-tag linen">{campaign.campaign_name}</span> </td>
                    <td className="table-cell-center">{campaign.total_projects}</td>
                    <td className="table-cell-center">{`$${campaign.contract_value}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div >
    );
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <span>{`${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
          currentPage * ITEMS_PER_PAGE,
          noSlicedData.length
        )} of ${noSlicedData.length}`}</span>
        <button onClick={handlePrevious} disabled={currentPage === 1 || data.length === 0}>
          &lt;
        </button>
        <span>{currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || data.length === 0}
        >
          &gt;
        </button>
      </div>
    )
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
            {openSidepanel && <button className="overlayer" onClick={handleCloseSidepanel} />}
            {openSidepanel && (
              <Sidepanel campaignData={selectedCampaign} open={openSidepanel} />
            )}
            <EasyFilters handleSearch={handleSearch} />
            {renderTable()}
            {renderPagination()}
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
