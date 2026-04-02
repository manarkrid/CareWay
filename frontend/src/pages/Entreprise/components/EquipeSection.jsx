import React, { useState, useEffect } from 'react';
import './EquipeSection.css';

const EquipeSection = () => {
  const [equipeData, setEquipeData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/entreprise/equipe')
      .then(res => res.json())
      .then(data => setEquipeData(data))
      .catch(() => setEquipeData([
        { nom: 'Loic Dupont', emplacement: 'Castres', absence: 2, activite: 90, statut: 'Disponible' },
        { nom: 'Pierre Bois', emplacement: 'Toulouse', absence: 1, activite: 95, statut: 'En trajet' },
      ]));
  }, []);

  return (
    <div className="section equipe-section">
      <div className="section-header">
        <h2>Équipe</h2>
        <div className="section-actions">
          <button className="btn-primary">Ajouter un salarié</button>
          <button className="btn-filter">Filtrer ⚙️</button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nom de l'employé</th>
              <th>Emplacement</th>
              <th>Absence</th>
              <th>Taux d'activité</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {equipeData.map((employee, index) => (
              <tr key={index}>
                <td>
                  <div className="employee-info">
                    <div className="employee-avatar">👤</div>
                    <span>{employee.nom}</span>
                  </div>
                </td>
                <td>{employee.emplacement}</td>
                <td>{employee.absence}</td>
                <td><span className="activity-rate">+{employee.activite}%</span></td>
                <td>
                  <span className={`status ${employee.statut === 'Disponible' ? 'available' : 'busy'}`}>
                    {employee.statut}
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

export default EquipeSection;