import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import withAuth from "@/components/common/WithAuth";
import Sidebar from "@/components/navigation/Sidebar";
import { Arrow } from "@/components/assets/svg/Arrow";
import { getBrandsDetail } from "@/utils/httpCalls";
import Folder from "@/components/assets/icons/folder.svg";
import { BrandDetails } from "@/components/dashboard/profile/BrandProfile";
import MainLoader from "@/components/common/Loader";

const BrandProfilePage = () => {
  const router = useRouter()
  const { brandId } = router.query;

  const [loader, setLoader] = useState<boolean>(false);
  const [brandsData, setBrandsData] = useState({});

  useEffect(() => { fetchData() }, [router]);

  const fetchData = () => {
    setLoader(true);
    Promise.all([
      getBrandsDetail(
        (response: any) => {
          const brand = response.find((brand: any) => brand.id === parseInt(brandId as string))
          setBrandsData(brand);
        },
        (error: any) => {
          console.error('Error fetching data:', error);
        }
      )]).finally(() => {
        setLoader(false)
      });
  };

  return (
    <div className="main-container">
      <div className="breadcrumb-nav profile">
        <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/clients/brands/' }}>
          <Arrow className="arrow-left orange-fill" />
          {`View Brands`}
        </Link>
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="">
            <div className="profile-container">
              <div>
               <BrandDetails brandsData={brandsData} />

            </div>
           </div>
          </div>
        </>
      )}
    </div>
  );
};

const BrandProfile = () => {
  return <Sidebar layout={<BrandProfilePage />} />;
};

export default withAuth(BrandProfile);
