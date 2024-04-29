import Arrow from "@/components/assets/svg/Arrow";
import React, { useState } from "react";
import Image from "next/image";

interface CreatorTableProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[];
  sortBy: (type: string) => void;
  handleOpenSidepanel: (campaign: object) => void;
}

const CreatorTable = ({
  httpError,
  data,
  sortBy,
  handleOpenSidepanel,
}: CreatorTableProps) => {
  const [sortDirection, setSortDirection] = useState([
    {
      name: "name",
      isSortAsc: false,
    },
    {
      name: "email",
      isSortAsc: false,
    },
    {
      name: "niche",
      isSortAsc: false,
    },
    {
      name: "active_projects",
      isSortAsc: false,
    },
    {
      name: "active_projects_value",
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
                  onClick={() => handleSort("email")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("email") ? "arrow-up" : "arrow-down"
                      }
                    />{" "}
                  </button>
                  <p>Email</p>
                </div>
              </th>
              <th>
                <div
                  className="table-header-content-center"
                  onClick={() => handleSort("niche")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("niche") ? "arrow-up" : "arrow-down"
                      }
                    />{" "}
                  </button>
                  <p>Niche</p>
                </div>
              </th>
              <th>
                <div
                  className="table-header-content-center"
                  onClick={() => handleSort("active_projects")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("active_projects")
                          ? "arrow-up"
                          : "arrow-down"
                      }
                    />{" "}
                  </button>
                  <p>Active Projects</p>
                </div>
              </th>
              <th>
                <div
                  className="table-header-content"
                  onClick={() => handleSort("active_projects_value")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("active_projects_value")
                          ? "arrow-up"
                          : "arrow-down"
                      }
                    />{" "}
                  </button>
                  <p>Active Projects Value</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {data &&
              data.length > 0 &&
              data?.map((creator) => (
                <tr
                  key={creator.id}
                  className="table-row"
                  onClick={() => handleOpenSidepanel(creator)}
                >
                  <td className="table-brand-cell">
                    {/* <Image
                      src={creator.profile_picture_url}
                      alt={creator.name}
                      width={40}
                      height={40}
                      layout="fixed"
                      className="partner-image"
                      loading="lazy"
                      quality={75}
                    />  */}
                    <img
                      src={creator.profile_picture_url}
                      alt={creator.name}
                      className="partner-image"
                      loading="lazy"
                    />
                    {creator.name}
                  </td>
                  <td className="table-cell-center">{creator.email}</td>
                  <td className="table-cell-center">{creator.niche}</td>
                  <td className="table-cell-center">
                    {creator.active_projects}
                  </td>
                  <td className="table-cell-center">
                    ${creator.active_projects_value}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CreatorTable;
