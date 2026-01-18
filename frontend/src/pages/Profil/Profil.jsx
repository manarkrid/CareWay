import React, { useState } from 'react';
import './Profil.css';
import TabNavigation from '../../components/shared/TabNavigation';

const Profil = () => {
  const [activeTab, setActiveTab] = useState('Informations');

  const tabs = [
    'Informations',
    'Sécurité',
    'Préférences',
    'Notifications'
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Profil utilisateur</h1>
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
      
      <div className="profil-content">
        <div className="profil-card">
          <div className="profil-avatar">
            <div className="avatar-circle">PM</div>
            <button className="change-avatar">Changer la photo</button>
          </div>
          
          <div className="profil-info">
            <h2>Pierre Michel</h2>
            <p className="role">Transporteur coordinateur</p>
            <p className="email">pierre.michel@careway.fr</p>
          </div>
        </div>

        <div className="profil-form">
          <h3>Informations personnelles</h3>
          <p>Interface de gestion du profil en cours de développement...</p>
        </div>
      </div>
    </div>
  );
};

export default Profil;