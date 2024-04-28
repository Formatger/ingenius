import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import LogoText from "../assets/brand/logo-text.png";
import Profile from "../assets/images/profile.png";
import Dots from "../assets/icons/dots.svg";
import Home from "../assets/icons/home.svg";
import Clients from "../assets/icons/clients.svg";
import Settings from "../assets/icons/settings.svg";
import Partner from "../assets/icons/partner.svg";
import Support from "../assets/icons/supportAndHelp.svg";
import ClientDropdown from "./ClientDropdown";
import PartDropdown from "./PartDropdown";
import Logout from "../assets/icons/logout.svg";
import { getUserProfile } from "@/utils/httpCalls";
import { useAppContext } from "../context/AppContext";

interface SidebarProps {
  layout: React.ReactNode;
}

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface TeamInfo {
  name: string;
  members: Member[];
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  team_info: TeamInfo;
  team_picture_url: string;
}

const Sidebar: React.FC<SidebarProps> = ({ layout }) => {
  const { updateUserData, setUpdateUserData } = useAppContext();

  const [mSidebar, setMSidebar] = useState<boolean>(false);
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>();

  const toggleSidebar = () => {
    setMSidebar(!mSidebar);
  };

  /* GET USER API CALL */

  useEffect(() => {
    fetchUserProfile();
  }, [router]);

  useEffect(() => {
    if (updateUserData) {
      fetchUserProfile();
      setUpdateUserData(false);
    }
  }, [updateUserData]);

  const fetchUserProfile = () => {
    getUserProfile(
      (response: any) => {
        setUserData(response[0] || []);
      },
      (error: any) => {
        console.error("Error fetching profile data:", error);
        setUserData(undefined);
      }
    );
  };

  return (
    <div className="opacity-100">
      {/* <div className="mobile-toolbar">
        <button className="mobile-button" onClick={toggleSidebar} aria-label="Menu" type="button">
          <Menu />
        </button>
      </div> */}

      <aside id="default-sidebar" aria-label="Sidebar"
        className={`sidebar ${!mSidebar ? 'sidebar-show' : 'sidebar-show'}`}
      >
        <div className="logo-box">
          <Image src={LogoText} alt="logo" className="main-logo" />
          {/* <div className="dots-button" onClick={toggleSidebar}>
            <span className="text-2xl">
              <Image src={Dots} alt="logo" className="dots-icon" />
            </span>
          </div> */}
        </div>

        <div className="nav-box">
          <div className="nav-links">

            <div>
              <div className="nav-title">
                <p className="smallcaps-dark">main</p>
              </div>
              <div className="nav-group">
                <Link href="/dashboard/dashboard"
                  className={`navlink-wrap ${router.pathname == "/dashboard/dashboard" ? "active-link" : ""}`}>
                  <div>
                    <Image src={Home} alt="Icon" width={20} height={20} className="image" />
                  </div>
                  <div>Dashboard</div>
                </Link>

              </div>
            </div>

            <div>
              <div className="nav-title">
                <p className="smallcaps-dark">manage</p>
              </div>

              <div className="nav-group">

                <ClientDropdown />

                <PartDropdown />

              </div>
            </div>

            <div>
              <div className="nav-title">
                <p className="smallcaps-dark">settings</p>
              </div>
              <div className="nav-group">
                <Link href="/dashboard/support"
                  className={`navlink-wrap ${router.pathname == "/dashboard/support" ? "active-link" : ""}`}>
                  <div>
                    {/* <Image src={Support} alt="Icon" width={20} height={20} className="image" />*/}
                    <Image src={Support} alt="Icon" width={20} height={20} className="image" />
                  </div>
                  <div>Help & Support</div>
                </Link>

                <Link href="/dashboard/settings"
                  className={`navlink-wrap ${router.pathname == "/dashboard/settings" ? "active-link" : ""}`}>
                  <div>
                    <Image src={Settings} alt="Icon" width={20} height={20} className="image" />
                  </div>
                  <div>Settings</div>
                </Link>
              </div>
            </div>


          </div>


          <div className="">
          <Link href="/dashboard/settings"
                  className={`${router.pathname == "/dashboard/settings" ? "" : ""}`}>
            <div className="row-wrap-3">
              <div className="sidebar-image-wrap">
                <img
                  src={userData?.team_picture_url}
                  alt="Uploaded"
                  className="sidebar-profile"
                />
              </div>
              <div>
                <p>{userData?.first_name}{" "}{userData?.last_name}</p>
                <p className="account-subtitle">{userData?.team_info?.name}</p>
              </div>
              
            </div>
            </Link>

            {/* <button className="" onClick={() => {
              localStorage.clear();
              router.push('/auth');
              }} aria-label="Close" type="button"
            >
              <Link href="/dashboard/support"
                className={`navlink-wrap ${router.pathname == "/dashboard/support" ? "active-link" : ""}`}>
                <div>
                  <Image src={Logout} alt="Icon" width={20} height={20} className="image" />
                </div>
                <div>Logout</div>
              </Link>
            </button> 
            */}

          </div>



        </div>
      </aside>

      <div className="sidebar-space">
        <div>{layout}</div>
      </div>
    </div>
  );
};

export default Sidebar;

// const navLinks = [
//   /* Dashboard */
//   { title: "Dashboard", url: "/dashboard/dashboard" },
//   /* Revenue */
//   { title: "Revenue Campaigns", url: "/dashboard/revenue/campaigns" },
//   { title: "Revenue Projects", url: "/dashboard/revenue/projects" },    
//   // { title: "Brand Profile", url: "/dashboard/revenue/projects/brand-profile" },    
//   /* Clients */
//   { title: "Clients Brands", url: "/dashboard/clients/brands" },
//   { title: "Clients Creators", url: "/dashboard/clients/creators" },
//   /* Partnerships */
//   { title: "Partner Deals", url: "/dashboard/partnerships/deals" },
//   { title: "Partner Campaigns", url: "/dashboard/partnerships/campaigns" },
//   { title: "Partner Projects", url: "/dashboard/partnerships/projects" },
//   // { title: "Project Profile", url: "/dashboard/revenue/projects/project-profile" },    
//   /* Settings */
//   { title: "Settings", url: "/dashboard/settings" },
// ];


{/* <ul>
  {navLinks.map((link, index) => (
      <li key={index}>
        <Link href={link.url}>
          <div className="navlink-wrap">
            <Image src={Icon} alt="" width={20} height={20} />
            <span>{link.title}</span>
          </div>
        </Link>
      </li>
    ))}
  </ul> */}

