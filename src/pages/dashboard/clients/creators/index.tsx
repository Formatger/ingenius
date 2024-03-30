import React, { useEffect, useState } from "react";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Icon from "@/components/assets/icons/icon.svg";
import Img from "@/components/assets/images/image.png";
import Image from "next/image";
import withAuth from "@/components/common/WithAuth";

const CreatorsPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

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

const Creators = () => {
  return <Sidebar layout={<CreatorsPage />} />;
};

export default withAuth(Creators);
