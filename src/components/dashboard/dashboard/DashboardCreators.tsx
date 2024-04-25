import React, { useEffect, useState } from "react";
import icon from '@/components/assets/icons/icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from "@/components/assets/svg/Arrow";
import HelpIcon from '../../assets/svg/Help';
import Add from "@/components/assets/icons/add.svg";
import CreatorSidepanel from "@/components/dashboard/profile/CreatorSidepanel";
import CreatorDetails from "@/components/dashboard/profile/CreatorProfile"; // Corrección aquí

interface DashboardCreatorsProps {
  creatorsData: any; // Estructura de datos de la API para los creadores
}

const DashboardCreators = ({ creatorsData }: DashboardCreatorsProps) => {
  const [selectedCreator, setSelectedCreator] = useState(null); // Estado para el creador seleccionado

  // Función para manejar el clic en una fila
  const openCreatorDetail = (creator) => {
    setSelectedCreator(creator); // Establece el creador seleccionado
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
          {creatorsData.map((creator) => (
            <tr className="table-row" key={creator.id}>
              <td className="table-cell">
                <div className='row-wrap-1'>
                  <Link
                    href={{
                      pathname: '/dashboard/clients/creators/profile',
                      query: { creatorId: creator.id }
                    }}
                    passHref // Importante agregar esto para que el Link pase las props al elemento anidado
                  >
                    <p>{creator.name}</p>
                  </Link>
                </div>
              </td>
              <td className="table-cell-center-full">
                <span className={`status-tag ${creator.active_projects ? 'green' : 'pink'}`}>
                  {creator.active_campaigns ? 'Paid' : 'Unpaid'}
                </span>
              </td>
              <td className="table-cell-center">12/30/2023</td>
              <td className="table-cell-center">${creator.active_projects_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Renderiza el componente de detalles del creador si hay uno seleccionado */}
      {selectedCreator && (
        <CreatorSidepanel creatorsData={selectedCreator} />
      )}
    </div>
  );
};

export default DashboardCreators;