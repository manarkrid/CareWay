import React, { useState } from 'react';
import './Entreprise.css';
import TabNavigation from '../../components/shared/TabNavigation.jsx';
import EquipeSection from './components/EquipeSection.jsx';
import VehiculesSection from './components/VehiculesSection.jsx';
import TrajetsSection from './components/TrajetsSection.jsx';
import ContratsSection from './components/ContratsSection.jsx';
import HistoriqueSection from './components/HistoriqueSection.jsx';
import NotificationsSection from './components/NotificationsSection.jsx';
import SuiviGPSSection from './components/SuiviGPSSection.jsx';
import RapportsSection from './components/RapportsSection.jsx';

const Entreprise = () => {
  const [activeTab, setActiveTab] = useState('Tout');

  const tabs = ['Tout', 'Trajets du mois', 'Véhicules', 'Équipe', 'Contrats', 'GPS & Suivi', 'Rapports', 'Alertes'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Équipe':
        return <EquipeSection />;
      case 'Véhicules':
        return <VehiculesSection />;
      case 'Trajets du mois':
        return <TrajetsSection />;
      case 'Contrats':
        return <ContratsSection />;
      case 'GPS & Suivi':
        return <SuiviGPSSection />;
      case 'Rapports':
        return <RapportsSection />;
      case 'Alertes':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <NotificationsSection />
          </div>
        );
      default: // Tout
        return (
          <>
            <SuiviGPSSection />
            <div className="page-layout-grid">
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
            <RapportsSection />
          </>
        );
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Entreprise</h1>
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="entreprise-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Entreprise;
