import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "@/components/common/WithAuth";
import Sidebar from "@/components/navigation/Sidebar";
import { ProjectDetails, ProjectInvoice } from "@/components/dashboard/profile/ProjectProfile";
import { Arrow } from "@/components/assets/svg/Arrow";
import { getProjects, getProjectsDetail } from "@/utils/httpCalls";

const ProjectProfilePage = () => {
  const router = useRouter()
  const { projectId } = router.query;

  const [loader, setLoader] = useState<boolean>(false);
  // const [invoiceData, setInvoiceData] = useState(null);
  const [projectsData, setProjectsData] = useState({});

  useEffect(() => { fetchData() }, [router]);

  const fetchData = () => {
    setLoader(true);
    Promise.all([
      getProjectsDetail(
        (response: any) => {
          const project = response.find((project: any) => project.id === parseInt(projectId as string))
          setProjectsData(project);
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
        <Link className="row-wrap-2 text-brown" href={{ pathname: '/dashboard/partnerships/projects/' }}>
          <Arrow className="arrow-left orange-fill" />
          {`Projects`}
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
                <ProjectDetails projectsData={projectsData} />
              </div>
              <div>
                <ProjectInvoice projectsData={projectsData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ProjectProfile = () => {
  return <Sidebar layout={<ProjectProfilePage />} />;
};

export default withAuth(ProjectProfile);
