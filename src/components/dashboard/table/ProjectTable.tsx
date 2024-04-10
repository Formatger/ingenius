import Arrow from '@/components/assets/svg/Arrow';
import { profile } from 'console';
import React from 'react';

interface ProjectTableProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[];
  creatorsData: any[];
  sortBy: (type: string) => void;
  handleOpenSidepanel: (campaign: object) => void;
}

const ProjectTable = ({ httpError, data, sortBy, handleOpenSidepanel, creatorsData }: ProjectTableProps) => {
  return (
    <div className="table-container">
      {httpError.hasError ? (
        <div className="error-message">
          Error: {httpError.status} - {httpError.message}
        </div>
      )
        : (
          <table className="app-table">
            <thead>
              <tr className="table-header">
                <th>
                  <div className="table-header-content">
                    <button className="header-button" onClick={() => sortBy("creator_name")}>
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Creator</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content" onClick={() => sortBy("name")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Project</p>
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
                  <div className="table-header-content" onClick={() => sortBy("campaign_name")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Brand</p>
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
                <th>
                  <div className="table-header-content" onClick={() => sortBy("label")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Label</p>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="table-body">
              {data && data.length > 0 && data?.map((project) => (
                <tr key={project.id} className="table-row" onClick={() => handleOpenSidepanel(project)}>
                  <td className="table-brand-cell">
                    <img
                      src={project.creator_profile_picture}
                      alt={project.creator_name}
                      className="partner-image"
                      width={40} height={40}
                    />
                    {project.creator_name}
                  </td>
                  <td className="table-cell-center">
                    <span >{project.name}</span>
                  </td>
                  <td className="table-cell"><span className="round-tag linen">{project.campaign_name}</span> </td>
                  <td className="table-brand-cell">
                    <img src={project.brand_image_url} alt={project.brand_name} className="partner-image" />
                    {project.brand_name}
                  </td>
                  <td className="table-cell-center">{`$${project.contract_value}`}</td>
                  <td className="table-cell-center">
                    <span className='round-tag green'>{project.project_stage}</span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div >
  );
};

export default ProjectTable;

