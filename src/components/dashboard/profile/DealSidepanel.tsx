import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DealDetails } from "@/components/dashboard/profile/DealProfile";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import Sidepanel from '../../common/ProfileSidepanel';

type SidepanelProps = {
  open: boolean;
  dealsData: any;
  setSelectedDeal: any;
  setOpenSidepanel: any;
}

const DealSidepanel: React.FC<SidepanelProps> = ({ 
  dealsData, 
  setSelectedDeal, 
  setOpenSidepanel }) => {

  const handleClose = () => {
    setSelectedDeal(null);
    setOpenSidepanel(false);
  };

  return (
    <Sidepanel handleClose={handleClose}>
      <div className='sidepanel-header'>
        <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/partnerships/deals/profile', 
        query: { dealId: dealsData.id } }}>
          <Arrow className="arrow-left orange-fill" />
          {`Deal Profile`}
        </Link>
        <div className='button-group'>
           <Link href="/dashboard/support" passHref>
              <button className="sidepanel-button-style">
                <HelpIcon />
                Get help
              </button>
            </Link>
          {/* <button className='sidepanel-button'>
            <Image src={Edit} alt='' width={16} height={16} />
            Edit
          </button> */}
        </div>
      </div>
      <div className='sidepanel-wrap-space'>
        <DealDetails dealsData={dealsData} />

        <div className="card-container">
            <p className="smallcaps">MANAGE DEAL</p>
            <div className="button-group">
              <button className="sec-button linen" onClick={undefined}>
              {/* <button className="sec-button linen" onClick={() => setEditProject(true)}> */}
                <p>Edit</p>
              </button>
              <button className="sec-button stone" onClick={undefined}>
              {/* <button className="sec-button stone" onClick={() => setModalOpen(true)}> */}
                <p>Delete</p>
              </button>
            </div>
{/*             
            <ConfirmModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              title="Delete Project"
              onConfirm={handleDelete}
              message="Are you sure you want to delete this project?"
            /> */}
          </div>

      </div>
    </Sidepanel>
  );
};

export default DealSidepanel;