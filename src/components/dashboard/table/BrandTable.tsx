import Arrow from "@/components/assets/svg/Arrow";
import React, { useState } from "react";
import Image from "next/image";

interface BrandTableProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[];
  sortBy: (type: string) => void;
  handleOpenSidepanel: (campaign: object) => void;
}

const BrandTable = ({
  httpError,
  data,
  sortBy,
  handleOpenSidepanel,
}: BrandTableProps) => {
  const [sortDirection, setSortDirection] = useState([
    {
      name: "name",
      isSortAsc: false,
    },
    {
      name: "website",
      isSortAsc: false,
    },
    {
      name: "email",
      isSortAsc: false,
    },
    {
      name: "active_campaigns",
      isSortAsc: false,
    },
    {
      name: "active_campaigns_value",
      isSortAsc: false,
    },
  ]);

  const handleSort = (type: string) => {
    sortBy(type);
    const newSortDirection = sortDirection.map((item: any) => {
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
                    onClick={() => handleSort("name")}
                  >
                    <Arrow
                      className={
                        findFieldAsc("name") ? "arrow-up" : "arrow-down"
                      }
                    />
                  </button>
                  <p>Name</p>
                </div>
              </th>
              <th>
                <div
                  className="table-header-content"
                  onClick={() => handleSort("website")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("website") ? "arrow-up" : "arrow-down"
                      }
                    />
                  </button>
                  <p>Website</p>
                </div>
              </th>
              <th>
                <div
                  className="table-header-content-center"
                  onClick={() => handleSort("email")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("email") ? "arrow-up" : "arrow-down"
                      }
                    />
                  </button>
                  <p>Email</p>
                </div>
              </th>
              <th>
                <div
                  className="table-header-content-center"
                  onClick={() => handleSort("active_campaigns")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("active_campaigns")
                          ? "arrow-up"
                          : "arrow-down"
                      }
                    />
                  </button>
                  <p>Active Campaigns</p>
                </div>
              </th>
              <th>
                <div
                  className="table-header-content"
                  onClick={() => handleSort("active_campaigns_value")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("active_campaigns_value")
                          ? "arrow-up"
                          : "arrow-down"
                      }
                    />
                  </button>
                  <p>Active Campaigns Value</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {data &&
              data.length > 0 &&
              data?.map((brand) => (
                <tr
                  key={brand.id}
                  className="table-row"
                  onClick={() => handleOpenSidepanel(brand)}
                >
                  <td className="table-brand-cell">
                    <Image
                      src={brand.profile_picture_url}
                      alt={brand.name}
                      width={40}
                      height={40}
                      layout="fixed"
                      className="partner-image"
                      loading="lazy"
                      quality={75}
                    /> 
                    {/* <img
                      src={brand.profile_picture_url}
                      alt={brand.name}
                      className="partner-image"
                    /> */}
                    {brand.name}
                  </td>
                  <td className="table-cell-center">{brand.website}</td>
                  <td className="table-cell-center">{brand.email}</td>
                  <td className="table-cell-center">
                    {brand.active_campaigns}
                  </td>
                  <td className="table-cell-center">
                    ${brand.active_campaigns_value}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BrandTable;
