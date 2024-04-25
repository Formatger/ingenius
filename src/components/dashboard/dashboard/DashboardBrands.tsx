import React, { useEffect, useState } from "react";
import icon from '@/components/assets/icons/icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from "@/components/assets/svg/Arrow";
import HelpIcon from '../../assets/svg/Help';
import Add from "@/components/assets/icons/add.svg";
import BrandSidepanel from "@/components/dashboard/profile/BrandSidepanel";

interface DashboardBrandsProps {
  brandsData: any; // Estructura de datos de la API para el gráfico de pastel
}

const DashboardBrands = ({ brandsData }: DashboardBrandsProps) => {

  console.log("BRANDS DATA", brandsData);

  const [selectedCreator, setSelectedCreator] = useState(null); // Estado para el creador seleccionado

  // Función para manejar el clic en una fila
  const openCreatorDetail = (brand) => {
    setSelectedCreator(brand); // Establece el creador seleccionado
  };

  return (
    <div className="dashboard-box">
      <div className="row-between">
        <h2 className="dashboard-title">Creators</h2>
        <HelpIcon />
      </div>
  
      <table className="app-table" id="dashboard-table">
        <thead>
          <tr className="table-header">
            <th>
              <div className="table-header-content">
                <p>Name</p>
                <button className="header-button" onClick={undefined}>
                  <Arrow className="gray-fill arrow-down" />
                </button>
              </div>
            </th>
            <th>
              <div className="table-header-content-center" onClick={undefined}>
                <p>Status</p>
                <button className="header-button">
                  <Arrow className="gray-fill arrow-down" />
                </button>
              </div>
            </th>
            <th>
              <div className="table-header-content-center" onClick={undefined}>
                <p>Earliest Due</p>
                <button className="header-button">
                  <Arrow className="gray-fill arrow-down" />
                </button>
              </div>
            </th>
            <th>
              <div className="table-header-content-center" onClick={undefined}>
                <p>Amount</p>
                <button className="header-button">
                  <Arrow className="gray-fill arrow-down" />
                </button>
              </div>
            </th>
          </tr>
        </thead>
  
        <tbody className="table-body">
          {brandsData.map((brand) => (
            <tr className="table-row" key={brand.id}>
              <td className="table-cell">
                <div className='row-wrap-1'>
                  <Link
                    href={{
                      pathname: '/dashboard/clients/brands/profile',
                      query: { brandId: brand.id }
                    }}
                    passHref // Importante agregar esto para que el Link pase las props al elemento anidado
                  >
                    <p>{brand.name}</p>
                  </Link>
                </div>
              </td>
              <td className="table-cell-center-full">
                <span className={`status-tag ${brand.active_projects ? 'green' : 'pink'}`}>
                  {brand.active_campaigns ? 'Paid' : 'Unpaid'}
                </span>
              </td>
              <td className="table-cell-center">12/30/2023</td>
              <td className="table-cell-center">${brand.active_projects_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Renderiza el componente de detalles del creador si hay uno seleccionado */}
      {selectedCreator && (
        <BrandSidepanel brandsData={selectedCreator} />
      )}
    </div>
  );
};

export default DashboardBrands;