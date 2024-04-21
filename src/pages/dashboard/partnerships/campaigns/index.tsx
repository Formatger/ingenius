import React, { Fragment, useEffect, useState } from "react";
import { getBrands, getCampaignStages, getCampaigns, getCampaignsDetail, getDeals } from "@/utils/httpCalls";
import withAuth from "@/components/common/WithAuth";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Image from "next/image";
import PlusWhite from "@/components/assets/icons/plus-white.svg";
import Kanban from "@/components/assets/icons/kanban.svg";
import Table from "@/components/assets/icons/table.svg";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/dashboard/table/Pagination";
import { useWindowSize } from "@/utils/hooks/useWindowSize";
import { transformDate } from "@/utils/dateManager";
import { CampaignInterface } from "@/interfaces/interfaces";
import CampaignTable from "@/components/dashboard/table/CampaignTable";
import CampaignKanban from "@/components/dashboard/kanban/CampaignKanban";
import CampaignSidepanel from "@/components/dashboard/profile/CampaignSidepanel";
import CampaignForm from "@/components/dashboard/form/CampaignForm";
import { useRouter } from "next/router";

interface profileData {
  id: string;
  name: string;
  profile_picture_url: string;
}

interface FormData {
  id: string;
  projectName: string;
  description: string;
  creator: profileData | null;
}

interface HttpError {
  hasError: boolean;
  message: string;
}

const CampaignsPage = () => {
  const router = useRouter()
  const [loader, setLoader] = useState<boolean>(false);
  const [httpError, setHttpError] = useState({ hasError: false, status: 0, message: "", });
  const [tableRows, setTableRows] = useState<boolean>(true);
  const [noSlicedData, setNoSlicedData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { height } = useWindowSize();
  const [campaignsData, setCampaignsData] = useState<any>([]);
  const [selectedCampaign, setSelectedCampaign] = useState({} as any);
  const [campaignStage, setCampaignStage] = useState<any>([]);
  const [updateCampaign, setUpdateCampaign] = useState(false);
  const [openSidepanel, setOpenSidepanel] = useState(false);
  const [openFormSidepanel, setOpenFormSidepanel] = useState(false);

  const breadcrumbLinks = [
    // { label: "Home", link: "/" },
    { label: "Partnerships", link: "/dashboard/partnerships/campaigns" },
    { label: "Campaigns", link: "/dashboard/partnerships/campaigns", current: true },
  ];

  /* UPDATE CAMPAIGNS DATA */

  useEffect(() => {
    const campaignsDataCopy = [...campaignsData];
    setNoSlicedData(campaignsDataCopy);
    setData(campaignsDataCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  }, [currentPage, updateCampaign, tableRows]);

  const updateCampaignData = () => {
    setUpdateCampaign(prevState => !prevState);
  };
  console.log("UPDATE STAGE", updateCampaign)

  /* CAMPAIGN-STAGE API CALL  */

  useEffect(() => { fetchCampaignStages() }, [router, updateCampaign, tableRows]);

  const fetchCampaignStages = () => {
    setLoader(true);
    getCampaignStages(
      (response: any) => {
        console.log('Campaign Stages:', campaignStage);
        setCampaignStage(response.map((stage: any) => ({
          stageID: stage.id,
          stageName: stage.name,
          stageIndex: stage.order,
          stageUser: stage.user
        })))

        setUpdateCampaign(false);
        console.log(campaignStage)
      },

      (error: any) => {
        console.error('Error fetching profile data:', error);
        setCampaignStage([]);
      }
    ).finally(() => {
      setLoader(false);
    });
  };

  /* CAMPAIGNS API CALL */

  useEffect(() => {
    let provisionalCampaignsData: any[] = [];
    let provisionalCampaignsDetailData: any[] = [];

    setLoader(true);
    Promise.all([getCampaignsDetail((response: any) => {
      provisionalCampaignsDetailData = response;
      console.log("===========================")
      console.log("primer", response)
      console.log("===========================")
    }, (error: any) => {
      setHttpError({
        hasError: true,
        status: error.status,
        message: error.message,
      });

    }), getCampaigns((response: any[]) => {
      provisionalCampaignsData = response;
      console.log("===========================")
      console.log("segon", response)
      console.log("===========================")
    }, (error: any) => {
      setHttpError({
        hasError: true,
        status: error.status,
        message: error.message,
      });

    })]).finally(() => {

      const campaignsFullData = provisionalCampaignsData.map(item => {
        const item2 = provisionalCampaignsDetailData.find((item2) => item2.id === item.id);
        return {
          ...item,
          ...Object.keys(item2).reduce((result: any, key) => {
            if (!Object.values(item).includes(item2[key]) && !Object.values(result).includes(item2[key])) {
              result[key] = item2[key];
            }
            return result;

          }, {})
        };
      });

      setCampaignsData(campaignsFullData);
      setNoSlicedData(campaignsFullData);
      setData(campaignsFullData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));

      setLoader(false);
    })
  }, [updateCampaign, tableRows]);

  /* TABLE ROW DISPLAY */

  const totalPages = Math.ceil(
    noSlicedData.length / itemsPerPage
  );

  useEffect(() => {
    const calculateItemsPerPage = () => {
      const minRows = 2;
      const maxRows = 10;
      const ratio = height / 96;
      const itemsPerPage = Math.max(minRows, Math.min(maxRows, Math.floor(ratio)));
      setItemsPerPage(itemsPerPage);

      const campaignsDataCopy = [...campaignsData];
      setData(campaignsDataCopy.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));
    }; 4

    calculateItemsPerPage();
  }, [height]);

  useEffect(() => {
    const campaignsDataCopy = [...campaignsData];
    setNoSlicedData(campaignsDataCopy);
    setData(campaignsDataCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  }, [currentPage]);

  const handlePrevious = () => setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
  const handleNext = () => setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));

  /* TABLE SORT LOGIC */

  /*
   * Sort the table by the specified field - ascending and descending order
   * totalProjects and contractValue are treated as numbers, while the rest are treated as strings
   * @param field - Field to sort by
   */

  const sortBy = (field: keyof typeof campaignsData[0]) => {
    // Sort by specified field
    const campaignsDataCopy = [...campaignsData];
    if (field === "total_projects" || field === "contract_value") {
      campaignsDataCopy.sort((a, b) => a[field] - b[field]);
      if (JSON.stringify(campaignsDataCopy) === JSON.stringify(campaignsData)) {
        // Already sorted in ascending order, so sort in descending order
        campaignsDataCopy.sort((a, b) => b[field] - a[field]);
      }
    } else {
      campaignsDataCopy.sort((a, b) => (a[field] as string)?.localeCompare(b[field] as string));
      if (JSON.stringify(campaignsDataCopy) === JSON.stringify(campaignsData)) {
        // Already sorted in ascending order, so sort in descending order
        campaignsDataCopy.sort((a, b) => (b[field] as string)?.localeCompare(a[field] as string));
      }
    }
    setCampaignsData(campaignsData);
    setNoSlicedData(campaignsDataCopy);
    setData(campaignsDataCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  };

  /* SEARCH LOGIC */

  const handleSearch = (search: string) => {
    const filteredData = campaignsData.filter((campaign: CampaignInterface) => {
      // return campaign.brand_name.toLowerCase().includes(search.toLowerCase()) 
      // ||
      //   campaign.campaign_name.toLowerCase().includes(search.toLowerCase());
    });
    setNoSlicedData(filteredData);
    setData(filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  };

  /* SIDEPANEL LOGIC */

  const handleOpenSidepanel = (campaign: any) => {
    setSelectedCampaign(campaign)
    setOpenSidepanel(!openSidepanel);
  };

  const handleCloseSidepanel = (): void => {
    setOpenSidepanel(false);
    setSelectedCampaign(null);
  };

  const handleOpenFormSidepanel = (): void => {
    setOpenFormSidepanel(true);
  };

  const handleCloseFormSidepanel = (): void => {
    setOpenFormSidepanel(false);
  };

  return (
    <div className="main-container">
      <div className="breadcrumb-nav"><Breadcrumbs items={breadcrumbLinks} /></div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="CampaignData">
            {openSidepanel && (
              <CampaignSidepanel
                campaignsData={selectedCampaign}
                open={openSidepanel}
                setSelectedCampaign={setSelectedCampaign}
                setOpenSidepanel={setOpenSidepanel}
                updateCampaignData={updateCampaignData}
              />
            )}
            {openFormSidepanel && (
              <CampaignForm
                campaignsData={data}
                campaignStage={campaignStage}
                isEditing={false}
                closeEdit={handleCloseFormSidepanel}
                handleCloseFormSidepanel={handleCloseFormSidepanel}
                updateCampaignData={updateCampaignData}
                // brandsData={brandsData}
                // dealsData={dealsData}
              />
            )}
            <div className="filtersContainer">
              <Dropdown data={data} setData={setData} origin="campaigns" noSlicedData={noSlicedData} />
              <div className="button-group">
                <button className="app-button cream" onClick={undefined}>
                  CSV Upload
                </button>
                <button className="app-button" onClick={handleOpenFormSidepanel}>
                  <Image src={PlusWhite} alt="Icon" width={14} height={14} />
                  Add Campaign
                </button>
              </div>
              <div className="row-wrap">
                <button onClick={() => setTableRows(false)}>
                  <Image src={Kanban} alt="Icon" width={16} height={16} />
                </button>
                <button onClick={() => setTableRows(true)}>
                  <Image src={Table} alt="Icon" width={16} height={16} />
                </button>
              </div>
            </div>
            {tableRows ? (
              <Fragment>
                <CampaignTable
                  httpError={httpError}
                  data={data}
                  sortBy={sortBy}
                  handleOpenSidepanel={handleOpenSidepanel}
                />
                <Pagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  noSlicedData={noSlicedData}
                  data={data}
                  handlePrevious={handlePrevious}
                  handleNext={handleNext}
                  totalPages={totalPages}
                />
              </Fragment>
            ) : (
              <CampaignKanban
                httpError={httpError}
                data={data}
                campaignsData={campaignsData}
                handleOpenSidepanel={handleOpenSidepanel}
                campaignStage={campaignStage}
                updateCampaignData={updateCampaignData}
              />
            )}

          </div>

        </>
      )}
    </div>
  );
};

const Campaigns = () => {
  return <Sidebar layout={<CampaignsPage />} />;
};

export default withAuth(Campaigns);


// const handleOpenFormSidepanel = () => {
//   if (openSidepanel) setOpenSidepanel(false);
//   setOpenSidepanelForm(true);
// };

// const handleOpenSidepanel = (campaign: any) => {
//   if (openSidepanelForm) setOpenSidepanelForm(false);
//   setSelectedCampaign(campaign);
//   setOpenSidepanel(true);
// };

// const handleOpenSidepanel = (campaign: CampaignInterface): void => {
//   setSelectedCampaign(campaign);
//   setOpenSidepanel(true);
// };


{/* {savedDataList.map((item) => (
                <ProjectCard 
                key={item.id} 
                generateCard={item} 
                creatorSavedData={creatorSavedData} 
                createdDate={new Date()} />
            ))} */}

// SAVE FORM & GENERATE CARD

//  const [savedData, setSavedData] = useState<FormData | null>(null);
//  const [savedDataList, setSavedDataList] = useState<FormData[]>([]);
// //  const [creatorSavedData, setCreatorSavedData] = useState<profileData | null>(null);
//  const [cardId, setCardId] = useState<string>(uuidv4());

//  // Save Form Data
//  const handleSaveFormData = (data: FormData) => {
//     console.log("Data from form:", data);
//     setSavedData(data);
//     setOpenSidepanel(false);
//     setSavedDataList(currentList => [...currentList, data]);
//   };
//   // Save Creator Data
//  const handleSaveCreatorData = (profile: any) => {
//      console.log("Data from form:", profile);
//     //  setCreatorSavedData(profile)
//   };
//  // Generate Card
//   const generateCardId = () => {
//     setCardId(uuidv4());
//   };


// const handleSaveFormData = (newCard: FormData) => {
//   setCards(prevCards => [...prevCards, newCard]);
//   setOpenFormSidepanel(false); // Close the form side panel after saving the data
// };
