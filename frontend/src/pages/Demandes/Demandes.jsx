import React, { useState } from 'react';
import './Demandes.css';
import TabNavigation from '../../components/shared/TabNavigation.jsx';

const Demandes = () => {
  const [activeTab, setActiveTab] = useState('Nouvelles');

  const tabs = [
    'Nouvelles',
    'En cours',
    'Acceptées',
    'Refusées',
    'Terminées'
  ];

  // Styles inline pour forcer la largeur
  const containerStyle = {
    width: '100%',
    maxWidth: 'none',
    padding: '30px',
    margin: '0',
    boxSizing: 'border-box',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  };

  const contentStyle = {
    width: '100%',
    maxWidth: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  };

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: 'none'
  };

  const listStyle = {
    width: '100%',
    maxWidth: 'none',
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <div className="page-header">
        <h1>Demandes de transport</h1>
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
      
      <div style={contentStyle}>
        <div style={statsStyle}>
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

        <div style={listStyle}>
          <h3>Liste des demandes</h3>
          <p>Interface des demandes de transport en cours de développement...</p>
        </div>
      </div>
    </div>
  );
};

export default Demandes;