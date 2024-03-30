import React from "react";

interface ArrowProps {
  className?: string;
}

export const Arrow: React.FC<ArrowProps> = ({ className = '' }) => {
  return (
<svg className={`arrow ${className}`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.52892 5.47149C8.78927 5.73184 9.21138 5.73184 9.47173 5.47149C9.73208 5.21114 9.73208 4.78903 9.47173 4.52868L5.47173 0.528677C5.21138 0.268328 4.78927 0.268328 4.52892 0.528677L0.528922 4.52868C0.268572 4.78903 0.268572 5.21114 0.528922 5.47149C0.789271 5.73184 1.21138 5.73184 1.47173 5.47149L5.00033 1.94289L8.52892 5.47149Z" 
fill="var(--arrow-fill, #161b22)"/>
</svg>
  );
};

export default Arrow;