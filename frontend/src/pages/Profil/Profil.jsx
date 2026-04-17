import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../services/apiConfig';
import './Profil.css';
import { FiCamera } from 'react-icons/fi';

// Composant GPS pour le chauffeur
const GPSTab = () => {
  const [gpsAutorise, setGpsAutorise] = useState(false);
  const [position, setPosition] = useState(null);
  const [envoi, setEnvoi] = useState(false);
  const [lastSent, setLastSent] = useState(null);
  const [error, setError] = useState('');

  const autoriserGPS = () => {
    if (!('geolocation' in navigator)) {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsAutorise(true);
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy });
        setError('');
      },
      () => setError("Accès GPS refusé. Veuillez autoriser la géolocalisation dans votre navigateur.")
    );
  };

  const envoyerPosition = () => {
    if (!position) return;
    setEnvoi(true);
    // Simulation envoi au backend
    setTimeout(() => {
      setLastSent(new Date().toLocaleTimeString('fr-FR'));
      setEnvoi(false);
    }, 800);
  };

  // Mise à jour automatique toutes les 30s si GPS autorisé
  useEffect(() => {
    if (!gpsAutorise) return;
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
        () => {}
      );
    }, 30000);
    return () => clearInterval(interval);
  }, [gpsAutorise]);

  return (
    <div className="profil-content">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 20 }}>
          <h3 style={{ marginBottom: 12, fontSize: 16 }}>📍 Suivi GPS</h3>
          <p style={{ fontSize: 14, color: '#6c757d', marginBottom: 16 }}>
            Autorisez l'accès à votre position pour permettre au coordinateur de vous suivre en temps réel.
          </p>
          {error && <div style={{ color: '#dc3545', fontSize: 13, marginBottom: 12 }}>{error}</div>}
          {!gpsAutorise ? (
            <button className="save-button" onClick={autoriserGPS}>🔓 Autoriser l'accès GPS</button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#d4edda', borderRadius: 6, padding: 12, fontSize: 14 }}>
                ✅ GPS autorisé
                {position && (
                  <div style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 13 }}>
                    Lat: {position.lat.toFixed(5)} | Lng: {position.lng.toFixed(5)}<br/>
                    Précision: ±{Math.round(position.accuracy)}m
                  </div>
                )}
              </div>
              <button className="save-button" onClick={envoyerPosition} disabled={envoi}>
                {envoi ? '⏳ Envoi...' : '📡 Envoyer ma position'}
              </button>
              {lastSent && <div style={{ fontSize: 13, color: '#28a745' }}>✓ Dernière mise à jour : {lastSent}</div>}
              <button className="cancel-button" onClick={() => { setGpsAutorise(false); setPosition(null); }}>
                🔒 Révoquer l'accès GPS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Profil = ({ user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('Modifier le profil');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/users/profile/${user.id}`);
      if (!res.ok) throw new Error('Erreur lors du chargement du profil');
      const data = await res.json();
      setUserData(data);
      setEditData({ ...data, password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = ['Modifier le profil', 'Préférences', 'Sécurité', 'GPS'];

  const handleEdit = () => {
    setSuccess('');
    setError('');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData({ ...userData, password: '' });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    try {
      const dataToSave = { ...editData };
      if (!dataToSave.password) {
        delete dataToSave.password;
      }

      const res = await fetch(`${API_BASE_URL}/users/profile/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

      const updatedUser = await res.json();
      setUserData(updatedUser);
      setEditData({ ...updatedUser, password: '' });
      setIsEditing(false);
      setSuccess('Modifications enregistrées avec succès!');

      if (onUpdateUser) {
        onUpdateUser(updatedUser);
        localStorage.setItem('careway_user', JSON.stringify(updatedUser));
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleChangePhoto = () => {
    alert('Fonction de changement de photo non implémentée.');
  };

  const fields = [
    { label: 'Prénom', field: 'firstName' },
    { label: 'Nom', field: 'lastName' },
    { label: 'Email', field: 'email' },
    { label: 'Date de naissance', field: 'birthDate', placeholder: 'ex: 25 Janvier 1990' },
    { label: 'Mot de passe', field: 'password', type: 'password', placeholder: 'Nouveau mot de passe (laisser vide si inchangé)' },
    { label: 'Adresse', field: 'address' },
    { label: 'Code Postal', field: 'postalCode' },
    { label: 'Ville', field: 'city' },
    { label: 'Pays', field: 'country' }
  ];

  if (loading || !userData) {
    return <div className="profil-container"><div className="profil-card">Chargement de votre profil...</div></div>;
  }

  return (
    <div className="profil-container">
      <div className={`profil-card ${isEditing ? 'editing' : 'not-editing'}`}>
        <div className="profil-header">
          <div className="profil-title">Mon profil</div>
          <div className="profil-tabs">
            {tabs.map((tab, i) => (
              <button
                key={i}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {error && <div style={{ color: 'red', padding: '10px', textAlign: 'center', backgroundColor: '#fee2e2', borderRadius: '4px', margin: '10px' }}>{error}</div>}
        {success && <div style={{ color: 'green', padding: '10px', textAlign: 'center', backgroundColor: '#d1fae5', borderRadius: '4px', margin: '10px' }}>{success}</div>}

        {activeTab === 'Modifier le profil' && (
          <div className="profil-content">
            <div className="avatar-section">
              <div className="avatar-container">
                <div className="avatar-circle">
                  {userData.firstName?.[0]}{userData.lastName?.[0]}
                </div>
                <div className="change-avatar-icon" onClick={handleChangePhoto}>
                  <FiCamera size={16} />
                </div>
              </div>
              <div className="avatar-info">
                <div className="avatar-name">{userData.firstName} {userData.lastName}</div>
                <div className="avatar-details">
                  <span className="avatar-role">{userData.role || 'Transporteur coordinateur'}</span>
                  <span className="avatar-email">{userData.email}</span>
                </div>
              </div>
            </div>

            <div className="form-section">
              {fields.map((item, i) => (
                <div key={i} className="form-row">
                  <div className="form-label">{item.label}</div>
                  {!isEditing ? (
                    <div className="form-value">
                      {item.type === 'password'
                        ? '••••••••'
                        : userData[item.field] || '-'}
                    </div>
                  ) : (
                    <input
                      type={item.type || 'text'}
                      className="form-input"
                      value={editData[item.field] || ''}
                      onChange={e => handleInputChange(item.field, e.target.value)}
                      placeholder={item.placeholder || ''}
                    />
                  )}
                </div>
              ))}

              <div className="form-actions">
                {!isEditing ? (
                  <button className="save-button" onClick={handleEdit}>
                    Modifier les informations
                  </button>
                ) : (
                  <>
                    <button className="cancel-button" onClick={handleCancel}>
                      Annuler
                    </button>
                    <button className="save-button" onClick={handleSave}>
                      Enregistrer
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Préférences' && (
          <div className="profil-content">Contenu des préférences</div>
        )}
        {activeTab === 'Sécurité' && (
          <div className="profil-content">Contenu de la sécurité</div>
        )}
        {activeTab === 'GPS' && (
          <GPSTab />
        )}
      </div>
    </div>
  );
};

export default Profil;
