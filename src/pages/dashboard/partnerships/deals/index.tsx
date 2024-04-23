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

const DealsPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [httpError, setHttpError] = useState({
    hasError: false,
    status: 0,
    message: "",
  });

  const [tableRows, setTableRows] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [openSidepanel, setOpenSidepanel] = useState(false);
  const [openFormSidepanel, setOpenFormSidepanel] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState({} as any);
  const [dealStage, setDealStage] = useState<any>([]);
  const [updateDeal, setUpdateDeal] = useState(false);

  const [originalData, setOriginalData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<any[]>([]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const breadcrumbLinks = [
    // { label: "Home", link: "/" },
    { label: "Partnerships", link: "/dashboard/partnerships/deals" },
    { label: "Deals", link: "/dashboard/partnerships/deals", current: true },
  ];

  /* UPDATE DEALS DATA */

  useEffect(() => {
    const originalDataCopy = [...originalData];
    setFilteredData(originalDataCopy);
    setDataToDisplay(
      originalDataCopy.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [updateDeal, tableRows]);

  const updateDealData = () => {
    setUpdateDeal((prevState) => !prevState);
  };

  /* DEAL-STAGE API CALL  */

  useEffect(() => {
    fetchDealStages();
  }, [router, updateDeal, tableRows]);

  const fetchDealStages = () => {
    setLoader(true);
    getDealStages(
      (response: any) => {
        setDealStage(
          response.map((stage: any) => ({
            stageID: stage.id,
            stageName: stage.name,
            stageIndex: stage.order,
            stageUser: stage.user,
          }))
        );

        setUpdateDeal(false);
      },
      (error: any) => {
        console.error("Error fetching profile data:", error);
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
      getDeals(
        (response) => (provisionalDealsData = response),
        (error) => {
          setHttpError({
            hasError: true,
            status: error.status,
            message: error.message,
          });
        }
      ),
      getDealsDetail(
        (response: any[]) => (provisionalDealsDetailData = response),
        (error: { status: any; message: any }) => {
          setHttpError({
            hasError: true,
            status: error.status,
            message: error.message,
          });
        }
      ),
    ]).finally(() => {
      const dealsFullData = provisionalDealsData.map((item) => {
        const item2 = provisionalDealsDetailData.find(
          (item2) => item2.id === item.id
        );
        return {
          ...item,
          ...Object.keys(item2).reduce((result: any, key) => {
            if (
              !Object.values(item).includes(item2[key]) &&
              !Object.values(result).includes(item2[key])
            ) {
              result[key] = item2[key];
            }
            return result;
          }, {}),
        };
      });

      setOriginalData(dealsFullData);
      setFilteredData(dealsFullData);
      setDataToDisplay(
        dealsFullData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );

      setLoader(false);
    });
  }, [updateDeal, tableRows]);

  useEffect(() => {
    setDataToDisplay(
      filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [filteredData, currentPage]);

  const handlePrevious = () =>
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
  const handleNext = () =>
    setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));

  const sortBy = (field: keyof (typeof originalData)[0]) => {
    const sortedData = [...filteredData];
    if (field === "contract_value") {
      sortedData.sort((a, b) => {
        const valueA = parseFloat(a[field]);
        const valueB = parseFloat(b[field]);
        return valueA - valueB;
      });
    } else {
      sortedData.sort((a, b) => {
        if (typeof a[field] === "string" && typeof b[field] === "string") {
          return a[field].localeCompare(b[field]);
        } else if (
          typeof a[field] === "number" &&
          typeof b[field] === "number"
        ) {
          return a[field] - b[field];
        } else {
          return 0;
        }
      });
    }

    const isAscending =
      JSON.stringify(filteredData) === JSON.stringify(sortedData);
    const sortedDataFinal = isAscending ? sortedData.reverse() : sortedData;

    setFilteredData(sortedDataFinal);
  };

  /* SIDEPANEL */
  const handleOpenSidepanel = (deal: object) => {
    setSelectedDeal(deal);
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
      <div className="breadcrumb-nav">
        <Breadcrumbs items={breadcrumbLinks} />
      </div>
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
                updateDealData={updateDealData}
              />
            )}
            {openFormSidepanel && (
              <DealForm
                dealStage={dealStage}
                handleCloseFormSidepanel={handleCloseFormSidepanel}
                updateDealData={updateDealData}
                dealsData={selectedDeal}
                isEditing={false}
                closeEdit={handleCloseFormSidepanel}
              />
            )}
            <div className="filtersContainer">
              <Dropdown
                setFilteredData={setFilteredData}
                originalData={originalData}
                setCurrentPage={setCurrentPage}
                origin="deals"
              />
              <div className="button-group">
                <button className="app-button cream" onClick={undefined}>
                  CSV Upload
                </button>
                <button
                  className="app-button"
                  onClick={handleOpenFormSidepanel}
                >
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
                  data={dataToDisplay}
                />
                <Pagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  filteredData={filteredData}
                  dataToDisplay={dataToDisplay}
                  handlePrevious={handlePrevious}
                  handleNext={handleNext}
                  totalPages={totalPages}
                />
              </Fragment>
            ) : (
              <>
                <DealsKanban
                  httpError={httpError}
                  data={dataToDisplay}
                  DealData={filteredData}
                  handleOpenSidepanel={handleOpenSidepanel}
                  Dealstage={dealStage}
                  updateDealData={updateDealData}
                />
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
