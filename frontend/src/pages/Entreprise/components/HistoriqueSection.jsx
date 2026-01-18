import React from 'react';
import './HistoriqueSection.css';

const HistoriqueSection = () => {
  const stats = [
    { label: 'Total trajets acceptés/refusés', value: '3 359' },
    { label: 'Retards signalés', value: '3' },
    { label: 'Annulations patients', value: '12' },
    { label: 'Incidents transports', value: '1 (1 rapport dispo)' }
  ];

  return (
    <div className="section historique-section">
      <div className="section-header">
        <h2>Historique & Statistiques</h2>
      </div>
      
      <div className="stats-list">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoriqueSection;