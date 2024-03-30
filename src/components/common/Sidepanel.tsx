import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CampaignsDetails } from "@/components/revenue/campaigns/campaigns";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";

type SidepanelProps = {
  open: boolean;
  campaignData: any;
  // children: React.ReactNode;
}

const Sidepanel: React.FC<SidepanelProps> = ({ open, campaignData }) => {

  return (
    <div className='sidepanel-container' id="sidepanel">

      <div className='sidepanel-header'>
        <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/revenue/campaigns/profile', query: { campaignId: campaignData.id } }}>
          <Arrow className="arrow-left orange-fill" />
          {`Profile`}
        </Link>
        <div className='button-group'>
          <button className='sidepanel-button'>
            <HelpIcon />
            Get help
          </button>
          <button className='sidepanel-button'>
            <Image src={Edit} alt='' width={16} height={16} />
            Edit
          </button>
        </div>
      </div>
      <div className='sidepanel-wrap'>
        <CampaignsDetails campaignData={campaignData} />
      </div>
    </div>
  );
};

export default Sidepanel;