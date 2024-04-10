import Arrow from '@/components/assets/svg/Arrow';
import React from 'react';

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

const BrandTable = ({ httpError, data, sortBy, handleOpenSidepanel }: BrandTableProps) => {
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
                    <p>Website</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content-center" onClick={() => sortBy("total_projects")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Email</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content-center" onClick={() => sortBy("contract_value")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Active Campaigns</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content" onClick={() => sortBy("contract_value")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Active Campaigns Value</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {data && data.length > 0 && data?.map((brand) => (
                <tr key={brand.id} className="table-row" onClick={() => handleOpenSidepanel(brand)}>
                  <td className="table-brand-cell">
                    <img src={brand.profile_picture} alt={brand.name} className="partner-image" />
                    {brand.name}
                  </td>
                  <td className="table-cell-center">{brand.website}</td>
                  <td className="table-cell-center">{brand.email}</td>
                  <td className="table-cell-center">{brand.active_campaigns}</td>
                  <td className="table-cell-center">{brand.active_campaigns_value}</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div >
  );
};

export default BrandTable;