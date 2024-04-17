import React, { Fragment, useEffect, useState, createContext } from "react";
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
import { ProjectInterface } from "@/interfaces/interfaces";
import { getProjectStages, getProjects, getProjectsDetail } from "@/utils/httpCalls";
import ProjectTable from "@/components/dashboard/table/ProjectTable";
import ProjectSidepanel from "@/components/dashboard/profile/ProjectSidepanel";
import ProjectsKanban from "@/components/dashboard/kanban/ProjectsKanban";

import ProjectForm from "@/components/dashboard/form/ProjectForm";
import { useRouter } from "next/router";

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

const ProjectsPage = () => {
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
  const [projectsData, setProjectsData] = useState<any>([]);
  const [selectedProject, setSelectedProject] = useState({} as any);
  const [projectStage, setProjectStage] = useState<any>([]);
  const [updateProject, setUpdateProject] = useState(false);

  const breadcrumbLinks = [
    // { label: "Home", link: "/" },
    { label: "Partnerships", link: "/dashboard/partnerships/projects" },
    { label: "Projects", link: "/dashboard/partnerships/projects", current: true },
  ];

  /* ACTUALIZAR EL RENDERIZADO API */

  useEffect(() => {
    const projectsDataCopy = [...projectsData];
    setNoSlicedData(projectsDataCopy);
    setData(projectsDataCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  }, [currentPage, updateProject, tableRows]);

  const updateProjectData = () => {
    setUpdateProject(prevState => !prevState);
  };
  console.log("UPDATE STAGE", updateProject)

  /* PROJECT-STAGE API CALL  */

  useEffect(() => { fetchProjectStages() }, [router, updateProject, tableRows]);

  const fetchProjectStages = () => {
    setLoader(true);
    getProjectStages(
      (response: any) => {
        console.log('Project Stages:', response);

        setProjectStage(response.map((stage: any) => ({
          stageID: stage.id,
          stageName: stage.name,
          stageIndex: stage.order,
          stageUser: stage.user
        })))
        setUpdateProject(false);
        console.log(projectStage)
      },

      (error: any) => {
        console.error('Error fetching profile data:', error);
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
      getProjects((response) => {
        provisionalProjectsData = response;
      }, (error) => {
        setHttpError({
          hasError: true,
          status: error.status,
          message: error.message,
        });
      }),
      getProjectsDetail((response: any[]) => {
        provisionalProjectsDetailData = response;
      }, (error: { status: any; message: any; }) => {
        setHttpError({
          hasError: true,
          status: error.status,
          message: error.message,
        });
      })
    ]).finally(() => {
      const ProjectsFullData = provisionalProjectsData.map(item => {
        const detail = provisionalProjectsDetailData.find(detail => detail.id === item.id);
        return {
          ...item,
          ...detail
        };
      });

      setProjectsData(ProjectsFullData);
      setNoSlicedData(ProjectsFullData);
      setData(ProjectsFullData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));

      setLoader(false);
    });
  }, [updateProject, tableRows]);



  /* TABLE ROW DISPLAY - modify to projects data */

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

      const projectsDataCopy = [...projectsData];
      setData(projectsDataCopy.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));
    }; 4

    calculateItemsPerPage();
  }, [height]);

  useEffect(() => {
    const minRows = 2;
    const maxRows = 10;
    const ratio = height / 96;
    const itemsPerPage = Math.max(minRows, Math.min(maxRows, Math.floor(ratio)));
    setItemsPerPage(itemsPerPage);
  }, [data]);

  useEffect(() => {
    const projectsDataCopy = [...projectsData];
    setNoSlicedData(projectsDataCopy);
    setData(projectsDataCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  }, [currentPage]);

  const handlePrevious = () => setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
  const handleNext = () => setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));

  /* TABLE SORT LOGIC - modify to projects data */

  const sortBy = (field: keyof typeof projectsData[0]) => {
    // Sort by specified field
    const projectsDataCopy = [...projectsData];
    if (field === "total_projects" || field === "contract_value") {
      projectsDataCopy.sort((a, b) => a[field] - b[field]);
      if (JSON.stringify(projectsDataCopy) === JSON.stringify(projectsData)) {
        // Already sorted in ascending order, so sort in descending order
        projectsDataCopy.sort((a, b) => b[field] - a[field]);
      }
    } else {
      projectsDataCopy.sort((a, b) => (a[field] as string)?.localeCompare(b[field] as string));
      if (JSON.stringify(projectsDataCopy) === JSON.stringify(projectsData)) {
        // Already sorted in ascending order, so sort in descending order
        projectsDataCopy.sort((a, b) => (b[field] as string)?.localeCompare(a[field] as string));
      }
    }
    setProjectsData(projectsData);
    setNoSlicedData(projectsDataCopy);
    setData(projectsDataCopy.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  };

  /* SEARCH LOGIC - modify to projects data */

  const handleSearch = (search: string) => {
    const filteredData = projectsData.filter((project: ProjectInterface) => {
      return project.name.toLowerCase().includes(search.toLowerCase())
      // ||
      // project.campaign_name.toLowerCase().includes(search.toLowerCase());
    });
    setNoSlicedData(filteredData);
    setData(filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ));
  };

  /* SIDEPANEL */

  const handleOpenSidepanel = (project: object) => {
    setSelectedProject(project)
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

  console.log("TABLE ROW", tableRows)


  return (
    <div className="main-container">
      <div className="breadcrumb-nav"><Breadcrumbs items={breadcrumbLinks} /></div>
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
                projectsData={data}
                projectStage={projectStage}
                isEditing={false}
                closeEdit={handleCloseFormSidepanel}
                handleCloseFormSidepanel={handleCloseFormSidepanel}
                updateProjectData={updateProjectData}
              />
            )}
            <div className="filtersContainer">
              <Dropdown data={data} setData={setData} origin="projects" noSlicedData={noSlicedData} />
              <div className="button-group">
                <button className="app-button cream" onClick={undefined}>
                  CSV Upload
                </button>
                <button className="app-button" onClick={handleOpenFormSidepanel}>
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
                <ProjectsKanban
                  httpError={httpError}
                  projectsData={projectsData}
                  data={data}
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
