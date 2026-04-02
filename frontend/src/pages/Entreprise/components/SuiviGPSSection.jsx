import React, { useState, useEffect } from 'react';
import './SuiviGPSSection.css';

// Positions simulées des chauffeurs (mise à jour toutes les 5s)
const generatePositions = () => [
  { id: 1, nom: 'Loïc Dupont', statut: 'En trajet', lat: 43.6044 + (Math.random() - 0.5) * 0.02, lng: 2.2403 + (Math.random() - 0.5) * 0.02, mission: 'CHIC Castres → EHPAD', vitesse: Math.floor(Math.random() * 60 + 20) },
  { id: 2, nom: 'Pierre Bois', statut: 'En trajet', lat: 43.6100 + (Math.random() - 0.5) * 0.02, lng: 2.2500 + (Math.random() - 0.5) * 0.02, mission: 'Clinique Nord → Domicile', vitesse: Math.floor(Math.random() * 50 + 10) },
  { id: 3, nom: 'Jose Gomez', statut: 'Disponible', lat: 43.5980 + (Math.random() - 0.5) * 0.01, lng: 2.2300 + (Math.random() - 0.5) * 0.01, mission: null, vitesse: 0 },
  { id: 4, nom: 'Marie Lefèvre', statut: 'En trajet', lat: 43.6150 + (Math.random() - 0.5) * 0.02, lng: 2.2600 + (Math.random() - 0.5) * 0.02, mission: 'Centre Médical → Résidence', vitesse: Math.floor(Math.random() * 70 + 30) },
];

const SuiviGPSSection = () => {
  const [chauffeurs, setChauffeurs] = useState(generatePositions());
  const [gpsActif, setGpsActif] = useState(true);
  const [selected, setSelected] = useState(null);

  // Simulation temps réel : mise à jour toutes les 5 secondes
  useEffect(() => {
    if (!gpsActif) return;
    const interval = setInterval(() => {
      setChauffeurs(generatePositions());
    }, 5000);
    return () => clearInterval(interval);
  }, [gpsActif]);

  return (
    <div className="section suivi-gps-section">
      <div className="section-header">
        <h2>📍 Suivi GPS en temps réel</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: gpsActif ? '#28a745' : '#dc3545' }}>
            {gpsActif ? '● Actif' : '● Inactif'}
          </span>
          <button className={gpsActif ? 'btn-filter' : 'btn-primary'} onClick={() => setGpsActif(!gpsActif)}>
            {gpsActif ? 'Désactiver GPS' : 'Activer GPS'}
          </button>
        </div>
      </div>

      <div className="gps-layout">
        {/* Liste chauffeurs */}
        <div className="gps-list">
          {chauffeurs.map(c => (
            <div key={c.id} className={`gps-card ${selected === c.id ? 'selected' : ''}`} onClick={() => setSelected(c.id === selected ? null : c.id)}>
              <div className="gps-avatar">{c.nom.charAt(0)}</div>
              <div className="gps-info">
                <div className="gps-name">{c.nom}</div>
                {c.mission && <div className="gps-mission">{c.mission}</div>}
                <div className="gps-coords">
                  {c.lat.toFixed(4)}, {c.lng.toFixed(4)}
                  {c.vitesse > 0 && <span className="gps-speed"> • {c.vitesse} km/h</span>}
                </div>
              </div>
              <span className={`status ${c.statut === 'Disponible' ? 'available' : 'busy'}`}>{c.statut}</span>
            </div>
          ))}
        </div>

        {/* Carte simulée */}
        <div className="gps-map-placeholder">
          <div className="gps-map-header">
            <span>🗺️ Carte en temps réel</span>
            {gpsActif && <span className="gps-refresh">↻ Mise à jour auto (5s)</span>}
          </div>
          <div className="gps-map-body">
            {chauffeurs.map(c => (
              <div key={c.id} className={`gps-dot ${c.statut === 'En trajet' ? 'moving' : 'idle'}`}
                style={{
                  left: `${((c.lng - 2.22) / 0.06) * 100}%`,
                  top: `${((43.62 - c.lat) / 0.04) * 100}%`
                }}
                title={`${c.nom} - ${c.statut}`}
              >
                <span className="gps-dot-label">{c.nom.split(' ')[0]}</span>
              </div>
            ))}
            <div className="gps-map-legend">
              <span className="legend-dot moving"></span> En trajet
              <span className="legend-dot idle" style={{ marginLeft: 12 }}></span> Disponible
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuiviGPSSection;
