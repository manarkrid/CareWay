import React, { useState } from 'react';
import './TrajetsSection.css';
import { useTrips } from '../../../context/TripContext';

const TrajetsSection = () => {
  const { trips: trajetsData } = useTrips();
  const [selectedMonth, setSelectedMonth] = useState('Tout');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const months = ['Tout', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const filteredTrajets = trajetsData.filter(t => {
    return t.conducteur.toLowerCase().includes(searchTerm.toLowerCase()) || 
           t.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
           t.destination.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="section trajets-section">
      <div className="section-header">
        <h2>Trajets du mois</h2>
        <div className="section-actions">
          <select 
            className="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <button 
            className={`btn-filter ${showFilters ? 'active' : ''}`} 
            onClick={() => setShowFilters(!showFilters)}
          >
            Filtrer ⚙️
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filter-bar">
          <div className="search-input">
            <span>🔍</span>
            <input 
              type="text" 
              placeholder="Rechercher par conducteur, patient ou destination..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID Trajet</th>
              <th>Date</th>
              <th>Conducteur</th>
              <th>Patient</th>
              <th>Destination</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrajets.map((trajet, index) => (
              <tr key={index}>
                <td><strong>{trajet.id}</strong></td>
                <td>{trajet.date}</td>
                <td>{trajet.conducteur}</td>
                <td>{trajet.patient}</td>
                <td>{trajet.destination}</td>
                <td>
                  <span className={`status ${trajet.statut.toLowerCase() === 'terminé' ? 'available' : 'busy'}`}>
                    {trajet.statut}
                  </span>
                </td>
              </tr>
            ))}
            {filteredTrajets.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#666' }}>
                  Aucun trajet trouvé pour cette sélection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="upcoming-trajets">
        <h3>Trajets à venir</h3>
        <div className="upcoming-grid">
          <div className="upcoming-card">
            <div className="card-dot"></div>
            <div className="card-info">
              <span className="card-title">Annie Robert par Loic</span>
              <span className="card-subtitle">8:45 EHPAD → 10:45 Ct. Sidobre</span>
            </div>
          </div>
          <div className="upcoming-card">
            <div className="card-dot orange"></div>
            <div className="card-info">
              <span className="card-title">Paul Martin par Pierre</span>
              <span className="card-subtitle">11:30 Domicile → 12:15 Hôpital</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrajetsSection;