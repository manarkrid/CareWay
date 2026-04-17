import React, { useState, useEffect, useRef } from 'react';
import API_BASE_URL from '../../services/apiConfig';
import './Header.css';

const Header = ({ user, onSearch, onNavigate, onLogout }) => {
  // --- Search State ---
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ pages: [], patients: [], demandes: [] });
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const searchRef = useRef(null);

  // --- Notifications State ---
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('careway_token');
        const response = await fetch(`${API_BASE_URL}/notifications`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        console.error("Erreur serveur notifications", err);
      }
    };
    fetchNotifications();
  }, []);

  // Fetch search
  useEffect(() => {
    if (!query || query.trim() === '') {
      setResults({ pages: [], patients: [], demandes: [] });
      return;
    }

    const fetchResults = async () => {
      setLoadingSearch(true);
      try {
        const token = localStorage.getItem('careway_token');
        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error("Erreur serveur recherche", err);
      } finally {
        setLoadingSearch(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSearchDropdown(true);
    if (onSearch) onSearch(value);
  };

  const handleNavigate = (action) => {
    if (onNavigate && action) onNavigate(action);
    setShowSearchDropdown(false);
    setQuery('');
    if (onSearch) onSearch('');
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('careway_token');
      await fetch(`${API_BASE_URL}/notifications/read-all`, { 
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const hasSearchResults = results.pages?.length > 0 || results.patients?.length > 0 || results.demandes?.length > 0;

  return (
    <header className="header">
      <div className="search-container" ref={searchRef}>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Recherche globale"
            className="search-input"
            value={query}
            onChange={handleSearchChange}
            onFocus={() => setShowSearchDropdown(true)}
          />
          {loadingSearch && <span className="search-spinner"></span>}
        </div>

        {showSearchDropdown && query.trim() !== '' && (
          <div className="global-search-dropdown">
            {!loadingSearch && !hasSearchResults ? (
              <div className="global-search-empty">Aucun résultat trouvé.</div>
            ) : (
              <div className="global-search-results">
                {results.pages?.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-title">Navigation</div>
                    {results.pages.map((item, idx) => (
                      <div key={`page-${idx}`} className="search-item" onClick={() => handleNavigate(item.id)}>
                        <span className="search-item-icon">{item.icon}</span>
                        <div className="search-item-text">
                          <div className="search-item-primary">{item.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {results.patients?.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-title">Patients</div>
                    {results.patients.map((item, idx) => (
                      <div key={`pa-${idx}`} className="search-item" onClick={() => handleNavigate(item.action)}>
                        <span className="search-item-icon">{item.icon}</span>
                        <div className="search-item-text">
                          <div className="search-item-primary">{item.label}</div>
                          <div className="search-item-secondary">{item.subLabel}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {results.demandes?.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-title">Trajets & Demandes</div>
                    {results.demandes.map((item, idx) => (
                      <div key={`de-${idx}`} className="search-item" onClick={() => handleNavigate(item.action)}>
                        <span className="search-item-icon">{item.icon}</span>
                        <div className="search-item-text">
                          <div className="search-item-primary">{item.label}</div>
                          <div className="search-item-secondary">{item.subLabel}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="header-actions">
        {user && (
          <div style={{ marginRight: '16px', fontWeight: '500', color: '#1e293b' }}>
            Bonjour, {user.firstName} 👋
          </div>
        )}

        <div className="notification-wrapper" ref={notifRef}>
          <div className="notification-icon" onClick={() => setShowNotifDropdown(!showNotifDropdown)}>
            🔔
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </div>

          {showNotifDropdown && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <span className="mark-read-btn" onClick={markAllAsRead}>Tout marquer comme lu</span>
                )}
              </div>
              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div className="notif-empty">Aucune notification</div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className={`notif-item ${!notif.read ? 'unread' : ''}`}>
                      <span className="notif-item-icon">{notif.icon}</span>
                      <div className="notif-item-content">
                        <h4>{notif.title}</h4>
                        <p>{notif.message}</p>
                        <span className="notif-time">{notif.time}</span>
                      </div>
                      {!notif.read && <div className="notif-unread-dot"></div>}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button className="header-logout-btn" onClick={onLogout} title="Se déconnecter">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Se déconnecter</span>
        </button>
      </div>
    </header>
  );
};

export default Header;