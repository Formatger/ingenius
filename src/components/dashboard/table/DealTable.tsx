import Arrow from "@/components/assets/svg/Arrow";
import React, { useState } from "react";
import Image from "next/image";

interface DealTableProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[];
  sortBy: (type: string) => void;
  handleOpenSidepanel: (campaign: object) => void;
}

const DealTable = ({
  httpError,
  data,
  sortBy,
  handleOpenSidepanel,
}: DealTableProps) => {
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
      name: "total_campaigns",
      isSortAsc: false,
    },
    {
      name: "contract_value",
      isSortAsc: false,
    },
    {
      name: "deal_stage_name",
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
                  <p>Brand</p>
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
                  <p>Deal Name</p>
                </div>
              </th>
              <th>
                <div className="table-header-content">
                  <button
                    className="header-button"
                    onClick={() => handleSort("total_campaigns")}
                  >
                    <Arrow
                      className={
                        findFieldAsc("total_campaigns")
                          ? "arrow-up"
                          : "arrow-down"
                      }
                    />
                  </button>
                  <p>Campaigns</p>
                </div>
              </th>
              <th>
                <div className="table-header-content">
                  <button
                    className="header-button"
                  // onClick={() => handleSort("total_campaigns")}
                  >
                    <Arrow className={"arrow-down"} />
                  </button>
                  <p>Projects</p>
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
                    onClick={() => handleSort("deal_stage_name")}
                  >
                    <Arrow
                      className={
                        findFieldAsc("deal_stage_name")
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
            {data &&
              data.length > 0 &&
              data?.map((deal) => (
                <tr
                  key={deal.id}
                  className="table-row"
                  onClick={() => handleOpenSidepanel(deal)}
                >
                  <td className="table-brand-cell">
                  {/* <Image
                      src={deal.brand_image_url}
                      alt={deal.brand_name}
                      width={40}
                      height={40}
                      layout="fixed"
                      className="partner-image"
                      loading="lazy"
                      quality={75}
                    />  */}
                    <img
                      src={deal.brand_image_url}
                      alt={deal.brand_name}
                      className="partner-image"
                      width={40}
                      height={40}
                      loading="lazy"
                    />
                    {deal.brand_name}
                  </td>

                  <td className="table-cell-center">{deal.name}</td>
                  {/* canviar per total campaigns dins del deal */}
                  <td className="table-cell-center">{deal.total_campaigns}</td>
                  {/* canviar per total projects dins del deal */}
                  <td className="table-cell-center">0</td>
                  {/* canviar per deal contract value */}
                  <td className="table-cell-center">{`$${deal.contract_value}`}</td>
                  <td className="table-cell-center">
                    <span className="stage-tag green">
                      {deal.deal_stage_name}
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

export default DealTable;

{
  /* <tr key={project.id} className="table-row" onClick={() => handleOpenSidepanel(project)}>
                  <td className="table-brand-cell">
                    {creatorsData && creatorsData.length > 0 &&
                      <img
                        src={creatorsData.find((creator: { name: any; }) => creator.name === project.creator_name)?.profile_picture_url}
                        alt={project.creator_name}
                        className="partner-image"
                        width={40} height={40}
                      />
                    }
                    <img
                      src={project.creator_profile_picture}
                      alt={project.creator_name}
                      className="partner-image"
                      width={40} height={40}
                    />
                    {project.creator_name}
                  </td>
                  <td className="table-cell-center"></td> */
}
