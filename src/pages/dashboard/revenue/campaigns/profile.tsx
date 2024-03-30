import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "@/components/common/WithAuth";
import Sidebar from "@/components/navigation/Sidebar";
import { CampaignsDetails, CampaignsInvoice } from "@/components/revenue/campaigns/campaigns";
import { Arrow } from "@/components/assets/svg/Arrow";
import { getCampaignsDetail } from "@/utils/httpCalls";

const RevenueCampaignsPage = () => {
  const router = useRouter()
  const { campaignId } = router.query;

  const [loader, setLoader] = useState<boolean>(false);
  // const [invoiceData, setInvoiceData] = useState(null);
  const [campaignData, setCampaignData] = useState({});

  useEffect(() => { fetchData() }, [router]);

  const fetchData = () => {
    setLoader(true);
    Promise.all([
      getCampaignsDetail(
        (response: any) => {
          const campaign = response.find((campaign: any) => campaign.id === parseInt(campaignId as string))
          setCampaignData(campaign);
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
        <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/revenue/campaigns/' }}>
          <Arrow className="arrow-left orange-fill" />
          {`Profile`}
        </Link>
      </div>
      {loader ? (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      ) : (
        <>
          <div className="page-container" id="">
            <div className="profile-container">
              <div>
                <CampaignsDetails campaignData={campaignData} />
              </div>
              <div>
                <CampaignsInvoice campaignData={campaignData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const RevenueCampaigns = () => {
  return <Sidebar layout={<RevenueCampaignsPage />} />;
};

export default withAuth(RevenueCampaigns);
