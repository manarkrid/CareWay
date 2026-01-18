import React from 'react';
import './ContratsSection.css';

const ContratsSection = () => {
  const contratsData = [
    {
      partenaire: 'CPAM Tarn',
      type: 'Public',
      statut: 'En cours'
    },
    {
      partenaire: 'Ct. du Sidobre',
      type: 'Privé',
      statut: 'En cours'
    }
  ];

  return (
    <div className="section contrats-section">
      <div className="section-header">
        <h2>Contrats & Conventions</h2>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Partenaire</th>
              <th>Type</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {contratsData.map((contrat, index) => (
              <tr key={index}>
                <td>{contrat.partenaire}</td>
                <td>{contrat.type}</td>
                <td>
                  <span className="status in-progress">
                    {contrat.statut}
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

export default ContratsSection;