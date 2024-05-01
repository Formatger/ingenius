import React, { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from "@/components/assets/svg/Arrow";
import HelpIcon from '../../assets/svg/Help';

interface DashboardBrandsProps {
  campaignsData: any;
}

const DashboardBrands = ({ campaignsData }: DashboardBrandsProps) => {

  return (
    <div className="dashboard-box tables">
      <div className="row-between">
        <h2 className="dashboard-title">Client Invoices</h2>
      </div>

      <table className="app-table" id="dashboard-table">
        <thead>
          <tr className="table-header">
            <th>
              <div className="table-header-content">
                <p>Invoice</p>
                <button className="header-button" onClick={undefined}>
                  <Arrow className="gray-fill arrow-down" />
                </button>
              </div>
            </th>
            <th>
              <div className="table-header-content-center" onClick={undefined}>
                <p>Status</p>
                <button className="header-button">
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
                <p>Amount</p>
                <button className="header-button">
                  <Arrow className="gray-fill arrow-down" />
                </button>
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {campaignsData?.map((campaign: any) => (
            <tr className="table-row" key={campaign.id}>
              <td className="table-cell">
                <Link
                  href={{
                    pathname: '/dashboard/partnerships/campaigns/profile',
                    query: { campaignId: campaign.id }
                  }}
                  passHref
                >
                  <div className="row-wrap-3">

                    <div className="">
                    {/* <Image
                      src={campaign.brand_image_url}
                      alt={campaign.brand_name}
                      width={40}
                      height={40}
                      layout="fixed"
                      className="partner-image"
                      loading="lazy"
                      quality={75}
                    />  */}
                      <img
                        src={campaign.brand_image_url}
                        alt={campaign.brand_name}
                        className="partner-image"
                        width={40}
                        height={40}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="track-title">{campaign.brand_name}</p>
                      <p className="track-subtitle">{campaign.name}</p>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="table-cell-center">
              <Link href={{ pathname: '/dashboard/partnerships/campaigns/profile', query: { campaignId: campaign.id }}} passHref>
                <span className={`status-tag ${campaign.invoice_paid ? 'green' : 'pink'}`}>
                  {campaign.invoice_paid ? 'Paid' : 'Unpaid'}
                </span>
                </Link>
              </td>
              <td className="table-cell-center">
              <Link href={{ pathname: '/dashboard/partnerships/campaigns/profile', query: { campaignId: campaign.id }}} passHref>
                {campaign.deadline}
                </Link>
                </td>
              <td className="table-cell-center">
              <Link href={{ pathname: '/dashboard/partnerships/campaigns/profile', query: { campaignId: campaign.id }}} passHref>
                ${campaign.contract_value}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardBrands;