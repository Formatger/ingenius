import React, { useEffect, useState } from "react";
import icon from '@/components/assets/icons/icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from "@/components/assets/svg/Arrow";
import HelpIcon from '../../assets/svg/Help';
import Add from "@/components/assets/icons/add.svg";
import CreatorSidepanel from "@/components/dashboard/profile/CreatorSidepanel";
import ProfilePic from "@/components/assets/images/creator.png";

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface TeamTableProps {
  teamMembers: Member[];
}

const TeamTable = ({ teamMembers }: TeamTableProps) => {

  return (
    <div className="team-table-wrap">
  
      <table className="team-table">
        <thead>
          <tr className="team-table-header">
            <th>
              <div className="table-header-content-center">
                <p>Profile</p>
              </div>
            </th>
            <th>
              <div className="table-header-content-center" onClick={undefined}>
                <p>Name</p>
              </div>
            </th>
            <th>
              <div className="table-header-content-center" onClick={undefined}>
                <p>Last Name</p>
              </div>
            </th>
            <th>
              <div className="table-header-content-center" onClick={undefined}>
                <p>Email</p>
              </div>
            </th>
          </tr>
        </thead>
  
        <tbody className="team-table-body">
          {teamMembers?.map((member) => (
            <tr className="table-row" 
            key={member.id}
            >
              <td className="team-table-cell profile">
                 <Image src={ProfilePic} alt="Icon" width={34} height={34} />
              </td>
              <td className="team-table-cell name">{member.first_name}</td>
              <td className="team-table-cell lastname">{member.last_name}</td>
              <td className="team-table-cell email">{member.email}</td>
            </tr>
          ))}

        </tbody>
      </table>
  
    </div>
  );
};

export default TeamTable;