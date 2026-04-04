import React, { useState, useEffect } from 'react';
import './NotificationsSection.css';

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchSettings = () => {
    fetch('http://localhost:3001/api/entreprise/notifications/settings')
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error("Error fetching notification settings:", err));
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleToggle = (id, currentStatus) => {
    fetch(`http://localhost:3001/api/entreprise/notifications/settings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: !currentStatus })
    })
    .then(res => res.json())
    .then(() => fetchSettings())
    .catch(err => console.error("Error updating setting:", err));
  };

  return (
    <div className="section notifications-section">
      <div className="section-header">
        <h2>Notifications & réglages</h2>
      </div>
      
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
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
                onChange={() => handleToggle(notification.id, notification.enabled)}
                className="toggle-input"
                id={`toggle-${notification.id}`}
              />
              <label htmlFor={`toggle-${notification.id}`} className="toggle-slider"></label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSection;