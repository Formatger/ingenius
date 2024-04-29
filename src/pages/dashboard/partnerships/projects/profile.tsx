import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import withAuth from "@/components/common/WithAuth";
import Sidebar from "@/components/navigation/Sidebar";
import { ProjectDetails, ProjectInvoice } from "@/components/dashboard/profile/ProjectProfile";
import { Arrow } from "@/components/assets/svg/Arrow";
import { getProjectsDetail } from "@/utils/httpCalls";
import Folder from "@/components/assets/icons/folder.svg";
import MainLoader from "@/components/common/Loader";

const ProjectProfilePage = () => {
  const router = useRouter()
  const { projectId } = router.query;

  const [loader, setLoader] = useState<boolean>(false);
  const [projectsData, setProjectsData] = useState({});
  const [activeTab, setActiveTab] = useState('invoice');
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => { fetchData() }, [router]);
  useEffect(() => {
    if (refreshData) {
      fetchData();
      setRefreshData(false);
    }
  }, [refreshData]);

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
          {`View Projects`}
        </Link>
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="">
            <div className="profile-container">
              <div>
                <ProjectDetails projectsData={projectsData} />
                {/* <div className="card-container tab-buttons">
                <p className="smallcaps">VIEW DOCUMENTS</p>
                <div className="button-group">
                <button className={`sec-button ${activeTab === 'contract' ? 'active-button' : 'linen'}`}
                    onClick={() => setActiveTab('contract')}>
                    <Image src={Folder} alt="Icon" width={15} height={15} />
                    <p>View Contract</p>
                  </button>
                  <button className={`sec-button ${activeTab === 'invoice' ? 'active-button' : 'linen'}`}
                    onClick={() => setActiveTab('invoice')}>
                    <Image className="" src={Folder} alt="Icon" width={15} height={15} />
                    <p>View Invoice</p>
                  </button>
                </div>
              </div> */}
              </div>

              <div>
                {/* {activeTab === 'invoice' ? ( */}
                <ProjectInvoice projectsData={projectsData} setRefreshData={setRefreshData} />
                {/* ) : (
                <ProjectContract projectsData={projectsData} />
              )} */}
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
