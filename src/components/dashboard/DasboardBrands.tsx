import React from 'react';
import icon from '@/components/assets/icons/icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from "@/components/assets/svg/Arrow";
import HelpIcon from '../assets/svg/Help';
import Add from "@/components/assets/icons/add.svg";

const DashboardBrands = () => {
  return (
      <div className="box-container">
        <div className="section-header">
          <h2 className="">Brands & Clients</h2>
          <HelpIcon />
        </div>

        <div className="overflow-x-auto">
          <table className="" id="dash-brands">
            <thead>
              <tr className="text-left">

                <th className="row-wrap-2">
                  <p>Name</p>
                  <Arrow className='arrow-down'/>
                </th>

              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>

        <button className="app-button" onClick={undefined}>
          <Image src={Add} alt="Icon" width={20} height={20} />
          <p>Add New</p>
        </button>
      </div>

  );
};

export default DashboardBrands;