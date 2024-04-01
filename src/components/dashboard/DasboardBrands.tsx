import React from 'react';
import icon from '@/components/assets/icons/icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from "@/components/assets/svg/Arrow";
import HelpIcon from '../assets/svg/Help';
import Add from "@/components/assets/icons/add.svg";

// const sortBy = (field: keyof typeof revenueCampaigns[0]) => {
//   // Sort by specified field
//   const revenueCampaignsCopy = [...revenueCampaigns];
//   if (field === "total_projects" || field === "contract_value") {
//     revenueCampaignsCopy.sort((a, b) => a[field] - b[field]);
//     if (JSON.stringify(revenueCampaignsCopy) === JSON.stringify(revenueCampaigns)) {
//       // Already sorted in ascending order, so sort in descending order
//       revenueCampaignsCopy.sort((a, b) => b[field] - a[field]);
//     }
//   } else {
//     revenueCampaignsCopy.sort((a, b) => (a[field] as string)?.localeCompare(b[field] as string));
//     if (JSON.stringify(revenueCampaignsCopy) === JSON.stringify(revenueCampaigns)) {
//       // Already sorted in ascending order, so sort in descending order
//       revenueCampaignsCopy.sort((a, b) => (b[field] as string)?.localeCompare(a[field] as string));
//     }
//   }
//   setRevenueCampaigns(revenueCampaignsCopy);
//   setNoSlicedData(revenueCampaignsCopy);
//   setData(revenueCampaignsCopy.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   ));
// };

const DashboardBrands = () => {
  return (
      <div className="dashboard-box">
        <div className="row-between">
          <h2 className="dashboard-brands-title">Brands & Clients</h2>
          <HelpIcon />
        </div>

          <table className="app-table" id="dashboard-table">
              <thead>
                <tr className="table-header">
                  <th>
                    <div className="table-header-content">
                      <p>Name</p>
                      <button className="header-button" onClick={undefined}>
                        <Arrow className="gray-fill arrow-down" />
                      </button>
                    </div>
                  </th>
                  <th>
                    <div className="table-header-content-center" onClick={undefined}>
                      <p>Earliest Due</p>
                      <button className="header-button">
                        <Arrow className="gray-fill arrow-down" />
                      </button>
                    </div>
                  </th>
                  <th>
                    <div className="table-header-content-center" onClick={undefined}>
                      <p>Unpaid</p>
                      <button className="header-button">
                        <Arrow className="gray-fill arrow-down" />
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              {/* <tbody className="table-body">
                {data.map((brands) => (
                  <tr className="table-row" onClick={undefined}
                  key={brands.id} 
                  >
                    <td className="table-cell">
                      <div className='row-wrap'>
                        <input type="checkbox" className='checkbox'></input>
                        <p>Yeti Cycles</p>
                      </div>
                    </td>

                    <td className="table-cell">12/30/2023</td>
                    <td className="table-cell-center">$12,342</td>
                  </tr>
                ))}
              </tbody> */}

              <tbody className="table-body">

                  <tr className="table-row" onClick={undefined}>
                    <td className="table-cell">
                      <div className='row-wrap'>
                        <p>Yeti Cycles</p>
                      </div>
                    </td>
                    <td className="table-cell-center">12/30/2023</td>
                    <td className="table-cell-center">$12,342</td>
                  </tr>


                  <tr className="table-row" onClick={undefined}>
                    <td className="table-cell">
                      <div className='row-wrap'>
                        <p>Yeti Cycles</p>
                      </div>
                    </td>
                    <td className="table-cell-center">12/30/2023</td>
                    <td className="table-cell-center">$12,342</td>
                  </tr>

                  <tr className="table-row" onClick={undefined}>
                    <td className="table-cell">
                      <div className='row-wrap'>
                        <p>Yeti Cycles</p>
                      </div>
                    </td>
                    <td className="table-cell-center">12/30/2023</td>
                    <td className="table-cell-center">$12,342</td>
                  </tr>

                  <tr className="table-row" onClick={undefined}>
                    <td className="table-cell">
                      <div className='row-wrap'>
                        <p>Yeti Cycles</p>
                      </div>
                    </td>
                    <td className="table-cell-center">12/30/2023</td>
                    <td className="table-cell-center">$12,342</td>
                  </tr>




              </tbody>
              
            </table>

        <button className="app-button" onClick={undefined}>
          <Image src={Add} alt="Icon" width={20} height={20} />
          <p>Add New</p>
        </button>
      </div>

  );
};

export default DashboardBrands;