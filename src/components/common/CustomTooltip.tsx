import React from 'react';
import { TooltipProps } from 'recharts';

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {

    const valueInDollars = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(payload[0]?.value ?? 0);

    return (
      <div className="chart-tooltip">
        <h4>{payload[0].name}</h4>
        <p>Value: {valueInDollars}</p>
        <p>Percentage: {((payload[0]?.value ?? 0) / 100).toFixed(2)}%</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
