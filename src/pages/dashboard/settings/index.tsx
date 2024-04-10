import React, { useEffect, useState } from "react";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Icon from "@/components/assets/icons/icon.svg";
import Img from "@/components/assets/images/image.png";
import Image from "next/image";
import { Arrow } from "@/components/assets/svg/Arrow";
import withAuth from "@/components/common/WithAuth";
import { useRouter } from "next/router";
import Add from "@/components/assets/icons/add.svg";
import PlusBlue from "@/components/assets/icons/plus-blue.svg";
import Table from "@/components/assets/icons/table.svg";
import Kanban from "@/components/assets/icons/kanban.svg";
import Edit from "@/components/assets/icons/edit.svg";
import Plus from "@/components/assets/icons/plus.svg";
import PlusWhite from "@/components/assets/icons/plus-white.svg";
import AddFieldModal from "@/components/dashboard/kanban/AddFieldModal";

const SettingsPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const breadcrumbLinks = [
    { label: "Settings", link: "/dashboard/settings"  },
    { label: "My Account", link: "/dashboard/settings" },
  ];


  return (
    <div className="main-container">
      <div>
        <Breadcrumbs items={breadcrumbLinks} />
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="dashboard">
          <button className="app-button" onClick={() => {
          localStorage.clear();
          router.push('/auth');
          }} aria-label="Close" type="button">
          Logout</button>

            {/* <div className="dashboard-box mt-4">

              <div>
                <button className="app-button" 
                onClick={() => setIsModalOpen(true)}>
                  <Image src={PlusWhite} alt="Icon" width={16} height={16} />
                    Add Field
                </button>
                <AddFieldModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
                   title="Add Field">
                </AddFieldModal>
              </div>


              <p className="">Hello</p>

                <button className="sec-button linen" onClick={undefined}>
                  button
                </button>
                <button className="app-button mt-3" onClick={undefined}>
                  <Image src={Add} alt="Icon" width={20} height={20} />
                  <p>Add New</p>
                </button>
                <button className="app-button" onClick={undefined}>
                <Image src={PlusWhite} alt="Icon" width={16} height={16} />
                  Add Deal
                </button>
                <button className="app-button cream" onClick={undefined}>
                  CSV Upload
                </button>

              <div className="row-wrap">
                <span className="square-tag light-blue">Square Tag</span>

                <span className="square-tag green">Due: 03/25/2024</span>

                <span className="square-tag blue">
                  <Image src={PlusBlue} alt="Icon" width={12} height={12} />
                  Add Campaign
                </span>

                <span className="square-tag ivory">Due: 03/25/2024</span>

                <span className="square-tag pink">Due: 03/25/2024</span>
              </div>

              <span className="round-tag pink">Round Tag</span>

              <Image src={Table} alt="Icon" width={16} height={16} className="icon" />
              <Image src={Kanban} alt="Icon" width={16} height={16} className="image" />
              <Image src={Edit} alt="Icon" width={16} height={16} className="image" />
              <Image src={Plus} alt="Icon" width={16} height={16} className="image" />

              <Arrow />
              <Arrow className="arrow-down" />
              <Arrow className="arrow-right" />
              <Arrow className="arrow-left" />

              <Arrow className="gray-fill" />
              <Arrow className="arrow-down gray-fill" />
              <Arrow className="arrow-right gray-fill" />
              <Arrow className="arrow-left gray-fill" />

              <Arrow className="arrow-left orange-fill" />
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

const Settings = () => {
  return <Sidebar layout={<SettingsPage />} />;
};

export default withAuth(Settings);
