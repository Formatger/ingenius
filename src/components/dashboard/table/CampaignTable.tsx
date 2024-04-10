import Arrow from '@/components/assets/svg/Arrow';
import React from 'react';

interface CampaignTableProps {
  httpError: {
    hasError: boolean;
    status: number;
    message: string;
  };
  data: any[];
  sortBy: (type: string) => void;
  handleOpenSidepanel: (campaign: object) => void;
}

const CampaignTable = ({ httpError, data, sortBy, handleOpenSidepanel }: CampaignTableProps) => {
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
                <th>
                  <div className="table-header-content" onClick={() => sortBy("contract_value")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Label</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {data && data.length > 0 && data?.map((campaign) => (
                <tr key={campaign.id} className="table-row" onClick={() => handleOpenSidepanel(campaign)}>
                  <td className="table-brand-cell">
                    <img src={campaign.brand_image_url} alt={campaign.brand_name} className="partner-image" />
                    {campaign.brand_name}
                  </td>
                  <td className="table-cell"><span className="round-tag linen">{campaign.campaign_name || campaign.name}</span> </td>
                  <td className="table-cell-center">{campaign.total_projects}</td>
                  <td className="table-cell-center">{`$${campaign.contract_value}`}</td>
                  <td className="table-cell-center">
                    <span className='round-tag green'>{campaign.campaign_stage}</span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div >
  );
};

export default CampaignTable;