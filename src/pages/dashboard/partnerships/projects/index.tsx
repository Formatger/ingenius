import React, { Fragment, useEffect, useState } from "react";
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
import {
  getProjectStages,
  getProjects,
  getProjectsDetail,
} from "@/utils/httpCalls";
import ProjectTable from "@/components/dashboard/table/ProjectTable";
import ProjectSidepanel from "@/components/dashboard/profile/ProjectSidepanel";
import ProjectsKanban from "@/components/dashboard/kanban/ProjectsKanban";

import ProjectForm from "@/components/dashboard/form/ProjectForm";
import { useRouter } from "next/router";

const ProjectsPage = () => {
  const router = useRouter();
  // const { profileID } = router.query;
  // const [invoiceData, setInvoiceData] = useState(null);
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
  const [selectedProject, setSelectedProject] = useState({} as any);
  const [projectStage, setProjectStage] = useState<any>([]);
  const [updateProject, setUpdateProject] = useState(false);

  const [originalData, setOriginalData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<any[]>([]);

  const totalPages = Math.ceil(originalData.length / itemsPerPage);
  const breadcrumbLinks = [
    // { label: "Home", link: "/" },
    { label: "Partnerships", link: "/dashboard/partnerships/projects" },
    {
      label: "Projects",
      link: "/dashboard/partnerships/projects",
      current: true,
    },
  ];

  /* ACTUALIZAR EL RENDERIZADO API */

  useEffect(() => {
    const originalDataCopy = [...originalData];
    setFilteredData(originalDataCopy);
    setDataToDisplay(
      originalDataCopy.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [updateProject, tableRows]);

  const updateProjectData = () => {
    setUpdateProject((prevState) => !prevState);
  };

  /* PROJECT-STAGE API CALL  */

  useEffect(() => {
    fetchProjectStages();
  }, [router, updateProject, tableRows]);

  const fetchProjectStages = () => {
    setLoader(true);
    getProjectStages(
      (response: any) => {
        setProjectStage(
          response.map((stage: any) => ({
            stageID: stage.id,
            stageName: stage.name,
            stageIndex: stage.order,
            stageUser: stage.user,
          }))
        );
        setUpdateProject(false);
      },

      (error: any) => {
        console.error("Error fetching profile data:", error);
        setProjectStage([]);
      }
    ).finally(() => {
      setLoader(false);
    });
  };

  /* PROJECTS API CALL  */

  useEffect(() => {
    let provisionalProjectsData: any[] = [];
    let provisionalProjectsDetailData: any[] = [];

    // setLoader(true);
    Promise.all([
      getProjects(
        (response) => (provisionalProjectsData = response),
        (error) => {
          setHttpError({
            hasError: true,
            status: error.status,
            message: error.message,
          });
        }
      ),
      getProjectsDetail(
        (response: any[]) => (provisionalProjectsDetailData = response),
        (error: { status: any; message: any }) => {
          setHttpError({
            hasError: true,
            status: error.status,
            message: error.message,
          });
        }
      ),
    ]).finally(() => {
      const ProjectsFullData = provisionalProjectsData.map((item) => {
        const detail = provisionalProjectsDetailData.find(
          (detail) => detail.id === item.id
        );
        return {
          ...item,
          ...detail,
        };
      });

      setOriginalData(ProjectsFullData);
      setFilteredData(ProjectsFullData);
      setDataToDisplay(
        ProjectsFullData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );

      setLoader(false);
    });
  }, [updateProject, tableRows]);

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

  /* TABLE SORT LOGIC - modify to projects data */

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

  const handleOpenSidepanel = (project: object) => {
    setSelectedProject(project);
    setOpenSidepanel(!openSidepanel);
  };

  const handleCloseSidepanel = (): void => {
    setOpenSidepanel(false);
    setSelectedProject(null);
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
          <div className="page-container" id="projectsData">
            {openSidepanel && (
              <ProjectSidepanel
                open={openSidepanel}
                setOpenSidepanel={setOpenSidepanel}
                projectsData={selectedProject}
                setSelectedProject={setSelectedProject}
                updateProjectData={updateProjectData}
              />
            )}
            {openFormSidepanel && (
              <ProjectForm
                projectsData={selectedProject}
                projectStage={projectStage}
                isEditing={false}
                closeEdit={handleCloseFormSidepanel}
                handleCloseFormSidepanel={handleCloseFormSidepanel}
                updateProjectData={updateProjectData}
              />
            )}
            <div className="filtersContainer">
              <Dropdown
                setFilteredData={setFilteredData}
                originalData={originalData}
                setCurrentPage={setCurrentPage}
                origin="projects"
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
                  Add Project
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
                <ProjectTable
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
                <ProjectsKanban
                  projectsData={filteredData}
                  handleOpenSidepanel={handleOpenSidepanel}
                  projectStage={projectStage}
                  updateProjectData={updateProjectData}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Projects = () => {
  return <Sidebar layout={<ProjectsPage />} />;
};

export default withAuth(Projects);
