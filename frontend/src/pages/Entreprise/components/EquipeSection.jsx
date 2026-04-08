import React, { useState } from 'react';
import './EquipeSection.css';
import AddEmployeeModal from './AddEmployeeModal.jsx';
import { useTrips } from '../../../context/TripContext';

const EquipeSection = () => {
  const { employees: equipeData, refreshTrips } = useTrips();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');

  const handleAddEmployee = (newEmployee) => {
    fetch('http://localhost:3001/api/entreprise/equipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee)
    })
    .then(res => res.json())
    .then(() => refreshTrips())
    .catch(err => console.error("Error adding employee:", err));
  };

  const filteredData = equipeData.filter(emp => {
    const matchesSearch = emp.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.emplacement.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || emp.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="section equipe-section">
      <div className="section-header">
        <h2>Équipe</h2>
        <div className="section-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Ajouter un salarié</button>
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
              placeholder="Rechercher par nom ou ville..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Tous">Tous les statuts</option>
            <option value="Disponible">Disponible</option>
            <option value="En trajet">En trajet</option>
            <option value="Congés">Congés</option>
          </select>
        </div>
      )}
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nom de l'employé</th>
              <th>Emplacement</th>
              <th>Absence</th>
              <th>Taux d'activité</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((employee, index) => (
              <tr key={index}>
                <td>
                  <div className="employee-info">
                    <div className="employee-avatar">
                      {employee.nom.charAt(0)}
                    </div>
                    <span>{employee.nom}</span>
                  </div>
                </td>
                <td>{employee.emplacement}</td>
                <td>{employee.absence}</td>
                <td><span className="activity-rate">+{employee.activite}%</span></td>
                <td>
                  <span className={`status ${employee.statut.toLowerCase() === 'disponible' ? 'available' : employee.statut.toLowerCase() === 'en trajet' ? 'busy' : 'away'}`}>
                    {employee.statut}
                  </span>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#666' }}>
                  Aucun membre d'équipage trouvé...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddEmployee} 
      />
    </div>
  );
};

export default EquipeSection;