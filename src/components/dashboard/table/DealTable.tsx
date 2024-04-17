import Arrow from '@/components/assets/svg/Arrow';
import React from 'react';

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

const DealTable = ({ httpError, data, sortBy, handleOpenSidepanel }: DealTableProps) => {
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
                    <p>Brand</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content" onClick={() => sortBy("campaign_name")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Deal Name</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content" onClick={() => sortBy("campaign_name")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Campaigns</p>
                  </div>
                </th>
                <th>
                  <div className="table-header-content" onClick={() => sortBy("campaign_name")}>
                    <button className="header-button">
                      <Arrow className="arrow-down" />
                    </button>
                    <p>Projects</p>
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
              {data && data.length > 0 && data?.map((deal) => (
                <tr key={deal.id} className="table-row" onClick={() => handleOpenSidepanel(deal)}>
                  
                  <td className="table-brand-cell">
                    <img
                      src={deal.brand_image_url}
                      alt={deal.brand_name}
                      className="partner-image"
                      width={40} height={40}
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
                    <span className='round-tag green'>{deal.deal_stage_name}</span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div >
  );
};

export default DealTable;


{/* <tr key={project.id} className="table-row" onClick={() => handleOpenSidepanel(project)}>
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
                  <td className="table-cell-center"></td> */}