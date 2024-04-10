import React, { Fragment, useEffect, useState } from "react";
import withAuth from "@/components/common/WithAuth";
import { useRouter } from "next/router";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Image from "next/image";
import PlusWhite from "@/components/assets/icons/plus-white.svg";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/dashboard/table/Pagination";
import { useWindowSize } from "@/utils/hooks/useWindowSize";
import { transformDate } from "@/utils/dateManager";
import EasyFilters from "@/components/common/EasyFilters";
import { CreatorInterface } from "@/interfaces/interfaces";
import { ProjectInterface } from "@/interfaces/interfaces";
import { getCreators, getCreatorsDetail } from "@/utils/httpCalls";
import CreatorTable from "@/components/dashboard/table/CreatorTable";
import CreatorSidepanel from "@/components/dashboard/profile/CreatorSidepanel";

// import BrandForm from "@/components/dashboard/form/BrandForm";

interface Creators {
  id: string;
  name: string;
  profile_picture_url: string;
  email: string,
  internal: boolean,
  active_campaigns: number,
  active_projects: number,
  active_projects_value: number,
}

interface HttpError {
  hasError: boolean;
  message: string;
}

const CreatorsPage = () => {
  const router = useRouter()
  // const { profileID } = router.query;
  // const [invoiceData, setInvoiceData] = useState(null);
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
  const [creatorsData, setCreatorsData] = useState<any>([]);
  const [campaignsData, setCampaignsData] = useState<any>([]);
  const [selectedCreator, setSelectedCreator] = useState({} as any);

  const breadcrumbLinks = [
    // { label: "Home", link: "/" },
    { label: "Clients", link: "/dashboard/clients/creators" },
    { label: "Creators", link: "/dashboard/clients/creators", current: true },
  ];

  /* BRANDS API CALL  */

  useEffect(() => {
    let provisionalCreatorsData: any[] = [];
    let provisionalCreatorsDetailData: any[] = [];

    setLoader(true);
    Promise.all([
      getCreators((response) => {
        provisionalCreatorsData = response;
      }, (error) => {
        setHttpError({
          hasError: true,
          status: error.status,
          message: error.message,
        });
      }),
      getCreatorsDetail((response: any[]) => {
        provisionalCreatorsDetailData = response;
      }, (error: { status: any; message: any; }) => {
        setHttpError({
          hasError: true,
          status: error.status,
          message: error.message,
        });
      })
    ]).finally(() => {
      const CreatorsFullData = provisionalCreatorsData.map(item => {
        const detail = provisionalCreatorsDetailData.find(detail => detail.id === item.id);
        return {
          ...item,
          ...detail
        };
      });

      setCreatorsData(CreatorsFullData);
      setNoSlicedData(CreatorsFullData);
      setData(CreatorsFullData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));

      setLoader(false);
    });
  }, []);

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

      const creatorsDataCopy = [...creatorsData];
      setData(creatorsDataCopy.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));
    }; 4

    calculateItemsPerPage();
  }, [height]);

  useEffect(() => {
    const creatorsDataCopy = [...creatorsData];
    setNoSlicedData(creatorsDataCopy);
    setData(creatorsDataCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  }, [currentPage]);

  const handlePrevious = () => setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
  const handleNext = () => setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));

  /* TABLE SORT LOGIC - modify to creators data */

  const sortBy = (field: keyof typeof creatorsData[0]) => {
    // Sort by specified field
    const creatorsDataCopy = [...creatorsData];
    if (field === "total_creators" || field === "contract_value") {
      creatorsDataCopy.sort((a, b) => a[field] - b[field]);
      if (JSON.stringify(creatorsDataCopy) === JSON.stringify(creatorsData)) {
        // Already sorted in ascending order, so sort in descending order
        creatorsDataCopy.sort((a, b) => b[field] - a[field]);
      }
    } else {
      creatorsDataCopy.sort((a, b) => (a[field] as string)?.localeCompare(b[field] as string));
      if (JSON.stringify(creatorsDataCopy) === JSON.stringify(creatorsData)) {
        // Already sorted in ascending order, so sort in descending order
        creatorsDataCopy.sort((a, b) => (b[field] as string)?.localeCompare(a[field] as string));
      }
    }
    setCreatorsData(creatorsData);
    setNoSlicedData(creatorsDataCopy);
    setData(creatorsDataCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  };

  /* SEARCH LOGIC - modify to creators data */

  // const handleSearch = (search: string) => {
  //   const filteredData = creatorsData.filter((brand: CreatorInterface) => {
  //     return brand.name.toLowerCase().includes(search.toLowerCase()) ||
  //     brand.brand_name.toLowerCase().includes(search.toLowerCase());
  //   });
  //   setNoSlicedData(filteredData);
  //   setData(filteredData.slice(
  //     (currentPage - 1) * itemsPerPage,
  //     currentPage * itemsPerPage
  //   ));
  // };

  /* SIDEPANEL */

  const handleOpenSidepanel = (brand: object) => {
    setSelectedCreator(brand)
    setOpenSidepanel(!openSidepanel);
  };

  const handleCloseSidepanel = (): void => {
    setOpenSidepanel(false);
    setSelectedCreator(null);
  };

  const handleOpenFormSidepanel = (): void => {
    setOpenFormSidepanel(true);
  };

  const handleCloseFormSidepanel = (): void => {
    setOpenFormSidepanel(false);
  };

  function filterByDate(type: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="main-container">
      <div className="breadcrumb-nav"><Breadcrumbs items={breadcrumbLinks} /></div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="creatorsData">
            {openSidepanel && (
              <CreatorSidepanel
                open={openSidepanel}
                setOpenSidepanel={setOpenSidepanel}
                creatorsData={selectedCreator}
                setSelectedCreator={setSelectedCreator}
              />
            )}
            {/* {openFormSidepanel && (
              <BrandForm 
                handleCloseFormSidepanel={handleCloseFormSidepanel} 
              />
            )} */}
            <div className="row-between">
              <div>
              {/* <Dropdown /> */}
              {/* <EasyFilters filterByDate={filterByDate} handleSearch={handleSearch} /> */}
              </div>
              <div className="button-group">
                <button className="app-button cream" onClick={undefined}>
                  CSV Upload
                </button>
                <button className="app-button" onClick={handleOpenFormSidepanel}>
                  <Image src={PlusWhite} alt="Icon" width={14} height={14} />
                  Add Creator
                </button>
              </div>
            </div>
              <Fragment>
                <CreatorTable
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
  
          </div>

        </>
      )}
    </div>
  );
};

const Creators = () => {
  return <Sidebar layout={<CreatorsPage />} />;
};

export default withAuth(Creators);