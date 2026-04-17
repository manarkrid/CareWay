import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../services/apiConfig';
import './VehiculesSection.css';

const EMPTY = { immatriculation: '', type: 'VSL', marque: '', km: '', statut: 'Disponible', prochainEntretien: '' };

const VehiculesSection = () => {
  const [vehicules, setVehicules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [showEntretien, setShowEntretien] = useState(null); 
  const [entretienDate, setEntretienDate] = useState('');
  
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tous');

  useEffect(() => {
    fetch(`${API_BASE_URL}/entreprise/vehicules`)
      .then(res => res.json())
      .then(data => setVehicules(data))
      .catch((err) => {
        console.error("Error fetching vehicules:", err);
        setVehicules([
          { id: 'V-001', immatriculation: 'AB-123-CD', type: 'VSL', marque: 'Renault Trafic', statut: 'Disponible', km: 45230 },
          { id: 'V-002', immatriculation: 'EF-456-GH', type: 'Ambulance', marque: 'Mercedes Sprinter', statut: 'En service', km: 72450 },
        ]);
      });
  }, []);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = (v) => { setForm({ ...v }); setEditing(v.id); setShowForm(true); };

  const handleSave = () => {
    if (!form.immatriculation) return;
    if (editing) {
      setVehicules(prev => prev.map(v => v.id === editing ? { ...v, ...form } : v));
    } else {
      setVehicules(prev => [...prev, { ...form, id: `V-${Date.now()}` }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce véhicule ?')) {
      setVehicules(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleEntretien = (id) => {
    if (!entretienDate) return;
    setVehicules(prev => prev.map(v => v.id === id ? { ...v, prochainEntretien: entretienDate, statut: 'Maintenance planifiée' } : v));
    setShowEntretien(null);
    setEntretienDate('');
  };

  const filteredVehicules = vehicules.filter(v => {
    const matchesSearch = v.immatriculation.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.marque.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'Tous' || v.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="section vehicules-section">
      <div className="section-header">
        <h2>Véhicules</h2>
        <div className="section-actions">
          <button className="btn-primary" onClick={openAdd}>+ Ajouter</button>
          <button 
            className={`btn-filter ${showFilters ? 'active' : ''}`} 
            onClick={() => setShowFilters(!showFilters)}
          >
            Filtrer ⚙️
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filter-bar">
          <div className="search-input">
            <span>🔍</span>
            <input 
              type="text" 
              placeholder="Chercher une immatriculation ou marque..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="Tous">Tous les types</option>
            <option value="VSL">VSL</option>
            <option value="Ambulance">Ambulance</option>
            <option value="TAXI">TAXI</option>
          </select>
        </div>
      )}

      {showForm && (
        <div className="inline-form">
          <div className="form-title">{editing ? 'Modifier le véhicule' : 'Nouveau véhicule'}</div>
          <div className="form-grid">
            <input placeholder="Immatriculation *" value={form.immatriculation} onChange={e => setForm({ ...form, immatriculation: e.target.value })} />
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option>VSL</option><option>Ambulance</option><option>TAXI</option>
            </select>
            <input placeholder="Marque / Modèle" value={form.marque} onChange={e => setForm({ ...form, marque: e.target.value })} />
            <input type="number" placeholder="Kilométrage" value={form.km} onChange={e => setForm({ ...form, km: e.target.value })} />
            <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}>
              <option>Disponible</option><option>En service</option><option>Maintenance</option><option>Hors service</option>
            </select>
          </div>
          <div className="form-actions">
            <button className="btn-secondary" onClick={() => setShowForm(false)}>Annuler</button>
            <button className="btn-primary" onClick={handleSave}>Enregistrer</button>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr><th>Immatriculation</th><th>Type</th><th>Marque</th><th>Km</th><th>Entretien</th><th>Statut</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredVehicules.map((v, i) => (
              <tr key={i}>
                <td><strong>{v.immatriculation}</strong></td>
                <td><span className="vehicle-type-tag">{v.type}</span></td>
                <td>{v.marque}</td>
                <td>{Number(v.km).toLocaleString()} km</td>
                <td>
                  {showEntretien === v.id ? (
                    <div className="entretien-picker">
                      <input type="date" value={entretienDate} onChange={e => setEntretienDate(e.target.value)} />
                      <button className="btn-done" onClick={() => handleEntretien(v.id)}>✓</button>
                      <button className="btn-cancel" onClick={() => setShowEntretien(null)}>✕</button>
                    </div>
                  ) : (
                    <span className={`entretien-date ${v.prochainEntretien ? 'planned' : ''}`}>
                      {v.prochainEntretien || '—'}
                    </span>
                  )}
                </td>
                <td><span className={`status ${v.statut.toLowerCase() === 'disponible' ? 'available' : v.statut.toLowerCase().includes('service') ? 'busy' : 'away'}`}>{v.statut}</span></td>
                <td>
                  <div className="action-btns">
                    <button className="btn-icon" onClick={() => openEdit(v)} title="Modifier">✏️</button>
                    <button className="btn-icon" onClick={() => setShowEntretien(v.id)} title="Planifier entretien">🔧</button>
                    <button className="btn-icon btn-delete" onClick={() => handleDelete(v.id)} title="Supprimer">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredVehicules.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#666' }}>
                  Aucun véhicule trouvé correspondant à vos critères...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiculesSection;
