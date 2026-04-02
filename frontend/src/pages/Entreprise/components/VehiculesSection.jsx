import React, { useState, useEffect } from 'react';
import './VehiculesSection.css';

const EMPTY = { immatriculation: '', type: 'VSL', marque: '', km: '', statut: 'Disponible', prochainEntretien: '' };

const VehiculesSection = () => {
  const [vehicules, setVehicules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [showEntretien, setShowEntretien] = useState(null); // id véhicule pour planifier entretien
  const [entretienDate, setEntretienDate] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/entreprise/vehicules')
      .then(res => res.json())
      .then(data => setVehicules(data))
      .catch(() => setVehicules([
        { id: 'V-001', immatriculation: 'AB-123-CD', type: 'VSL', marque: 'Renault Trafic', statut: 'Disponible', km: 45230 },
        { id: 'V-002', immatriculation: 'EF-456-GH', type: 'Ambulance', marque: 'Mercedes Sprinter', statut: 'En service', km: 72450 },
      ]));
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

  return (
    <div className="section vehicules-section">
      <div className="section-header">
        <h2>Véhicules</h2>
        <div className="section-actions">
          <button className="btn-primary" onClick={openAdd}>+ Ajouter</button>
          <button className="btn-filter">Filtrer ⚙️</button>
        </div>
      </div>

      {showForm && (
        <div className="inline-form">
          <input placeholder="Immatriculation *" value={form.immatriculation} onChange={e => setForm({ ...form, immatriculation: e.target.value })} />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option>VSL</option><option>Ambulance</option><option>TAXI</option>
          </select>
          <input placeholder="Marque / Modèle" value={form.marque} onChange={e => setForm({ ...form, marque: e.target.value })} />
          <input type="number" placeholder="Kilométrage" value={form.km} onChange={e => setForm({ ...form, km: e.target.value })} />
          <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}>
            <option>Disponible</option><option>En service</option><option>Maintenance</option><option>Hors service</option>
          </select>
          <div className="form-actions">
            <button className="btn-primary" onClick={handleSave}>Enregistrer</button>
            <button className="btn-filter" onClick={() => setShowForm(false)}>Annuler</button>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr><th>Immatriculation</th><th>Type</th><th>Marque</th><th>Km</th><th>Prochain entretien</th><th>Statut</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {vehicules.map((v, i) => (
              <tr key={i}>
                <td>{v.immatriculation}</td>
                <td>{v.type}</td>
                <td>{v.marque}</td>
                <td>{Number(v.km).toLocaleString()} km</td>
                <td>
                  {showEntretien === v.id ? (
                    <div style={{ display: 'flex', gap: 4 }}>
                      <input type="date" value={entretienDate} onChange={e => setEntretienDate(e.target.value)} style={{ fontSize: 12, padding: '2px 6px', border: '1px solid #dee2e6', borderRadius: 4 }} />
                      <button className="btn-icon" onClick={() => handleEntretien(v.id)}>✓</button>
                      <button className="btn-icon" onClick={() => setShowEntretien(null)}>✕</button>
                    </div>
                  ) : (
                    <span style={{ fontSize: 13, color: v.prochainEntretien ? '#856404' : '#6c757d' }}>
                      {v.prochainEntretien || '—'}
                    </span>
                  )}
                </td>
                <td><span className={`status ${v.statut === 'Disponible' ? 'available' : 'busy'}`}>{v.statut}</span></td>
                <td>
                  <button className="btn-icon" onClick={() => openEdit(v)} title="Modifier">✏️</button>
                  <button className="btn-icon" onClick={() => setShowEntretien(v.id)} title="Planifier entretien">🔧</button>
                  <button className="btn-icon" onClick={() => handleDelete(v.id)} title="Supprimer">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiculesSection;
