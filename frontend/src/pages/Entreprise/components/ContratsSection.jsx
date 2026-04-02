import React, { useState, useEffect } from 'react';
import './ContratsSection.css';

const EMPTY = { organisme: '', type: 'Convention', dateDebut: '', dateFin: '', statut: 'Actif' };

const ContratsSection = () => {
  const [contrats, setContrats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // null = ajout, id = modif
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    fetch('http://localhost:3001/api/entreprise/contrats')
      .then(res => res.json())
      .then(data => setContrats(data))
      .catch(() => setContrats([
        { id: 'C-001', organisme: 'CPAM du Tarn', type: 'Convention', dateDebut: '01/01/2025', dateFin: '31/12/2025', statut: 'Actif' },
        { id: 'C-002', organisme: 'MSA Midi-Pyrénées', type: 'Convention', dateDebut: '01/03/2025', dateFin: '28/02/2026', statut: 'Actif' },
      ]));
  }, []);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = (c) => { setForm({ ...c }); setEditing(c.id); setShowForm(true); };

  const handleSave = () => {
    if (!form.organisme) return;
    if (editing) {
      setContrats(prev => prev.map(c => c.id === editing ? { ...c, ...form } : c));
    } else {
      setContrats(prev => [...prev, { ...form, id: `C-${Date.now()}` }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce contrat ?')) {
      setContrats(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="section contrats-section">
      <div className="section-header">
        <h2>Contrats & Conventions</h2>
        <button className="btn-primary" onClick={openAdd}>+ Ajouter</button>
      </div>

      {showForm && (
        <div className="inline-form">
          <input placeholder="Organisme *" value={form.organisme} onChange={e => setForm({ ...form, organisme: e.target.value })} />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option>Convention</option><option>Contrat</option>
          </select>
          <input type="text" placeholder="Date début (ex: 01/01/2025)" value={form.dateDebut} onChange={e => setForm({ ...form, dateDebut: e.target.value })} />
          <input type="text" placeholder="Date fin (ex: 31/12/2025)" value={form.dateFin} onChange={e => setForm({ ...form, dateFin: e.target.value })} />
          <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}>
            <option>Actif</option><option>Expiré</option><option>En attente</option>
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
            <tr><th>Organisme</th><th>Type</th><th>Début</th><th>Fin</th><th>Statut</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {contrats.map((c, i) => (
              <tr key={i}>
                <td>{c.organisme}</td>
                <td>{c.type}</td>
                <td>{c.dateDebut}</td>
                <td>{c.dateFin}</td>
                <td><span className="status in-progress">{c.statut}</span></td>
                <td>
                  <button className="btn-icon" onClick={() => openEdit(c)} title="Modifier">✏️</button>
                  <button className="btn-icon" onClick={() => handleDelete(c.id)} title="Supprimer">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContratsSection;
