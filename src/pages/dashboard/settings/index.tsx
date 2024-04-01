import React, { useEffect, useState } from "react";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Icon from "@/components/assets/icons/icon.svg";
import Img from "@/components/assets/images/image.png";
import Image from "next/image";
import { Arrow } from "@/components/assets/svg/Arrow";
import withAuth from "@/components/common/WithAuth";
import { useRouter } from "next/router";

const SettingsPage = () => {
  const router = useRouter();
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
          <button className="app-button" onClick={() => {
          localStorage.clear();
          router.push('/auth');
        }} aria-label="Close" type="button">
          Logout</button>
            <div className="column-wrap">
              <div className="">
                {/* <Component1 /> */}
              </div>
              <div className="">
                {/* <Component2 /> */}
              </div>
            </div>

            {/* <div className="box">

              <p className="">Hello</p>

                <button className="sec-button" onClick={undefined}>
                  button
                </button>
                <button className="app-button" onClick={undefined}>
                  button
                </button>

              <div className="row-wrap">
                <span className="square-tag light-blue">Square Tag</span>
                <span className="square-tag green">Square Tag</span>
                <span className="square-tag blue">Square Tag</span>
                <span className="square-tag ivory">Square Tag</span>
                <span className="square-tag pink">Square Tag</span>
              </div>

              <span className="round-tag">Round Tag</span>

              <Image src={Icon} alt="Icon" width={24} height={24} className="icon" />
              <Image src={Img} alt="Icon" width={100} height={100} className="image" />

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
