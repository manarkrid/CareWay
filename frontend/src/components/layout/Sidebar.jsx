import React from 'react';
import './Sidebar.css';


const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Tableau de bord' },
    { id: 'transactions', icon: '💳', label: 'Transactions' },
    { id: 'demandes', icon: '📋', label: 'Demandes' },
    { id: 'entreprise', icon: '🏢', label: 'Entreprise' },
    { id: 'patients', icon: '👥', label: 'Patients' },
    { id: 'calendrier', icon: '📅', label: 'Calendrier' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img
  src="/images/carewaylg.jpg"
  alt="CareWay Logo"
 
  style={{ width: '120px' }}
/>


         
        </div>
      </div>
      
      <div className="user-profile">
        <div className="user-avatar">👤</div>
        <div className="user-info">
          <div className="user-name">Pierre Michel</div>
          <div className="user-role">Transporteur coordinateur</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div 
          className={`profile-section ${currentPage === 'profil' ? 'active' : ''}`}
          onClick={() => setCurrentPage('profil')}
        >
          <span className="profile-icon">👤</span>
          <span>Profil</span>
        </div>
        
        <div className="trip-info">
          <div className="trip-badge">
            <span className="trip-date">31</span>
            <span className="trip-label">Trajet à venir</span>
          </div>
          <div className="trip-details">
            <span className="trip-participant">🔴 Annie Robert par Loic</span>
          </div>
          <div className="trip-time">
            <span className="departure">8:45 EHPAD</span>
            <span className="arrow">→</span>
            <span className="arrival">10:45 Ct. Sidobre</span>
          </div>
          <button className="trip-details-btn">📋 Plus de détails</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;