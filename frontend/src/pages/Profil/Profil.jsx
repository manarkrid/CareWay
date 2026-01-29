import React, { useState } from 'react';
import './Profil.css';
import { FiCamera } from 'react-icons/fi';

const Profil = () => {
  const [activeTab, setActiveTab] = useState('Modifier le profil');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: 'Pierre Michel',
    email: 'pierremichel@gmail.com',
    birthDate: '25 Janvier 1990',
    password: '**********',
    address: '6 rue Firmin Oulès',
    postalCode: '81100',
    city: 'Castres',
    country: 'France'
  });

  const [editData, setEditData] = useState({ ...userData });

  const tabs = ['Modifier le profil', 'Préférences', 'Sécurité'];

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
    alert('Modifications enregistrées avec succès!');
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleChangePhoto = () => {
    console.log('Changer la photo');
    alert('Fonction de changement de photo non implémentée.');
  };

  const fields = [
    { label: 'Prénom et Nom', field: 'fullName' },
    { label: 'Email', field: 'email' },
    { label: 'Date de naissance', field: 'birthDate' },
    { label: 'Mot de passe', field: 'password', type: 'password' },
    { label: 'Adresse', field: 'address' },
    { label: 'Code Postal', field: 'postalCode' },
    { label: 'Ville', field: 'city' },
    { label: 'Pays', field: 'country' }
  ];

  return (
    <div className="profil-container">
      <div className={`profil-card ${isEditing ? 'editing' : 'not-editing'}`}>
        {/* Header */}
        <div className="profil-header">
          <div className="profil-title">Modifier le profil</div>
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

        {/* Contenu de l'onglet Modifier le profil */}
        {activeTab === 'Modifier le profil' && (
          <div className="profil-content">
            {/* Avatar + info */}
            <div className="avatar-section">
              <div className="avatar-container">
                <div className="avatar-circle">
                  {userData.fullName
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </div>
                <div className="change-avatar-icon" onClick={handleChangePhoto}>
                  <FiCamera size={16} />
                </div>
              </div>
              <div className="avatar-info">
                <div className="avatar-name">{userData.fullName}</div>
                <div className="avatar-details">
                  <span className="avatar-role">Transporteur coordinateur</span>
                  <span className="avatar-email">{userData.email}</span>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="form-section">
              {fields.map((item, i) => (
                <div key={i} className="form-row">
                  <div className="form-label">{item.label}</div>
                  <div className="form-value">
                    {item.type === 'password'
                      ? '•'.repeat(10)
                      : userData[item.field]}
                  </div>
                  <input
                    type={item.type || 'text'}
                    className="form-input"
                    value={editData[item.field]}
                    onChange={e => handleInputChange(item.field, e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              ))}

              {/* Actions */}
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

        {/* Contenu des autres onglets */}
        {activeTab === 'Préférences' && (
          <div className="profil-content">Contenu des préférences</div>
        )}
        {activeTab === 'Sécurité' && (
          <div className="profil-content">Contenu de la sécurité</div>
        )}
      </div>
    </div>
  );
};

export default Profil;
