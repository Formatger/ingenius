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
import SupportForm from "@/components/common/SupportForm";

const SettingsPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  
  const breadcrumbLinks = [
    { label: "Settings", link: "/dashboard/support"  },
    { label: "Help & Support", link: "/dashboard/support" },
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
                <SupportForm
                title="Submit your feedback or ticket"
                />
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
