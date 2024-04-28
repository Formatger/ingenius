import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Arrow } from "@/components/assets/svg/Arrow";
import CustomTooltip from '../../common/CustomTooltip';

interface ChartData {
  name: string;
  value: number;
  fillColor: string;
}

const data: ChartData[] = [
  { name: 'Paid Invoices', value: 7000, fillColor: '#82ca9d' },
  { name: 'Unpaid Invoices', value: 3000, fillColor: '#ffcd58' },
];

const PieChartComponent = () => {

  return (
    <div className="dashboard-box">
      <div className="chart-header">
        <h5 className="dashboard-title">Invoices</h5>
        {/* <div className="row-wrap-1">
            <button className="row-wrap" onClick={undefined}>
              <p className="timeline-text">Monthly </p>
              <Arrow className="gray-fill arrow-down" />
            </button>
          </div> */}
      </div>
      <div className="chart-wrap">
        <PieChart width={400} height={320}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fillColor} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip pieChartData={{}} payload={[]} active={false} />} />
        </PieChart>

        <div className="chart-legend">
          {data?.map((entry, index) => (
            <div key={`${entry.name}-entry-${index}`} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: entry.fillColor }}></span>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default PieChartComponent;

