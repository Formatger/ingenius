import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "@/components/common/WithAuth";
import Sidebar from "@/components/navigation/Sidebar";
import { DealDetails, DealInvoice } from "@/components/dashboard/profile/DealProfile";
import { Arrow } from "@/components/assets/svg/Arrow";
import { getDealsDetail } from "@/utils/httpCalls";
import MainLoader from "@/components/common/Loader";

const DealProfilePage = () => {
  const router = useRouter()
  const { dealId } = router.query;

  const [loader, setLoader] = useState<boolean>(false);
  const [dealsData, setDealsData] = useState({});
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => { fetchDealsData() }, [router]);
  useEffect(() => {
    if (refreshData) {
      fetchDealsData();
      setRefreshData(false);
    }
  }, [refreshData]);

  const fetchDealsData = () => {
    setLoader(true);
    Promise.all([
      getDealsDetail(
        (response: any) => {
          const deal = response.find((deal: any) => deal.id === parseInt(dealId as string))
          setDealsData(deal);
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
        <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/partnerships/deals/' }}>
          <Arrow className="arrow-left orange-fill" />
          {`Deals`}
        </Link>
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="">
            <div className="profile-container">
              <div>
                <DealDetails dealsData={dealsData} />
              </div>
              <div>
                <DealInvoice dealsData={dealsData} setRefreshData={setRefreshData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const DealProfile = () => {
  return <Sidebar layout={<DealProfilePage />} />;
};

export default withAuth(DealProfile);
