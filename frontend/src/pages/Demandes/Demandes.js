import React, { useState } from 'react';
import './Demandes.css';
import TabNavigation from '../../components/shared/TabNavigation';

const Demandes = () => {
  const [activeTab, setActiveTab] = useState('Nouvelles');

  const tabs = [
    'Nouvelles',
    'En cours',
    'Acceptées',
    'Refusées',
    'Terminées'
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Demandes de transport</h1>
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
      
      <div className="demandes-content">
        <div className="demandes-stats">
          <div className="stat-card">
            <h3>Nouvelles demandes</h3>
            <div className="stat-number">8</div>
          </div>
          <div className="stat-card">
            <h3>En cours</h3>
            <div className="stat-number">15</div>
          </div>
          <div className="stat-card">
            <h3>Taux d'acceptation</h3>
            <div className="stat-number">92%</div>
          </div>
        </div>

        <div className="demandes-list">
          <h3>Liste des demandes</h3>
          <p>Interface des demandes de transport en cours de développement...</p>
        </div>
      </div>
    </div>
  );
};

export default Demandes;