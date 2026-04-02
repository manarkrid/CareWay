import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Demandes.css';

const createPriceIcon = (price) => {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `<div class="price-marker-content">${price}€</div>`,
    iconSize: [40, 30],
    iconAnchor: [20, 15]
  });
};

const Demandes = ({ filterQuery = '' }) => {
  const [view, setView] = useState('grid');
  const [mutualise, setMutualise] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const DEFAULT_CENTER = [43.6044, 2.2403];
  const DEFAULT_ZOOM = 13;

  const handleZoomIn = () => { if (mapInstance) mapInstance.zoomIn(); };
  const handleZoomOut = () => { if (mapInstance) mapInstance.zoomOut(); };
  const handleReset = () => { if (mapInstance) mapInstance.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM); };
  const handleGeolocate = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (mapInstance) {
            mapInstance.flyTo([position.coords.latitude, position.coords.longitude], 14);
          }
        },
        () => {
          alert("Impossible de récupérer votre position.");
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  const mapControls = [
    { icon: '⊕', action: handleZoomIn, title: 'Zoom avant' },
    { icon: '⊖', action: handleZoomOut, title: 'Zoom arrière' },
    { icon: '◎', action: handleGeolocate, title: 'Ma position' },
    { icon: '⟲', action: handleReset, title: 'Réinitialiser la vue' }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapInstance) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        mapInstance.flyTo([parseFloat(lat), parseFloat(lon)], 13);
      } else {
        alert("Lieu introuvable. Veuillez essayer avec une autre orthographe ou préciser le code postal.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau lors de la recherche du lieu.");
    }
  };

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
    { id: 1, price: 36, position: [43.605, 2.240] },
    { id: 2, price: 25, position: [43.610, 2.245] },
    { id: 3, price: 35, position: [43.602, 2.235] },
    { id: 4, price: 54, position: [43.615, 2.250] },
    { id: 5, price: 42, position: [43.595, 2.230] },
    { id: 6, price: 43, position: [43.608, 2.242] },
    { id: 7, price: 51, position: [43.601, 2.248] },
    { id: 8, price: 22, position: [43.590, 2.220] },
    { id: 9, price: 23, position: [43.612, 2.238] },
    { id: 10, price: 34, position: [43.606, 2.246] },
    { id: 11, price: 35, position: [43.598, 2.234] },
    { id: 12, price: 50, position: [43.620, 2.255] },
    { id: 13, price: 45, position: [43.592, 2.228] },
    { id: 14, price: 43, position: [43.618, 2.240] }
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
            {demandes
              .filter(d =>
                (d.name && d.name.toLowerCase().includes(filterQuery.toLowerCase())) ||
                (d.from && d.from.toLowerCase().includes(filterQuery.toLowerCase())) ||
                (d.to && d.to.toLowerCase().includes(filterQuery.toLowerCase()))
              )
              .map(demande => (
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
        <div className="demandes-map-section">
          <div className="map-container">
            <div className="map-search" style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
              <form className="map-search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="map-search-input"
                  placeholder="Rechercher une ville, une adresse..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="map-search-btn-icon">🔍</button>
              </form>
            </div>

            <div className="map-controls">
              {mapControls.map((control, i) => (
                <button
                  key={i}
                  className="map-control-btn"
                  onClick={control.action}
                  title={control.title}
                >
                  {control.icon}
                </button>
              ))}
            </div>

            <MapContainer
              center={DEFAULT_CENTER}
              zoom={DEFAULT_ZOOM}
              style={{ height: '100%', width: '100%', zIndex: 1 }}
              zoomControl={false}
              ref={setMapInstance}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              {priceMarkers.map(marker => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  icon={createPriceIcon(marker.price)}
                >
                  <Popup>
                    Trajet potentiel : <strong>{marker.price}€</strong>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demandes;