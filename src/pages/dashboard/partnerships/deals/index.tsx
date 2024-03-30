import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Icon from "@/components/assets/icons/icon.svg";
import Img from "@/components/assets/images/image.png";
import Image from "next/image";
import Dropdown from "@/components/common/Dropdown";
import withAuth from "@/components/common/WithAuth";

const DealsPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard", current: false },
    { label: "Partnerships", link: "/dashboard/partnerships", current: false },
    { label: "Deals", link: "/dashboard/partnerships/deals", current: true },
  ];

  return (
    <div className="main-container">
      <div>
        {/* <Breadcrumbs items={breadcrumbItems} /> */}
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="dashboard">
            <div className="column-wrap">
              <div className="">
                {/* <Component1 /> */}
              </div>
              <div className="">
                {/* <Component2 /> */}
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

const Deals = () => {
  return <Sidebar layout={<DealsPage />} />;
};

export default withAuth(Deals);
