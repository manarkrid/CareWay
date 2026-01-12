import React from 'react';
import './TrajetsSection.css';

const TrajetsSection = () => {
  const trajetsData = [
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
      statut: 'En trajet'
    }
  ];

  return (
    <div className="section trajets-section">
      <div className="section-header">
        <h2>Trajets du mois</h2>
        <button className="btn-filter">Filtrer ⚙️</button>
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
            {trajetsData.map((trajet, index) => (
              <tr key={index}>
                <td>{trajet.immatriculation}</td>
                <td>{trajet.type}</td>
                <td>{trajet.kilometrage}</td>
                <td>{trajet.maintenance}</td>
                <td>
                  <span className={`status ${trajet.statut === 'Disponible' ? 'available' : 'busy'}`}>
                    {trajet.statut}
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

export default TrajetsSection;