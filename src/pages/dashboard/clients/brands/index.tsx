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
import { getBrands, getBrandsDetail } from "@/utils/httpCalls";
import BrandTable from "@/components/dashboard/table/BrandTable";
import BrandSidepanel from "@/components/dashboard/profile/BrandSidepanel";

// import BrandForm from "@/components/dashboard/form/BrandForm";

const BrandsPage = () => {
  const router = useRouter();
  // const { profileID } = router.query;
  // const [invoiceData, setInvoiceData] = useState(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [httpError, setHttpError] = useState({
    hasError: false,
    status: 0,
    message: "",
  });
  const [noSlicedData, setNoSlicedData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { height } = useWindowSize();
  const [openSidepanel, setOpenSidepanel] = useState(false);
  const [, setOpenFormSidepanel] = useState(false);
  const [brandsData, setBrandsData] = useState<any>([]);
  const [selectedBrand, setSelectedBrand] = useState({} as any);

  const breadcrumbLinks = [
    // { label: "Home", link: "/" },
    { label: "Clients", link: "/dashboard/clients/brands" },
    { label: "Brands", link: "/dashboard/clients/brands", current: true },
  ];

  /* BRANDS API CALL  */

  useEffect(() => {
    let provisionalBrandsData: any[] = [];
    let provisionalBrandsDetailData: any[] = [];

    setLoader(true);
    Promise.all([
      getBrands(
        (response) => {
          provisionalBrandsData = response;
        },
        (error) => {
          setHttpError({
            hasError: true,
            status: error.status,
            message: error.message,
          });
        }
      ),
      getBrandsDetail(
        (response: any[]) => {
          provisionalBrandsDetailData = response;
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
      const BrandsFullData = provisionalBrandsData.map((item) => {
        const detail = provisionalBrandsDetailData.find(
          (detail) => detail.id === item.id
        );
        return {
          ...item,
          ...detail,
        };
      });

      setBrandsData(BrandsFullData);
      setNoSlicedData(BrandsFullData);
      setData(
        BrandsFullData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );

      setLoader(false);
    });
  }, []);

  /* TABLE ROW DISPLAY */

  const totalPages = Math.ceil(noSlicedData.length / itemsPerPage);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      const minRows = 2;
      const maxRows = 10;
      const ratio = height / 96;
      const itemsPerPage = Math.max(
        minRows,
        Math.min(maxRows, Math.floor(ratio))
      );
      setItemsPerPage(itemsPerPage);

      const brandsDataCopy = [...brandsData];
      setData(
        brandsDataCopy.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    };
    4;

    calculateItemsPerPage();
  }, [height]);

  useEffect(() => {
    const brandsDataCopy = [...brandsData];
    setNoSlicedData(brandsDataCopy);
    setData(
      brandsDataCopy.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [currentPage]);

  const handlePrevious = () =>
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
  const handleNext = () =>
    setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));

  /* TABLE SORT LOGIC - modify to brands data */

  const sortBy = (field: keyof (typeof brandsData)[0]) => {
    // Sort by specified field
    const brandsDataCopy = [...brandsData];
    if (field === "total_brands" || field === "contract_value") {
      brandsDataCopy.sort((a, b) => a[field] - b[field]);
      if (JSON.stringify(brandsDataCopy) === JSON.stringify(brandsData)) {
        // Already sorted in ascending order, so sort in descending order
        brandsDataCopy.sort((a, b) => b[field] - a[field]);
      }
    } else {
      brandsDataCopy.sort((a, b) =>
        (a[field] as string)?.localeCompare(b[field] as string)
      );
      if (JSON.stringify(brandsDataCopy) === JSON.stringify(brandsData)) {
        // Already sorted in ascending order, so sort in descending order
        brandsDataCopy.sort((a, b) =>
          (b[field] as string)?.localeCompare(a[field] as string)
        );
      }
    }
    setBrandsData(brandsData);
    setNoSlicedData(brandsDataCopy);
    setData(
      brandsDataCopy.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  };

  /* SEARCH LOGIC - modify to brands data */

  // const handleSearch = (search: string) => {
  //   const filteredData = brandsData.filter((brand: BrandInterface) => {
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
    setSelectedBrand(brand);
    setOpenSidepanel(!openSidepanel);
  };

  const handleCloseSidepanel = (): void => {
    setOpenSidepanel(false);
    setSelectedBrand(null);
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
          <div className="page-container" id="brandsData">
            {openSidepanel && (
              <BrandSidepanel
                open={openSidepanel}
                setOpenSidepanel={setOpenSidepanel}
                brandsData={selectedBrand}
                setSelectedBrand={setSelectedBrand}
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
                <button
                  className="app-button"
                  onClick={handleOpenFormSidepanel}
                >
                  <Image src={PlusWhite} alt="Icon" width={14} height={14} />
                  Add Brand
                </button>
              </div>
            </div>
            <Fragment>
              <BrandTable
                httpError={httpError}
                sortBy={sortBy}
                handleOpenSidepanel={handleOpenSidepanel}
                data={data}
              />
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                filteredData={noSlicedData}
                dataToDisplay={data}
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

const Brands = () => {
  return <Sidebar layout={<BrandsPage />} />;
};

export default withAuth(Brands);
