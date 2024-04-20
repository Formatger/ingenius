import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
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

import { DealInterface } from "@/interfaces/interfaces";
import { getDealStages, getDeals, getDealsDetail } from "@/utils/httpCalls";
import DealTable from "@/components/dashboard/table/DealTable";
import DealSidepanel from "@/components/dashboard/profile/DealSidepanel";
import DealsKanban from "@/components/dashboard/kanban/DealsKanban";
import DealForm from "@/components/dashboard/form/DealForm";

interface HttpError {
  hasError: boolean;
  message: string;
}

const DealsPage = () => {
  const router = useRouter()
  const [invoiceData, setInvoiceData] = useState(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [httpError, setHttpError] = useState({ hasError: false, status: 0, message: "", });
  const [tableRows, setTableRows] = useState<boolean>(true);
  const [noSlicedData, setNoSlicedData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { height } = useWindowSize();
  const [openSidepanel, setOpenSidepanel] = useState(false);
  const [openFormSidepanel, setOpenFormSidepanel] = useState(false);
  // const [brandsData, setBrandsData] = useState<Creators[]>([]);
  // const [campaignsData, setCampaignsData] = useState<any>([]);
  const [dealsData, setDealsData] = useState<any>([]);
  const [selectedDeal, setSelectedDeal] = useState({} as any);
  const [dealStage, setDealStage] = useState<any>([]);

  const breadcrumbLinks = [
    // { label: "Home", link: "/" },
    { label: "Partnerships", link: "/dashboard/partnerships/deals" },
    { label: "Deals", link: "/dashboard/partnerships/deals", current: true },
  ];

  /* DEAL-STAGE API CALL  */

  useEffect(() => { fetchDealStages() }, [router]);

  const fetchDealStages = () => {
    setLoader(true);
    getDealStages(
      (response: any) => {
        console.log('Deal Stages:', dealStage);

        setDealStage(response || []);

      },
      (error: any) => {
        console.error('Error fetching profile data:', error);
        setDealStage([]);
      }
    ).finally(() => {
      setLoader(false);
    });
  };

  /* DEALS API CALL  */

  useEffect(() => {
    let provisionalDealsData: any[] = [];
    let provisionalDealsDetailData: any[] = [];

    setLoader(true);
    Promise.all([
      getDeals((response) => {
        provisionalDealsData = response;
      }, (error) => {
        setHttpError({
          hasError: true,
          status: error.status,
          message: error.message,
        });
      }),
      getDealsDetail((response: any[]) => {
        provisionalDealsDetailData = response;
      }, (error: { status: any; message: any; }) => {
        setHttpError({
          hasError: true,
          status: error.status,
          message: error.message,
        });
      })
    ]).finally(() => {
      const DealsFullData = provisionalDealsData.map(item => {
        const detail = provisionalDealsDetailData.find(detail => detail.id === item.id);
        return {
          ...item,
          ...detail
        };
      });

      setDealsData(DealsFullData);
      setNoSlicedData(DealsFullData);
      setData(DealsFullData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));

      setLoader(false);
    });
  }, []);

  /* TABLE ROW DISPLAY - modify to deals data */

  const totalPages = Math.ceil(
    noSlicedData.length / itemsPerPage
  );

  useEffect(() => {
    // items per page must be an integer value between 0 and 10 depending on the height of the window
    const calculateItemsPerPage = () => {
      const minRows = 2;
      const maxRows = 10;
      const ratio = height / 96;
      const itemsPerPage = Math.max(minRows, Math.min(maxRows, Math.floor(ratio)));
      setItemsPerPage(itemsPerPage);

      const dealsDataCopy = [...dealsData];
      setData(dealsDataCopy.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));
    }; 4

    calculateItemsPerPage();
  }, [height]);

  useEffect(() => {
    const dealsDataCopy = [...dealsData];
    setNoSlicedData(dealsDataCopy);
    setData(dealsDataCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  }, [currentPage]);

  const handlePrevious = () => setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
  const handleNext = () => setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));

  /* TABLE SORT LOGIC - modify to deals data */

  const sortBy = (field: keyof typeof dealsData[0]) => {
    // Sort by specified field
    const dealsDataCopy = [...dealsData];
    if (field === "total_deals" || field === "contract_value") {
      dealsDataCopy.sort((a, b) => a[field] - b[field]);
      if (JSON.stringify(dealsDataCopy) === JSON.stringify(dealsData)) {
        // Already sorted in ascending order, so sort in descending order
        dealsDataCopy.sort((a, b) => b[field] - a[field]);
      }
    } else {
      dealsDataCopy.sort((a, b) => (a[field] as string)?.localeCompare(b[field] as string));
      if (JSON.stringify(dealsDataCopy) === JSON.stringify(dealsData)) {
        // Already sorted in ascending order, so sort in descending order
        dealsDataCopy.sort((a, b) => (b[field] as string)?.localeCompare(a[field] as string));
      }
    }
    setDealsData(dealsData);
    setNoSlicedData(dealsDataCopy);
    setData(dealsDataCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  };

  /* SEARCH LOGIC - modify to deals data */

  const handleSearch = (search: string) => {
    const filteredData = dealsData.filter((deal: DealInterface) => {
      return deal.name.toLowerCase().includes(search.toLowerCase())
      // ||
      // deal.deal_name.toLowerCase().includes(search.toLowerCase());
    });
    setNoSlicedData(filteredData);
    setData(filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  };

  /* SIDEPANEL */

  const handleOpenSidepanel = (deal: object) => {
    setSelectedDeal(deal)
    setOpenSidepanel(!openSidepanel);
  };

  const handleCloseSidepanel = (): void => {
    setOpenSidepanel(false);
    setSelectedDeal(null);
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
          <div className="page-container" id="dealsData">
            {openSidepanel && (
              <DealSidepanel
                open={openSidepanel}
                setOpenSidepanel={setOpenSidepanel}
                dealsData={selectedDeal}
                setSelectedDeal={setSelectedDeal}
              />
            )}
            {openFormSidepanel && (
              <DealForm
                // creatorsData={creatorsData}
                // campaignsData={campaignsData}
                dealStage={dealStage}
                handleCloseFormSidepanel={handleCloseFormSidepanel}
              />
            )}
            <div className="filtersContainer">
              <Dropdown data={data} setData={setData} origin="deals" noSlicedData={noSlicedData} />
              <div className="button-group">
                <button className="app-button cream" onClick={undefined}>
                  CSV Upload
                </button>
                <button className="app-button" onClick={handleOpenFormSidepanel}>
                  <Image src={PlusWhite} alt="Icon" width={14} height={14} />
                  Add Deal
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
                <DealTable
                  httpError={httpError}
                  sortBy={sortBy}
                  handleOpenSidepanel={handleOpenSidepanel}
                  data={data}
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
              <>
                {/* <DealsKanban
                  httpError={httpError}
                  dealsData={dealsData}
                  handleOpenSidepanel={handleOpenSidepanel}
                /> */}
              </>
            )}

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

