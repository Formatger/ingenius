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
import Dropdown from "@/components/common/Dropdown";
import BrandForm from "@/components/dashboard/form/BrandForm";
import Searchbox from "@/components/dashboard/table/Search";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [openSidepanel, setOpenSidepanel] = useState(false);
  const [openFormSidepanel, setOpenFormSidepanel] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState({} as any);
  const [updateBrand, setUpdateBrand] = useState(false);

  const [originalData, setOriginalData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<any[]>([]);

  const totalPages = Math.ceil(originalData.length / itemsPerPage);
  const breadcrumbLinks = [
    // { label: "Home", link: "/" },
    { label: "Clients", link: "/dashboard/clients/brands" },
    { label: "Brands", link: "/dashboard/clients/brands", current: true },
  ];

  /* ACTUALIZAR EL RENDERIZADO API */

  //  useEffect(() => {
  //   const originalDataCopy = [...originalData];
  //   setFilteredData(originalDataCopy);
  //   setDataToDisplay(
  //     originalDataCopy.slice(
  //       (currentPage - 1) * itemsPerPage,
  //       currentPage * itemsPerPage
  //     )
  //   );
  // }, [updateBrand);

  const updateBrandData = () => {
    setUpdateBrand((prevState) => !prevState);
  };

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

      setOriginalData(BrandsFullData);
      setFilteredData(BrandsFullData);
      setDataToDisplay(
        BrandsFullData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );

      setLoader(false);
    });
  }, [updateBrand]);

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

  /* TABLE SORT LOGIC - modify to brands data */
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

  /* SEARCH LOGIC - modify to brands data */

  const handleSearch = (search: string) => {
    const filtered = originalData.filter((brand: any) => {
      return (
        brand.name.toLowerCase().includes(search.toLowerCase()) ||
        brand.email.toLowerCase().includes(search.toLowerCase()) ||
        brand.website.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredData(filtered);
    setDataToDisplay(
      filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  };

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

  /* CSV UPLOAD */
  const handleUploadCSV = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/file", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          // File uploaded successfully
          console.log("File uploaded successfully");
        } else {
          // Error uploading file
          console.error("Error uploading file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
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
          <div className="page-container" id="brandData">
            {openSidepanel && (
              <BrandSidepanel
                open={openSidepanel}
                setOpenSidepanel={setOpenSidepanel}
                brandsData={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                updateBrandData={updateBrandData}
              />
            )}
            {openFormSidepanel && (
              <BrandForm
                projectsData={selectedBrand}
                isEditing={false}
                closeEdit={handleCloseFormSidepanel}
                handleCloseFormSidepanel={handleCloseFormSidepanel}
                updateBrandData={updateBrandData}
              />
            )}
            <div className="filtersSearchContainer">
              {/*  <Dropdown
                setFilteredData={setFilteredData}
                originalData={originalData}
                setCurrentPage={setCurrentPage}
                origin="brands"
              /> */}
              <div className="button-group">
                <Searchbox handleSearch={handleSearch} />

                <label htmlFor="file-upload" className="app-button cream">
                  CSV Upload
                </label>
                <input
                  className="input-file"
                  id="file-upload"
                  type="file"
                  onChange={handleUploadCSV}
                />

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

const Brands = () => {
  return <Sidebar layout={<BrandsPage />} />;
};

export default withAuth(Brands);
