import React, { useEffect, useState } from "react";
import icon from '@/components/assets/icons/icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from "@/components/assets/svg/Arrow";
import HelpIcon from '../../assets/svg/Help';
import Add from "@/components/assets/icons/add.svg";
import CreatorSidepanel from "@/components/dashboard/profile/CreatorSidepanel";
import ProfilePic from "@/components/assets/images/creator.png";

interface DashboardCreatorsProps {
  projectsData: any;
}

const DashboardCreators = ({ projectsData }: DashboardCreatorsProps) => {
  
  return (
    <div className="dashboard-box tables">
      <div className="row-between">
        <h2 className="dashboard-title">Contractor Invoices</h2>
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
          {projectsData?.map((project: any) => (
            <tr className="table-row" key={project.id}>
              <td className="table-cell">
                <Link
                  href={{
                    pathname: '/dashboard/partnerships/projects/profile',
                    query: { projectId: project.id }
                  }}
                  passHref
                >
                  <div className="row-wrap-3">

                    <div className="">
                    {/* <Image
                      src={project.creator_profile_picture}
                      alt={project.creator_name}
                      width={40}
                      height={40}
                      layout="fixed"
                      className="partner-image"
                      loading="lazy"
                      quality={75}
                    />  */}
                      <img
                        src={project.creator_profile_picture}
                        alt={project.creator_name}
                        className="partner-image"
                        width={40}
                        height={40}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="track-title">{project.creator_name}</p>
                      <p className="track-subtitle">{project.name}</p>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="table-cell-center">
              <Link href={{ pathname: '/dashboard/partnerships/projects/profile', query: { projectId: project.id }}} passHref>
                <span className={`status-tag ${project.invoice_paid ? 'green' : 'pink'}`}>
                  {project.invoice_paid ? 'Paid' : 'Unpaid'}
                </span>
                </Link>
              </td>
              <td className="table-cell-center">
              <Link href={{ pathname: '/dashboard/partnerships/projects/profile', query: { projectId: project.id }}} passHref>
                {project.deadline}
                </Link>
                </td>
              <td className="table-cell-center">
              <Link href={{ pathname: '/dashboard/partnerships/projects/profile', query: { projectId: project.id }}} passHref>
                ${project.contract_value}
                </Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default DashboardCreators;