import React, { Fragment, useEffect, useState } from "react";
import withAuth from "@/components/common/WithAuth";
import { useRouter } from "next/router";
import MainLoader from "@/components/common/Loader";
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Image from "next/image";
import PlusWhite from "@/components/assets/icons/plus-white.svg";
import Pagination from "@/components/dashboard/table/Pagination";
import { useWindowSize } from "@/utils/hooks/useWindowSize";
import { getCreators, getCreatorsDetail } from "@/utils/httpCalls";
import CreatorTable from "@/components/dashboard/table/CreatorTable";
import CreatorSidepanel from "@/components/dashboard/profile/CreatorSidepanel";

// import BrandForm from "@/components/dashboard/form/BrandForm";

interface Creators {
  id: string;
  name: string;
  profile_picture_url: string;
  email: string;
  internal: boolean;
  active_campaigns: number;
  active_projects: number;
  active_projects_value: number;
}

const CreatorsPage = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [httpError, setHttpError] = useState({
    hasError: false,
    status: 0,
    message: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [openSidepanel, setOpenSidepanel] = useState(false);
  const [, setOpenFormSidepanel] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState({} as any);

  const [originalData, setOriginalData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<any[]>([]);

  const totalPages = Math.ceil(originalData.length / itemsPerPage);
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
      getCreators(
        (response) => {
          provisionalCreatorsData = response;
        },
        (error) => {
          setHttpError({
            hasError: true,
            status: error.status,
            message: error.message,
          });
        }
      ),
      getCreatorsDetail(
        (response: any[]) => {
          provisionalCreatorsDetailData = response;
        },
        (error: { status: any; message: any }) => {
          setHttpError({
            hasError: true,
            status: error.status,
            message: error.message,
          });
        }
      ),
    ]).finally(() => {
      const CreatorsFullData = provisionalCreatorsData.map((item) => {
        const detail = provisionalCreatorsDetailData.find(
          (detail) => detail.id === item.id
        );
        return {
          ...item,
          ...detail,
        };
      });

      setOriginalData(CreatorsFullData);
      setFilteredData(CreatorsFullData);
      setDataToDisplay(
        CreatorsFullData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );

      setLoader(false);
    });
  }, []);

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

  /* TABLE SORT LOGIC - modify to creators data */

  const sortBy = (field: keyof (typeof originalData)[0]) => {
    const sortedData = [...filteredData];
    if (field === "active_projects_value") {
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
    setSelectedCreator(brand);
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
      <div className="breadcrumb-nav">
        <Breadcrumbs items={breadcrumbLinks} />
      </div>
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
              <CreatorForm 
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
                <button
                  className="app-button"
                  onClick={handleOpenFormSidepanel}
                >
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
