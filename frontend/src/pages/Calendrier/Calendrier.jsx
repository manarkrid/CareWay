import React, { useState } from 'react';
import './Calendrier.css';
import TabNavigation from '../../components/shared/TabNavigation';

const Calendrier = () => {
  const [activeTab, setActiveTab] = useState('Semaine');

  const tabs = [
    'Jour',
    'Semaine',
    'Mois',
    'Planning équipe'
  ];

  return (
    <div className="page-content full-width">
      <div className="page-header">
        <h1>Calendrier & Planning</h1>
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
      
      <div className="calendrier-content">
        <div className="calendrier-stats">
          <div className="stat-card">
            <h3>Trajets aujourd'hui</h3>
            <div className="stat-number">24</div>
          </div>
          <div className="stat-card">
            <h3>Équipe disponible</h3>
            <div className="stat-number">8/12</div>
          </div>
          <div className="stat-card">
            <h3>Véhicules libres</h3>
            <div className="stat-number">3/8</div>
          </div>
        </div>

        <div className="calendrier-view">
          <h3>Vue calendrier</h3>
          <p>Interface de calendrier et planning en cours de développement...</p>
        </div>
      </div>
    </div>
  );
};

export default Calendrier;