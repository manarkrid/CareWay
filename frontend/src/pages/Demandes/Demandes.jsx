import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Demandes.css';

const createPriceIcon = (price) => L.divIcon({
  className: 'custom-price-marker',
  html: `<div class="price-marker-content">${price}€</div>`,
  iconSize: [40, 30], iconAnchor: [20, 15]
});

const priceMarkers = [
  { id: 1, price: 36, position: [43.605, 2.240] }, { id: 2, price: 25, position: [43.610, 2.245] },
  { id: 3, price: 35, position: [43.602, 2.235] }, { id: 4, price: 54, position: [43.615, 2.250] },
  { id: 5, price: 42, position: [43.595, 2.230] }, { id: 6, price: 43, position: [43.608, 2.242] },
  { id: 7, price: 51, position: [43.601, 2.248] }, { id: 8, price: 22, position: [43.590, 2.220] },
  { id: 9, price: 23, position: [43.612, 2.238] }, { id: 10, price: 34, position: [43.606, 2.246] },
];

const DetailModal = ({ demande, onClose, onUpdate }) => {
  const [notes, setNotes] = useState(demande.notes || '');
  const [statut, setStatut] = useState(demande.status || 'Attente');

  const handleSave = () => {
    onUpdate(demande.id, { statut, notes });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Détail de la mission</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="detail-row"><span className="detail-label">Patient</span><span>{demande.name}</span></div>
          <div className="detail-row"><span className="detail-label">Date</span><span>{demande.date} à {demande.time}</span></div>
          <div className="detail-row"><span className="detail-label">Départ</span><span>{demande.from}</span></div>
          <div className="detail-row"><span className="detail-label">Arrivée</span><span>{demande.to}</span></div>
          <div className="detail-row"><span className="detail-label">Type</span><span>{demande.type} • {demande.direction}</span></div>
          <div className="detail-row"><span className="detail-label">Distance</span><span>{demande.distance} • {demande.duration}</span></div>
          <div className="detail-row"><span className="detail-label">Prix</span><span className="detail-price">{demande.price}€</span></div>
          <div className="detail-row">
            <span className="detail-label">Statut</span>
            <select value={statut} onChange={e => setStatut(e.target.value)} className="detail-select">
              <option>Attente</option><option>Acceptée</option><option>Refusée</option>
              <option>En cours</option><option>Terminée</option>
            </select>
          </div>
          <div className="detail-notes">
            <span className="detail-label">Notes</span>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ajouter des notes..." rows={3} />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Annuler</button>
          <button className="btn-save" onClick={handleSave}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

const Demandes = ({ filterQuery = '' }) => {
  const [view, setView] = useState('grid');
  const [mutualise, setMutualise] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [demandes, setDemandes] = useState([]);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // ✅ Nouveau state pour le tri
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' = prix croissant, 'desc' = prix décroissant
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:3001/api/demandes')
      .then(res => res.json())
      .then(data => setDemandes(data))
      .catch(() => setDemandes([
        { id: 1, name: 'Marie Dubois', date: '30/06/25', time: '10h15', from: '4 rue Foch', to: 'CHIC Castres Mazamet', type: 'VSL', direction: 'Aller-simple', distance: '22km', duration: '35mins', status: 'Attente', wait: '1h', price: 54, mutualisable: true },
        { id: 2, name: 'François Dupont', date: '22/06/25', time: '8h30', from: '6 av. Trois', to: 'Clinique du Sidobre', type: 'VSL', direction: 'Aller-simple', distance: '22km', duration: '26mins', status: 'Attente', wait: '30mins', price: 43, mutualisable: false },
        { id: 3, name: 'Anne Pichet', date: '20/06/25', time: '9h15', from: '32 rue du Lilas', to: 'EHPAD', type: 'VSL', direction: 'Aller-simple', distance: '19km', duration: '15mins', status: 'Attente', price: 36, mutualisable: true },
        { id: 4, name: 'Jean Delarue', date: '29/06/25', time: '16h', from: '2 rue Tulipe', to: 'CHIC Castres Mazamet', type: 'Ambulance', direction: 'Aller-retour', distance: '11km', duration: '8mins', status: 'Attente', wait: '1h30', price: 23, mutualisable: true },
        { id: 5, name: 'Sophie Martin', date: '28/06/25', time: '11h00', from: '5 rue Pasteur', to: 'Clinique Nord', type: 'VSL', direction: 'Aller-simple', distance: '15km', duration: '20mins', status: 'Attente', price: 29, mutualisable: false },
        { id: 6, name: 'Paul Bernard', date: '27/06/25', time: '9h00', from: '10 av. Gambetta', to: 'Centre Médical', type: 'VSL', direction: 'Aller-retour', distance: '8km', duration: '12mins', status: 'Attente', price: 18, mutualisable: true },
      ]));
  }, []);

  const handleStatut = (id, statut) => {
    fetch(`http://localhost:3001/api/demandes/${id}/statut`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut })
    })
      .then(res => res.json())
      .then(updated => setDemandes(prev => prev.map(d => d.id === id ? { ...d, status: updated.status } : d)))
      .catch(() => setDemandes(prev => prev.map(d => d.id === id ? { ...d, status: statut } : d)));
  };

  const handleUpdate = (id, data) => {
    handleStatut(id, data.statut);
    setDemandes(prev => prev.map(d => d.id === id ? { ...d, notes: data.notes } : d));
  };

  const DEFAULT_CENTER = [43.6044, 2.2403];
  const DEFAULT_ZOOM = 13;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapInstance) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data[0]) mapInstance.flyTo([parseFloat(data[0].lat), parseFloat(data[0].lon)], 13);
    } catch {}
  };

  // ✅ Filtre par recherche + mutualisé + tri par prix
  const filtered = demandes
    .filter(d =>
      (d.name?.toLowerCase().includes(filterQuery.toLowerCase())) ||
      (d.from?.toLowerCase().includes(filterQuery.toLowerCase())) ||
      (d.to?.toLowerCase().includes(filterQuery.toLowerCase()))
    )
    // ✅ Filtre mutualisé : si activé, affiche seulement les trajets mutualisables
    .filter(d => mutualise ? d.mutualisable === true : true)
    // ✅ Tri par prix
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusClass = (status) => {
    if (status === 'Acceptée') return 'status-accepted';
    if (status === 'Refusée') return 'status-refused';
    if (status === 'En cours') return 'status-ongoing';
    if (status === 'Terminée') return 'status-done';
    return 'status-waiting';
  };

  return (
    <div className="demandes-page">
      <div className="demandes-header">
        <h1>Demandes de trajets</h1>
      </div>

      <div className="demandes-main-content">
        <div className="demandes-left-column">
          <div className="demandes-controls-bar">
            <div className="controls-left-group">
              <span className="demandes-info">{filtered.length} résultats</span>
              <div className="view-toggle-group">
                <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>⊞</button>
                <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>☰</button>
              </div>
            </div>
            <div className="controls-right-group">

              {/* ✅ Toggle Mutualisé fonctionnel */}
              <div className="mutualise-toggle">
                <span>Mutualisé</span>
                <label className="toggle-switch">
                  <input type="checkbox" checked={mutualise} onChange={() => {
                    setMutualise(!mutualise);
                    setCurrentPage(1); // reset page
                  }} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {/* ✅ Tri par prix fonctionnel avec dropdown */}
              <div className="sort-filter" style={{ position: 'relative' }}>
                <span onClick={() => setShowSortDropdown(!showSortDropdown)} style={{ cursor: 'pointer' }}>
                  Trier par : <span className="sort-value">
                    Prix {sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                </span>
                {showSortDropdown && (
                  <div className="sort-dropdown">
                    <div
                      className={`sort-option ${sortOrder === 'asc' ? 'active' : ''}`}
                      onClick={() => { setSortOrder('asc'); setShowSortDropdown(false); setCurrentPage(1); }}
                    >
                      Prix croissant ↑
                    </div>
                    <div
                      className={`sort-option ${sortOrder === 'desc' ? 'active' : ''}`}
                      onClick={() => { setSortOrder('desc'); setShowSortDropdown(false); setCurrentPage(1); }}
                    >
                      Prix décroissant ↓
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="demandes-list">
            {paginated.length > 0 ? paginated.map(demande => (
              <div key={demande.id} className={`demande-card ${getStatusClass(demande.status)}`}>
                <div className="demande-header-row">
                  <div>
                    <h3>{demande.name}</h3>
                    <span className="demande-date">{demande.date} • {demande.time}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <div className="demande-price">{demande.price}€</div>
                    {/* ✅ Badge mutualisé si applicable */}
                    {demande.mutualisable && (
                      <span className="badge-mutualise">Mutualisable</span>
                    )}
                    <span className={`status-badge ${getStatusClass(demande.status)}`}>{demande.status}</span>
                  </div>
                </div>
                <div className="demande-route">
                  <span className="route-icon">📍</span>
                  <div className="route-details">
                    <div className="route-text">{demande.from} → {demande.to}</div>
                    <div className="route-meta">{demande.type} • {demande.direction} • {demande.distance} • {demande.duration}{demande.wait && ` • attente ${demande.wait}`}</div>
                  </div>
                </div>
                <div className="demande-actions">
                  <button className="btn-detail" onClick={() => setSelectedDemande(demande)}>📋 Détail</button>
                  <button className="btn-accepter" onClick={() => handleStatut(demande.id, 'Acceptée')}
                    disabled={demande.status === 'Acceptée' || demande.status === 'Refusée'}>
                    🚗 {demande.status === 'Acceptée' ? 'Acceptée ✓' : 'Accepter'}
                  </button>
                  <button className="btn-refuser" onClick={() => handleStatut(demande.id, 'Refusée')}
                    disabled={demande.status === 'Acceptée' || demande.status === 'Refusée'}>
                    ✕ {demande.status === 'Refusée' ? 'Refusée' : 'Refuser'}
                  </button>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                Aucune demande {mutualise ? 'mutualisable ' : ''}trouvée
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="demandes-pagination">
              <button className="pagination-arrow" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button key={num} className={`page-number ${currentPage === num ? 'active' : ''}`} onClick={() => setCurrentPage(num)}>{num}</button>
              ))}
              <button className="pagination-arrow" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>›</button>
            </div>
          )}
        </div>

        <div className="demandes-map-section">
          <div className="map-container">
            <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
              <form className="map-search-form" onSubmit={handleSearch}>
                <input className="map-search-input" placeholder="Rechercher une adresse..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <button type="submit" className="map-search-btn-icon">🔍</button>
              </form>
            </div>
            <div className="map-controls">
              <button className="map-control-btn" onClick={() => mapInstance?.zoomIn()} title="Zoom +">⊕</button>
              <button className="map-control-btn" onClick={() => mapInstance?.zoomOut()} title="Zoom -">⊖</button>
              <button className="map-control-btn" onClick={() => mapInstance?.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM)} title="Reset">⟲</button>
            </div>
            <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} style={{ height: '100%', width: '100%', zIndex: 1 }} zoomControl={false} ref={setMapInstance}>
              <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
              {priceMarkers.map(m => (
                <Marker key={m.id} position={m.position} icon={createPriceIcon(m.price)}>
                  <Popup>Trajet : <strong>{m.price}€</strong></Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {selectedDemande && (
        <DetailModal demande={selectedDemande} onClose={() => setSelectedDemande(null)} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default Demandes;