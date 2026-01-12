import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="search-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-actions">
        <div className="notification-icon">
          🔔
          <span className="notification-badge">1</span>
        </div>
      </div>
    </header>
  );
};

export default Header;