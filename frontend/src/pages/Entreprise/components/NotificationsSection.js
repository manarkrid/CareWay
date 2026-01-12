import React from 'react';
import './NotificationsSection.css';

const NotificationsSection = () => {
  const notifications = [
    { 
      label: 'Refus auto', 
      description: 'Trajets à 15€ / à -3km',
      enabled: true 
    },
    { 
      label: 'Refus auto', 
      description: 'Trajets à 1h d\'avance',
      enabled: true 
    },
    { 
      label: 'Notification conflit planning', 
      description: '',
      enabled: true 
    },
    { 
      label: 'Alerte maintenance véhicule', 
      description: '7j avant',
      enabled: true 
    }
  ];

  return (
    <div className="section notifications-section">
      <div className="section-header">
        <h2>Notifications & réglages</h2>
      </div>
      
      <div className="notifications-list">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div className="notification-info">
              <div className="notification-label">{notification.label}</div>
              {notification.description && (
                <div className="notification-description">{notification.description}</div>
              )}
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                checked={notification.enabled} 
                readOnly
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSection;