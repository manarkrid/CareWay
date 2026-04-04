import React, { useState } from 'react';
import './AddEmployeeModal.css';

const AddEmployeeModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    nom: '',
    emplacement: '',
    statut: 'Disponible'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ nom: '', emplacement: '', statut: 'Disponible' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Ajouter un salarié</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <input 
              type="text" 
              required 
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder="Ex: Jean Dupont"
            />
          </div>
          <div className="form-group">
            <label>Emplacement</label>
            <input 
              type="text" 
              required 
              value={formData.emplacement}
              onChange={(e) => setFormData({ ...formData, emplacement: e.target.value })}
              placeholder="Ex: Toulouse"
            />
          </div>
          <div className="form-group">
            <label>Statut initial</label>
            <select 
              value={formData.statut}
              onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
            >
              <option value="Disponible">Disponible</option>
              <option value="En trajet">En trajet</option>
              <option value="Congés">Congés</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn-primary">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
