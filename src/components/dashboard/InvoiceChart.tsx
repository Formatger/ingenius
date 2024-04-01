import React from "react";
import Image from "next/image";
import StatsUp from "@/components/assets/icons/stats-up.svg";
import StatsDown from "@/components/assets/icons/stats-down.svg";
import Chart from "@/components/assets/images/Chart.png";
import Content from "@/components/assets/images/Content.png";
import { Arrow } from "@/components/assets/svg/Arrow";

const InvoiceChart = ({ sections }: any) => {
  return (
    <div className="pending-container">
      <div className="chart-box">
        <div className="chart-header">
          <h5 className="chart-header-text">Your Pie Chart </h5>
          <div className="timeline-button">
            <p className="timeline-text">Monthly </p>
            <button className="header-button" onClick={undefined}>
              <Arrow className="gray-fill arrow-down" />
            </button>
          </div>
        </div>
        <div className="chart-images">
          <Image src={Chart} alt="Icon" width={140} height={140} />
          <Image src={Content} alt="Icon" width={450} height={150} /></div>
      </div >
    </div>
  );
};

export default InvoiceChart;