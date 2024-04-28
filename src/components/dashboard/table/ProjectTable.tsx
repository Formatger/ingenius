import Arrow from "@/components/assets/svg/Arrow";
import { profile } from "console";
import React, { useState } from "react";
import Image from "next/image";

interface ProjectTableProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[];
  sortBy: (type: string) => void;
  handleOpenSidepanel: (project: object) => void;
}

const ProjectTable = ({
  httpError,
  data,
  sortBy,
  handleOpenSidepanel,
}: ProjectTableProps) => {
  const [sortDirection, setSortDirection] = useState([
    {
      name: "creator_name",
      isSortAsc: false,
    },
    {
      name: "name",
      isSortAsc: false,
    },
    {
      name: "campaign_name",
      isSortAsc: false,
    },
    {
      name: "brand_name",
      isSortAsc: false,
    },
    {
      name: "contract_value",
      isSortAsc: false,
    },
    {
      name: "project_stage_name",
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
                    onClick={() => handleSort("creator_name")}
                  >
                    <Arrow
                      className={
                        findFieldAsc("creator_name") ? "arrow-up" : "arrow-down"
                      }
                    />
                  </button>
                  <p>Creator</p>
                </div>
              </th>
              <th>
                <div
                  className="table-header-content"
                  onClick={() => handleSort("name")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("name") ? "arrow-up" : "arrow-down"
                      }
                    />
                  </button>
                  <p>Project</p>
                </div>
              </th>
              <th>
                <div
                  className="table-header-content"
                  onClick={() => handleSort("campaign_name")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("campaign_name")
                          ? "arrow-up"
                          : "arrow-down"
                      }
                    />
                  </button>
                  <p>Campaign</p>
                </div>
              </th>
              <th>
                <div
                  className="table-header-content"
                  onClick={() => handleSort("brand_name")}
                >
                  <button className="header-button">
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
                <div
                  className="table-header-content-center"
                  onClick={() => handleSort("contract_value")}
                >
                  <button className="header-button">
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
                <div
                  className="table-header-content"
                  onClick={() => handleSort("project_stage_name")}
                >
                  <button className="header-button">
                    <Arrow
                      className={
                        findFieldAsc("project_stage_name")
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
              data?.map((project) => (
                <tr
                  key={project.id}
                  className="table-row"
                  onClick={() => handleOpenSidepanel(project)}
                >
                  <td className="table-brand-cell">
                    <Image
                      src={project.creator_profile_picture}
                      alt={project.creator_name}
                      width={40}
                      height={40}
                      layout="fixed"
                      className="partner-image"
                      loading="lazy"
                      quality={75}
                    /> 
                    {/* <img
                      src={project.creator_profile_picture}
                      alt={project.creator_name}
                      className="partner-image"
                      width={40}
                      height={40}
                    /> */}
                    {project.creator_name}
                  </td>
                  <td className="table-cell">
                    <span>{project.name}</span>
                  </td>
                  <td className="table-cell">
                    <span className="round-tag linen">
                      {project.campaign_name}
                    </span>{" "}
                  </td>
                  <td className="table-brand-cell">
                    <Image
                        src={project.brand_image_url}
                        alt={project.brand_name}
                        width={40}
                        height={40}
                        layout="fixed"
                        className="partner-image"
                        loading="lazy"
                        quality={75}
                      /> 
                    {/* <img
                      src={project.brand_image_url}
                      alt={project.brand_name}
                      className="partner-image"
                    /> */}
                    {project.brand_name}
                  </td>
                  <td className="table-cell-center">{`$${project.contract_value}`}</td>
                  <td className="table-cell-center">
                    <span className="stage-tag green">
                      {project.project_stage_name}
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

export default ProjectTable;
