import Image from "next/image";
import StatsUp from "@/components/assets/icons/stats-up.svg";
import StatsDown from "@/components/assets/icons/stats-down.svg";
import { getStats } from "@/utils/httpCalls";
import React, { Fragment, useEffect, useState } from "react";
import MainLoader from "@/components/common/Loader";
import { useRouter } from "next/router";

interface DashboardStatsProps {
  stats: any;
  updateStatsData:() => void;
}


const DashboardStats =  ({ stats,  updateStatsData }: DashboardStatsProps)=> {


  return (
    <div className="dash-stats">
      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="dash-stats-title">Total Contracts</h5>
          {stats.total_contracts.change < 0 ? (
            <div className="stats-tag-negative">
              <Image src={StatsUp} alt="icon" className="arrow-down" />
              <p className="h9">
                {stats.total_contracts.change}%
              </p>
            </div>
          ) : (
            <div className="stats-tag">
              <Image src={StatsUp} alt="icon" className="arrow-up" />
              <p className="h9">
                {stats.total_contracts.change}%
              </p>
            </div>
          )}
        </div>
        <div><h2 className="stats-result">{stats.total_contracts.current}</h2></div>
        <div>
          <p className="stats-footer-text">Contracts this Year</p>
        </div>
      </div>

      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="dash-stats-title">Total Profit</h5>
          {stats.total_profit.change < 0 ? (
            <div className="stats-tag-negative">
              <Image src={StatsUp} alt="icon" className="arrow-down" />
              <p className="h9">
                {stats.total_profit.change}%
              </p>
            </div>
          ) : (
            <div className="stats-tag">
              <Image src={StatsUp} alt="icon" className="arrow-up" />
              <p className="h9">
                {stats.total_profit.change}%
              </p>
            </div>
          )}
        </div>
        <div><h2 className="stats-result">{stats.total_profit.current}</h2></div>
        <div>
          <p className="stats-footer-text">Yearly Profits</p>
        </div>
      </div>

      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="dash-stats-title">Total Clients</h5>
          {stats.total_clients.change < 0 ? (
            <div className="stats-tag-negative">
              <Image src={StatsUp} alt="icon" className="arrow-down" />
              <p className="h9">
                {stats.total_clients.change}%
              </p>
            </div>
          ) : (
            <div className="stats-tag">
              <Image src={StatsUp} alt="icon" className="arrow-up" />
              <p className="h9">
                {stats.total_clients.change}%
              </p>
            </div>
          )}
        </div>
        <div><h2 className="stats-result">{stats.total_clients.current}</h2></div>
        <div>
          <p className="stats-footer-text">Brands & Creators</p>
        </div>
      </div>

      <div className="dash-stats-box">
        <div className="row-wrap-3">
          <h5 className="dash-stats-title">Total Expenses</h5>
          {stats.expense_total.change < 0 ? (
            <div className="stats-tag-negative">
              <Image src={StatsUp} alt="icon" className="arrow-down" />
              <p className="h9">
                {stats.expense_total.change}%
              </p>
            </div>
          ) : (
            <div className="stats-tag">
              <Image src={StatsUp} alt="icon" className="arrow-up" />
              <p className="h9">
                {stats.expense_total.change}%
              </p>
            </div>
          )}
        </div>
        <div><h2 className="stats-result">{stats.expense_total.current}</h2></div>
        <div>
          <p className="stats-footer-text">Yearly Expenses</p>
        </div>
      </div>

    </div>
  );
};

export default DashboardStats;