import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import CustomTooltip from '../../common/CustomTooltip';

interface PieChartProps {
  pieChartData: any;
}

const PieChartComponent = ({ pieChartData }: PieChartProps) => {
  if (!pieChartData) return null;

  const dataCampaigns = [
    { name: 'Paid Invoices', value: pieChartData.campaigns.total_paid_value, fillColor: '#82ca9d' },
    { name: 'Unpaid Invoices', value: pieChartData.campaigns.total_unpaid_value, fillColor: '#ffa584' },
  ];

  return (
    <div className="dashboard-box piechart">
      <div className="chart-header">
        <h5 className="dashboard-title">Total Invoices Value</h5>
      </div>
      <div className="chart-wrap">
        <PieChart width={400} height={320}>
          <Pie
            data={dataCampaigns}
            cx={200}
            cy={200}
            labelLine={true}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ value }) => `$${value.toLocaleString()}`}
            // label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
          >
            {dataCampaigns?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fillColor} />
            ))}
          </Pie>
          <Tooltip
            content={
              <CustomTooltip
                pieChartData={pieChartData}
              />}
          />
        </PieChart>

        <div className="chart-legend">
          {dataCampaigns?.map((entry, index) => (
            <div key={`${entry.name}-${index}`} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: entry.fillColor }}></span>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;