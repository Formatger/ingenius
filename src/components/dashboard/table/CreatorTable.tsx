import Arrow from '@/components/assets/svg/Arrow';
import React from 'react';

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

const CreatorTable = ({ httpError, data, sortBy, handleOpenSidepanel }: CreatorTableProps) => {
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
                    <button className="header-button" onClick={() => sortBy("brand_name")}>
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Name</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content" onClick={() => sortBy("campaign_name")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Email</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content-center" onClick={() => sortBy("total_projects")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Niche</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content-center" onClick={() => sortBy("contract_value")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Active Projects</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content" onClick={() => sortBy("contract_value")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Active Projects Value</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {data && data.length > 0 && data?.map((creator) => (
                <tr key={creator.id} className="table-row" onClick={() => handleOpenSidepanel(creator)}>
                  <td className="table-brand-cell">
                    <img src={creator.profile_picture} alt={creator.name} className="partner-image" />
                    {creator.name}
                  </td>
                  <td className="table-cell-center">{creator.email}</td>
                  <td className="table-cell-center">{creator.niche}</td>
                  <td className="table-cell-center">{creator.active_projects}</td>
                  <td className="table-cell-center">${creator.active_projects_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div >
  );
};

export default CreatorTable;