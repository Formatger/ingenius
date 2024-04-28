import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import CustomTooltipProjects from '../../common/CustomTooltipProjects';

interface PieChartProps {
  pieChartData: any; // Estructura de datos de la API para el gráfico de pastel
}

const PieChartComponent = ({ pieChartData }: PieChartProps) => {
  // Verifica si pieChartData está definido antes de usarlo
  if (!pieChartData) return null;

  // Estructura de datos para el gráfico de pastel
  const dataProjects = [
    { name: 'Paid Invoices', value: pieChartData.projects.total_paid_value, fillColor: '#82ca9d' },
    { name: 'Unpaid Invoices', value: pieChartData.projects.total_unpaid_value, fillColor: '#ffa584' },
  ];

  console.log(dataProjects)

  return (
    <div className="dashboard-box piechart">
      <div className="chart-header">
        <h5 className="dashboard-title">Total Invoices Value</h5>
      </div>
      <div className="chart-wrap">
        <PieChart width={400} height={320}>
          <Pie
            data={dataProjects}
            cx={200}
            cy={200}
            labelLine={true}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            // label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
            label={({ value }) => `$${value.toLocaleString()}`}
          >
            {dataProjects.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fillColor} />
            ))}
          </Pie>
          <Tooltip 
          content={
              <CustomTooltipProjects
              pieChartData={pieChartData}
              />} 
          />
        </PieChart>

        <div className="chart-legend">
          {dataProjects.map((entry, index) => (
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