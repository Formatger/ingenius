import React from "react";
import Image from "next/image";
import StatsUp from "@/components/assets/icons/stats-up.svg";

const PendingInvoices = ({ sections }: any) => {
  return (
    <div className="pending-container">
      <div className="pending-box">
        <h5 className="pending-header-text">Total Unpaid Invoices</h5>
        <div>
          <h2 className="pending-result">$37,626 (data)</h2></div>
        <div>
          <div className="last-pending">
            <p className="pending-name-text">Warby Parker (data)</p>
            <p className="pending-text">&nbsp;Contracts in 2024&nbsp;</p>
            <p className="pending-date-text"> on January 6th. (data)</p>
          </div>
        </div>
        <button className="app-button" onClick={undefined}>
          <p>Remind Brand</p>
        </button>
      </div>
    </div>
  );
};

export default PendingInvoices;