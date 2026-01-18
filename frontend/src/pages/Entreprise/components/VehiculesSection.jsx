import React from 'react';
import './VehiculesSection.css';

const VehiculesSection = () => {
  const vehiculesData = [
    {
      immatriculation: 'AB-133-BC',
      type: 'Ambulance',
      kilometrage: '45 000 km',
      maintenance: '26 août 2025',
      statut: 'Disponible'
    },
    {
      immatriculation: 'ZV-887-FV',
      type: 'VSL',
      kilometrage: '120 050 km',
      maintenance: '18 février 2027',
      statut: 'Disponible'
    }
  ];

  return (
    <div className="section vehicules-section">
      <div className="section-header">
        <h2>Véhicules</h2>
        <div className="section-actions">
          <button className="btn-primary">Ajouter un véhicule</button>
          <button className="btn-filter">Filtrer ⚙️</button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Immatriculation</th>
              <th>Type</th>
              <th>Kilométrage</th>
              <th>Maintenance</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {vehiculesData.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.immatriculation}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.kilometrage}</td>
                <td>{vehicle.maintenance}</td>
                <td>
                  <span className="status available">
                    {vehicle.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiculesSection;