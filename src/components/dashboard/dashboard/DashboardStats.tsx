import React from "react";
import Image from "next/image";
import StatsUp from "@/components/assets/icons/stats-up.svg";
import StatsDown from "@/components/assets/icons/stats-down.svg";

const DashboardStats = ({ sections }: any) => {
  return (
    <div className="dash-stats">
      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="dash-stats-title">Total Contracts</h5>
          {/* {dataContractor < 0 ? (
            <div className="stats-tag-negative">
              <Image src={StatsUp} alt="icon" className="arrow-down" />
              <p className="h9">
                10.0%
              </p>
            </div>
          ) : (
            <div className="stats-tag">
              <Image src={StatsUp} alt="icon" className="arrow-up" />
              <p className="h9">
                10.0%
              </p>
            </div>
          )} */}
          <div className="stats-tag">
            <Image src={StatsUp} alt="icon" className="arrow-up" />
            <p className="stats-tag-text">
              10.0%
            </p>
          </div>
        </div>
        <div><h2 className="stats-result">56</h2></div>
        <div>
          <p className="stats-footer-text">Contracts in 2024</p>
        </div>
      </div>

      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="dash-stats-title">Total Profit</h5>
          {/* {dataProfit < 0 ? (
            <div className="stats-tag-negative">
              <Image src={StatsUp} alt="icon" className="arrow-down" />
              <p className="h9">
                10.0%
              </p>
            </div>
          ) : (
            <div className="stats-tag">
              <Image src={StatsUp} alt="icon" className="arrow-up" />
              <p className="h9">
                10.0%
              </p>
            </div>
          )} */}
          <div className="stats-tag">
            <Image src={StatsUp} alt="icon" className="arrow-up" />
            <p className="stats-tag-text">
              7.0%
            </p>
          </div>
        </div>
        <div><h2 className="stats-result">$80,230</h2></div>
        <div>
          <p className="stats-footer-text">Profits in 2024</p>
        </div>
      </div>

      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="dash-stats-title">Total Clients</h5>
          {/* {dataClients < 0 ? (
            <div className="stats-tag-negative">
              <Image src={StatsUp} alt="icon" className="arrow-down" />
              <p className="h9">
                10.0%
              </p>
            </div>
          ) : (
            <div className="stats-tag">
              <Image src={StatsUp} alt="icon" className="arrow-up" />
              <p className="h9">
                10.0%
              </p>
            </div>
          )} */}
          <div className="stats-tag">
            <Image src={StatsUp} alt="icon" className="arrow-up" />
            <p className="stats-tag-text">
              2 more
            </p>
          </div>
        </div>
        <div><h2 className="stats-result">+/- 4</h2></div>
        <div>
          <p className="stats-footer-text">More brands & creators in Jan</p>
        </div>
      </div>

      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="dash-stats-title">Expense Total</h5>
          {/* {dataExpenseTotal < 0 ? (
            <div className="stats-tag-negative">
              <Image src={StatsDown} alt="icon"  />
              <p className="h9">
                10.0%
              </p>
            </div>
          ) : (
            <div className="stats-tag">
              <Image src={StatsUp} alt="icon" />
              <p className="h9">
                10.0%
              </p>
            </div>
          )} */}
          <div className="stats-tag-negative">
            <Image src={StatsDown} alt="icon" />
            <p className="stats-tag-text">
              1.10%
            </p>
          </div>
        </div>
        <div><h2 className="stats-result">56</h2></div>
        <div>
          <p className="stats-footer-text">Down from 2023</p>
        </div>
      </div>

    </div>
  );
};

export default DashboardStats;