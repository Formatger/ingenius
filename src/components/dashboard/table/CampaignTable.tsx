import Arrow from "@/components/assets/svg/Arrow";
import React, { useState } from "react";
import Image from "next/image";

interface CampaignTableProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  dataToDisplay: any[];
  sortBy: (type: string) => void;
  handleOpenSidepanel: (campaign: object) => void;
}

const CampaignTable = ({
  httpError,
  dataToDisplay,
  sortBy,
  handleOpenSidepanel,
}: CampaignTableProps) => {
  const [sortDirection, setSortDirection] = useState([
    {
      name: "brand_name",
      isSortAsc: false,
    },
    {
      name: "name",
      isSortAsc: false,
    },
    {
      name: "total_projects",
      isSortAsc: false,
    },
    {
      name: "contract_value",
      isSortAsc: false,
    },
    {
      name: "campaign_stage_name",
      isSortAsc: false,
    },
  ]);

  const handleSort = (type: string) => {
    sortBy(type);
    const newSortDirection = sortDirection?.map((item: any) => {
      if (item.name === type) {
        return { name: item.name, isSortAsc: !item.isSortAsc };
      }
      return { name: item.name, isSortAsc: false };
    });
    setSortDirection(newSortDirection);
  };

  const findFieldAsc = (name: string) => {
    return sortDirection.find((sd) => sd.name === name)?.isSortAsc;
  };

  return (
    <div className="table-container">
      {httpError.hasError ? (
        <div className="error-message">
          Error: {httpError.status} - {httpError.message}
        </div>
      ) : (
        <table className="app-table">
          <thead>
            <tr className="table-header">
              <th>
                <div className="table-header-content">
                  <button
                    className="header-button"
                    onClick={() => handleSort("brand_name")}
                  >
                    <Arrow
                      className={
                        findFieldAsc("brand_name") ? "arrow-up" : "arrow-down"
                      }
                    />
                  </button>
                  <p>Partner</p>
                </div>
              </th>
              <th>
                <div className="table-header-content">
                  <button
                    className="header-button"
                    onClick={() => handleSort("name")}
                  >
                    <Arrow
                      className={
                        findFieldAsc("name") ? "arrow-up" : "arrow-down"
                      }
                    />
                  </button>
                  <p>Campaign</p>
                </div>
              </th>
              <th>
                <div className="table-header-content-center">
                  <button
                    className="header-button"
                    onClick={() => handleSort("total_projects")}
                  >
                    <Arrow
                      className={
                        findFieldAsc("total_projects")
                          ? "arrow-up"
                          : "arrow-down"
                      }
                    />
                  </button>
                  <p>Total Projects</p>
                </div>
              </th>
              <th>
                <div className="table-header-content-center">
                  <button
                    className="header-button"
                    onClick={() => handleSort("contract_value")}
                  >
                    <Arrow
                      className={
                        findFieldAsc("contract_value")
                          ? "arrow-up"
                          : "arrow-down"
                      }
                    />
                  </button>
                  <p>Contract Value</p>
                </div>
              </th>
              <th>
                <div className="table-header-content">
                  <button
                    className="header-button"
                    onClick={() => handleSort("campaign_stage_name")}
                  >
                    <Arrow
                      className={
                        findFieldAsc("campaign_stage_name")
                          ? "arrow-up"
                          : "arrow-down"
                      }
                    />
                  </button>
                  <p>Label</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {dataToDisplay &&
              dataToDisplay.length > 0 &&
              dataToDisplay?.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="table-row"
                  onClick={() => handleOpenSidepanel(campaign)}
                >
                  <td className="table-brand-cell">
                    <Image
                      src={campaign.brand_image_url}
                      alt={campaign.brand_name}
                      width={40}
                      height={40}
                      layout="fixed"
                      className="partner-image"
                      loading="lazy"
                      quality={75}
                    /> 
                    {/* <img
                      src={campaign.brand_image_url}
                      alt={campaign.brand_name}
                      className="partner-image"
                    /> */}
                    {campaign.brand_name}
                  </td>
                  <td className="table-cell">
                    <span className="round-tag linen">
                      {campaign.campaign_name || campaign.name}
                    </span>{" "}
                  </td>
                  <td className="table-cell-center">
                    {campaign.total_projects}
                  </td>
                  <td className="table-cell-center">{`$${campaign.contract_value}`}</td>
                  <td className="table-cell-center">
                    <span className="stage-tag green">
                      {campaign.campaign_stage_name}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CampaignTable;
