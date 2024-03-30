import React from "react";
import Image from "next/image";
import StatsUp from "@/components/assets/icons/stats-up.svg";
import StatsDown from "@/components/assets/icons/stats-down.svg";

const DashboardStats = ({ sections }: any) => {
  return (
    <div className="dash-stats">
      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="">Total Contracts</h5>
          <div className="stats-tag">
            <Image src={StatsUp} alt="icon" className="arrow-up" />
            <p className="h9">
              10.0%
            </p>
          </div>
        </div>
        <div><h2 className="">56</h2></div>
        <div>
          <p className="">Contracts in 2024</p>
        </div>
      </div>

      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="">Total Contracts</h5>
          <div className="stats-tag">
            <Image src={StatsUp} alt="icon" className="arrow-up" />
            <p className="h9">
              10.0%
            </p>
          </div>
        </div>
        <div><h2 className="">56</h2></div>
        <div>
          <p className="">Contracts in 2024</p>
        </div>
      </div>

      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="">Total Contracts</h5>
          <div className="stats-tag">
            <Image src={StatsUp} alt="icon" className="arrow-up" />
            <p className="h9">
              10.0%
            </p>
          </div>
        </div>
        <div><h2 className="">56</h2></div>
        <div>
          <p className="">Contracts in 2024</p>
        </div>
      </div>

      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="">Total Contracts</h5>
          <div className="stats-tag">
            <Image src={StatsUp} alt="icon" className="arrow-up" />
            <p className="h9">
              10.0%
            </p>
          </div>
        </div>
        <div><h2 className="">56</h2></div>
        <div>
          <p className="">Contracts in 2024</p>
        </div>
      </div>

    </div>
  );
};

export default DashboardStats;