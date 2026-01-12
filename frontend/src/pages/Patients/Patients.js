import React, { useState } from 'react';
import './Patients.css';
import TabNavigation from '../../components/shared/TabNavigation';

const Patients = () => {
  const [activeTab, setActiveTab] = useState('Tous');

  const tabs = [
    'Tous',
    'Actifs',
    'Nouveaux',
    'Historique'
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestion des patients</h1>
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
      
      <div className="patients-content">
        <div className="patients-stats">
          <div className="stat-card">
            <h3>Total patients</h3>
            <div className="stat-number">1,247</div>
          </div>
          <div className="stat-card">
            <h3>Nouveaux ce mois</h3>
            <div className="stat-number">23</div>
          </div>
          <div className="stat-card">
            <h3>Trajets moyens/patient</h3>
            <div className="stat-number">4.2</div>
          </div>
        </div>

        <div className="patients-list">
          <h3>Base de données patients</h3>
          <p>Interface de gestion des patients en cours de développement...</p>
        </div>
      </div>
    </div>
  );
};

export default Patients;