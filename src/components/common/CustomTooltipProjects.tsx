import React from 'react';
import { TooltipProps } from 'recharts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  pieChartData: any; // Estructura de datos de la API para el gráfico de pastel
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, pieChartData }) => {
  if (active && payload && payload.length) {
    const valueInDollars = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(payload[0]?.value ?? 0);

    let percentage;
    if (payload[0].name === 'Paid Invoices') {
      percentage = pieChartData.projects.total_paid_percentage.toFixed(2);
    } else if (payload[0].name === 'Unpaid Invoices') {
      percentage = pieChartData.projects.total_unpaid_percentage.toFixed(2);
    }

    return (
      <div className="chart-tooltip">
        <h4>{payload[0].name}</h4>
        <p>Value: {valueInDollars}</p>
        <p>Percentage: {percentage}%</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;