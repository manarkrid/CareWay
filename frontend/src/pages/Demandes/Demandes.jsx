import React, { useState } from 'react';
import './Demandes.css';

const Demandes = () => {
  const [view, setView] = useState('grid');
  const [mutualise, setMutualise] = useState(false);

  const demandes = [
    {
      id: 1,
      name: 'Marie Dubois',
      date: '30/06/25',
      time: '10h15',
      from: '4 rue Foch',
      to: 'CHIC Castres Mazamet',
      type: 'VSL',
      direction: 'Aller-simple',
      distance: '22km',
      duration: '35mins',
      status: 'Attente',
      wait: '1h',
      price: 54
    },
    {
      id: 2,
      name: 'François Dupont',
      date: '22/06/25',
      time: '8h30',
      from: '6 av. Trois',
      to: 'Clinique du Sidobre',
      type: 'VSL',
      direction: 'Aller-simple',
      distance: '22km',
      duration: '26mins',
      status: 'Attente',
      wait: '30mins',
      price: 43
    },
    {
      id: 3,
      name: 'Anne Pichet',
      date: '20/06/25',
      time: '9h15',
      from: '32 rue du Lilas',
      to: 'EHPAD',
      type: 'VSL',
      direction: 'Aller-simple',
      distance: '19km',
      duration: '15mins',
      price: 36
    }
  ];

  const priceMarkers = [
    { price: 36, left: '15%', top: '25%' },
    { price: 25, left: '25%', top: '35%' },
    { price: 35, left: '30%', top: '40%' },
    { price: 54, left: '45%', top: '35%' },
    { price: 42, left: '35%', top: '50%' },
    { price: 43, left: '40%', top: '60%' },
    { price: 51, left: '50%', top: '55%' },
    { price: 22, left: '60%', top: '50%' },
    { price: 23, left: '55%', top: '65%' },
    { price: 34, left: '65%', top: '65%' },
    { price: 35, left: '70%', top: '55%' },
    { price: 50, left: '80%', top: '70%' },
    { price: 45, left: '75%', top: '80%' },
    { price: 43, left: '85%', top: '80%' }
  ];

  return (
    <div className="demandes-page">
      <div className="demandes-header">
        <h1>Demandes de trajets</h1>
      </div>

      <div className="demandes-main-content">
        <div className="demandes-left-column">
          {/* Controls */}
          <div className="demandes-controls-bar">
            <div className="controls-left-group">
              <span className="demandes-info">23 résultats • Juin 14 - 30</span>
              
              <button className="btn-plus">⊕ Plus</button>

              <div className="view-toggle-group">
                <button 
                  className={`view-btn ${view === 'grid' ? 'active' : ''}`}
                  onClick={() => setView('grid')}
                >
                  ⊞
                </button>
                <button 
                  className={`view-btn ${view === 'list' ? 'active' : ''}`}
                  onClick={() => setView('list')}
                >
                  ☰
                </button>
              </div>
            </div>

            <div className="controls-right-group">
              <div className="mutualise-toggle">
                <span>Mutualisé</span>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={mutualise}
                    onChange={() => setMutualise(!mutualise)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="sort-filter">
                Trier par : <span className="sort-value">Prix</span>
              </div>
            </div>
          </div>

          {/* Demandes Cards */}
          <div className="demandes-list">
            {demandes.map(demande => (
              <div key={demande.id} className="demande-card">
                <div className="demande-header-row">
                  <div>
                    <h3>{demande.name}</h3>
                    <span className="demande-date">{demande.date} • {demande.time}</span>
                  </div>
                  <div className="demande-price">{demande.price}€</div>
                </div>

                <div className="demande-route">
                  <span className="route-icon">📍</span>
                  <div className="route-details">
                    <div className="route-text">{demande.from} &gt; {demande.to}</div>
                    <div className="route-meta">
                      {demande.type}• {demande.direction}• {demande.distance}• {demande.duration}
                      {demande.status && `• ${demande.status}`}
                      {demande.wait && `• ${demande.wait}`}
                    </div>
                  </div>
                </div>

                <div className="demande-actions">
                  <button className="btn-accepter">🚗 Accepter</button>
                  <button className="btn-refuser">✕ Refuser</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="demandes-pagination">
            <button className="pagination-arrow">‹</button>
            {[1, 2, 3, 4].map(num => (
              <button key={num} className={`page-number ${num === 1 ? 'active' : ''}`}>
                {num}
              </button>
            ))}
            <span className="pagination-dots">...</span>
            <button className="page-number">6</button>
            <button className="pagination-arrow">›</button>
          </div>
        </div>

        {/* Right Column - Map */}
        <div >
          <div className="map-container">
            <div className="map-search">
              <button className="map-search-btn">🔍 Rechercher sur la carte</button>
            </div>

            <div className="map-controls">
              {['⊕', '⊖', '◎', '⟲'].map((icon, i) => (
                <button key={i} className="map-control-btn">{icon}</button>
              ))}
            </div>

            {priceMarkers.map((marker, index) => (
              <div 
                key={index}
                className="price-marker"
                style={{ left: marker.left, top: marker.top }}
              >
                {marker.price}€
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demandes;