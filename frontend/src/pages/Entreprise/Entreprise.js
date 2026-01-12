import React, { useState } from 'react';
import './Entreprise.css';
import TabNavigation from '../../components/shared/TabNavigation';
import EquipeSection from './components/EquipeSection';
import VehiculesSection from './components/VehiculesSection';
import TrajetsSection from './components/TrajetsSection';
import ContratsSection from './components/ContratsSection';
import HistoriqueSection from './components/HistoriqueSection';
import NotificationsSection from './components/NotificationsSection';

const Entreprise = () => {
  const [activeTab, setActiveTab] = useState('Tout');

  const tabs = [
    'Tout',
    'Trajets du mois',
    'Véhicules',
    'Équipe',
    'Alertes',
    'Contrats & Conventions',
    'Historique & Statistiques'
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Entreprise</h1>
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
      
      <div className="page-content">
        <div className="left-column">
          <EquipeSection />
          <VehiculesSection />
          <TrajetsSection />
        </div>
        
        <div className="right-column">
          <ContratsSection />
          <HistoriqueSection />
          <NotificationsSection />
        </div>
      </div>
    </div>
  );
};

export default Entreprise;