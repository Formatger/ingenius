import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "@/components/common/WithAuth";
import Sidebar from "@/components/navigation/Sidebar";
import { CampaignDetails, CampaignInvoice } from "@/components/dashboard/profile/CampaignProfile";
import { Arrow } from "@/components/assets/svg/Arrow";
import { getCampaignsDetail } from "@/utils/httpCalls";
import MainLoader from "@/components/common/Loader";

const CampaignProfilePage = () => {
  const router = useRouter()
  const { campaignId } = router.query;

  const [loader, setLoader] = useState<boolean>(false);
  // const [invoiceData, setInvoiceData] = useState(null);
  const [campaignsData, setCampaignsData] = useState({});

  useEffect(() => { fetchCampaignsData() }, [router]);

  const fetchCampaignsData = () => {
    setLoader(true);
    Promise.all([
      getCampaignsDetail(
        (response: any) => {
          const campaign = response.find((campaign: any) => campaign.id === parseInt(campaignId as string))
          setCampaignsData(campaign);
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
        <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/partnerships/campaigns/' }}>
          <Arrow className="arrow-left orange-fill" />
          {`Campaigns`}
        </Link>
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="">
            <div className="profile-container">
              <div>
                <CampaignDetails campaignsData={campaignsData} />
              </div>
              <div>
                <CampaignInvoice campaignsData={campaignsData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const CampaignProfile = () => {
  return <Sidebar layout={<CampaignProfilePage />} />;
};

export default withAuth(CampaignProfile);
