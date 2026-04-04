import React, { useState, useEffect } from 'react';
import './Sidebar.css';


const Sidebar = ({ currentPage, setCurrentPage, onLogout, user }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Tableau de bord' },
    { id: 'transactions', icon: '💳', label: 'Transactions' },
    { id: 'demandes', icon: '📋', label: 'Demandes' },
    { id: 'entreprise', icon: '🏢', label: 'Entreprise' },
    { id: 'patients', icon: '👥', label: 'Patients' },
    { id: 'calendrier', icon: '📅', label: 'Calendrier' }
  ];

  const [nextTrip, setNextTrip] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/entreprise/trajets/next')
      .then(res => res.json())
      .then(data => setNextTrip(data))
      .catch(err => console.error("Error fetching next trip:", err));
  }, []);

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
        <div className="user-avatar">{user?.firstName?.[0] || '👤'}</div>
        <div className="user-info">
          <div className="user-name">{user ? `${user.firstName} ${user.lastName}` : 'Utilisateur'}</div>
          <div className="user-role">{user?.role || 'Transporteur'}</div>
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


        {nextTrip && (
          <div className="trip-info">
            <div className="trip-badge">
              <span className="trip-date">{nextTrip.date}</span>
              <span className="trip-label">{nextTrip.label}</span>
            </div>
            <div className="trip-details">
              <span className="trip-participant">🔴 {nextTrip.participant}</span>
            </div>
            <div className="trip-time">
              <span className="departure">{nextTrip.departure}</span>
              <span className="arrow">→</span>
              <span className="arrival">{nextTrip.arrival}</span>
            </div>
            <button
              className="trip-details-btn"
              onClick={() => setShowDetails(!showDetails)}
            >
              📋 {showDetails ? 'Cacher détails' : 'Plus de détails'}
            </button>

            {showDetails && (
              <div className="trip-popup-details">
                <p><strong>Note:</strong> {nextTrip.details}</p>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;