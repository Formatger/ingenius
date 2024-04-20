import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import withAuth from "@/components/common/WithAuth";
import Sidebar from "@/components/navigation/Sidebar";
import { Arrow } from "@/components/assets/svg/Arrow";
import { getCreatorsDetail } from "@/utils/httpCalls";
import Folder from "@/components/assets/icons/folder.svg";
import { CreatorDetails } from "@/components/dashboard/profile/CreatorProfile";
import MainLoader from "@/components/common/Loader";

const CreatorProfilePage = () => {
  const router = useRouter()
  const { creatorId } = router.query;

  const [loader, setLoader] = useState<boolean>(false);
  const [creatorsData, setCreatorsData] = useState({});

  useEffect(() => { fetchData() }, [router]);

  const fetchData = () => {
    setLoader(true);
    Promise.all([
      getCreatorsDetail(
        (response: any) => {
          const creator = response.find((creator: any) => creator.id === parseInt(creatorId as string))
          setCreatorsData(creator);
        },
        (error: any) => {
          console.error('Error fetching invoice data:', error);
        }
      )]).finally(() => {
        setLoader(false)
      });
  };

  return (
    <div className="main-container">
      <div className="breadcrumb-nav profile">
        <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/clients/creators/' }}>
          <Arrow className="arrow-left orange-fill" />
          {`View Creators`}
        </Link>
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="">
            <div className="profile-container">
              <div>
               <CreatorDetails creatorsData={creatorsData} />

            </div>
           </div>
          </div>
        </>
      )}
    </div>
  );
};

const CreatorProfile = () => {
  return <Sidebar layout={<CreatorProfilePage />} />;
};

export default withAuth(CreatorProfile);
