import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import CustomTooltip from '../../common/CustomTooltip';

interface PieChartProps {
  pieChartData: any; // Estructura de datos de la API para el gráfico de pastel
}

const PieChartComponent = ({ pieChartData }: PieChartProps) => {
  // Verifica si pieChartData está definido antes de usarlo
  if (!pieChartData) return null;

  // Estructura de datos para el gráfico de pastel
  const dataCampaigns = [
    { name: 'Paid Invoices', value: pieChartData.campaigns.total_paid_value, fillColor: '#82ca9d' },
    { name: 'Unpaid Invoices', value: pieChartData.campaigns.total_unpaid_value, fillColor: '#ffa584' },
  ];

  console.log(dataCampaigns)

  // const dataProjects = [
  //   { name: 'Paid Invoices', value: pieChartData.paidInvoices, fillColor: '#82ca9d' },
  //   { name: 'Unpaid Invoices', value: pieChartData.unpaidInvoices, fillColor: '#ff8e84' },
  // ];

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
            {dataCampaigns.map((entry, index) => (
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
          {dataCampaigns.map((entry, index) => (
            <div key={index} className="legend-item">
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