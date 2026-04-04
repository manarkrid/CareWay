import React, { useState, useEffect } from 'react';
import './HistoriqueSection.css';

const HistoriqueSection = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/entreprise/historique')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  if (!stats) return <div className="section historique-section">Chargement...</div>;

  const displayItems = [
    { label: 'Total trajets', value: stats.totalTrajets },
    { label: 'Retards signalés', value: stats.retards, color: '#f44336' },
    { label: 'Annulations patients', value: stats.annulations, color: '#ff9800' },
    { label: 'Incidents transports', value: stats.incidents, color: '#f44336' }
  ];

  return (
    <div className="section historique-section">
      <div className="section-header">
        <h2>Historique & Statistiques</h2>
      </div>
      
      <div className="stats-grid">
        {displayItems.map((item, index) => (
          <div key={index} className="stat-card">
            <span className="stat-label">{item.label}</span>
            <span className="stat-value" style={{ color: item.color || '#333' }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="satisfaction-box">
        <div className="satisfaction-header">
          <span>Taux de satisfaction</span>
          <span>{stats.tauxSatisfaction}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: stats.tauxSatisfaction }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HistoriqueSection;