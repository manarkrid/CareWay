import React, { useState, useEffect } from 'react';
import './Patients.css';

const SearchIcon = () => (
  <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 14L11.1 11.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SortIcon = () => (
  <svg className="sort-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 1.5L9 4.5M9 7.5L6 10.5L3 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ✅ Modal Documents Patient
const DocumentModal = ({ patient, onClose }) => {
  const documents = [
    { nom: "Carte Vitale", type: "Identité", date: "15/01/2024", statut: "Valide" },
    { nom: "Ordonnance médicale", type: "Médical", date: "10/03/2024", statut: "Valide" },
    { nom: "Attestation CPAM", type: "Administratif", date: "01/01/2024", statut: "Valide" },
    { nom: "Prescription transport", type: "Médical", date: "20/02/2024", statut: "Expiré" },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content patient-modal" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-patient-info">
            <div className="modal-avatar">
              {patient.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2>{patient.name}</h2>
              <span className="modal-subtitle">Documents du patient</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Infos patient */}
        <div className="modal-patient-details">
          <div className="detail-chip">📍 {patient.address}</div>
          <div className="detail-chip">📞 {patient.phone}</div>
          <div className="detail-chip">✉️ {patient.email}</div>
          <div className="detail-chip">🌍 {patient.country}</div>
        </div>

        {/* Liste documents */}
        <div className="modal-body">
          <h3 className="docs-title">Documents disponibles</h3>
          <div className="docs-list">
            {documents.map((doc, index) => (
              <div key={index} className="doc-item">
                <div className="doc-icon">📄</div>
                <div className="doc-info">
                  <div className="doc-name">{doc.nom}</div>
                  <div className="doc-meta">{doc.type} • {doc.date}</div>
                </div>
                <span className={`doc-statut ${doc.statut === 'Valide' ? 'valide' : 'expire'}`}>
                  {doc.statut}
                </span>
                <button className="btn-doc-download" onClick={() => alert(`Téléchargement de ${doc.nom}`)}>
                  ⬇
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Fermer</button>
  
        </div>
      </div>
    </div>
  );
};

const initialPatients = [
  { id: 1, name: 'Jane Cooper', address: '2 rue Foch', phone: '(33) 568745555', email: 'jane@microsoft.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-15' },
  { id: 2, name: 'Floyd Miles', address: '1 av. Lane', phone: '(33) 568745555', email: 'floyd@yahoo.com', country: 'France', documents: 'Vide', status: 'active', dateAdded: '2024-01-14' },
  { id: 3, name: 'Ronald Richards', address: '6 rue Dufour', phone: '(33) 568745555', email: 'ronald@adobe.com', country: 'France', documents: 'Vide', status: 'active', dateAdded: '2024-01-13' },
  { id: 4, name: 'Marvin McKinney', address: '3 rue Foch', phone: '(33) 568745555', email: 'marvin@tesla.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-12' },
  { id: 5, name: 'Jerome Bell', address: '4 rue Foch', phone: '(33) 568745555', email: 'jerome@google.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-11' },
  { id: 6, name: 'Kathryn Murphy', address: '5 rue Foch', phone: '(33) 568745555', email: 'kathryn@microsoft.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-10' },
  { id: 7, name: 'Jacob Jones', address: '6 rue Foch', phone: '(33) 568745555', email: 'jacob@yahoo.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-09' },
  { id: 8, name: 'Kristin Watson', address: '7 rue Foch', phone: '(33) 568745555', email: 'kristin@facebook.com', country: 'France', documents: 'Vide', status: 'active', dateAdded: '2024-01-08' },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [stats, setStats] = useState({ total: 1247, newThisMonth: 23, avgTrajets: 4.2, activePatients: 856 });
  
  // ✅ State pour le modal
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patientsPerPage = 8;

  useEffect(() => {
    fetch('http://localhost:3001/api/patients/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/patients')
      .then(res => res.json())
      .then(data => {
        const patients = data.data || data;
        setPatientsData(patients);
        setFilteredPatients(patients);
      })
      .catch(() => {
        setPatientsData(initialPatients);
        setFilteredPatients(initialPatients);
      });
  }, []);

  useEffect(() => {
    let result = [...patientsData];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(patient =>
        patient.name.toLowerCase().includes(term) ||
        patient.email.toLowerCase().includes(term) ||
        patient.address.toLowerCase().includes(term) ||
        patient.phone.includes(term)
      );
    }
    switch (sortBy) {
      case 'recent': result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); break;
      case 'oldest': result.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)); break;
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': result.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: break;
    }
    setFilteredPatients(result);
    setCurrentPage(1);
  }, [searchTerm, sortBy, patientsData]);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(<button key={i} className={`pagination-btn ${currentPage === i ? 'active' : ''}`} onClick={() => handlePageChange(i)}>{i}</button>);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) buttons.push(<button key={i} className={`pagination-btn ${currentPage === i ? 'active' : ''}`} onClick={() => handlePageChange(i)}>{i}</button>);
        buttons.push(<span key="dots1" className="pagination-dots">...</span>);
        buttons.push(<button key={totalPages} className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`} onClick={() => handlePageChange(totalPages)}>{totalPages}</button>);
      } else if (currentPage >= totalPages - 2) {
        buttons.push(<button key={1} className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => handlePageChange(1)}>1</button>);
        buttons.push(<span key="dots2" className="pagination-dots">...</span>);
        for (let i = totalPages - 3; i <= totalPages; i++) buttons.push(<button key={i} className={`pagination-btn ${currentPage === i ? 'active' : ''}`} onClick={() => handlePageChange(i)}>{i}</button>);
      } else {
        buttons.push(<button key={1} className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => handlePageChange(1)}>1</button>);
        buttons.push(<span key="dots3" className="pagination-dots">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) buttons.push(<button key={i} className={`pagination-btn ${currentPage === i ? 'active' : ''}`} onClick={() => handlePageChange(i)}>{i}</button>);
        buttons.push(<span key="dots4" className="pagination-dots">...</span>);
        buttons.push(<button key={totalPages} className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`} onClick={() => handlePageChange(totalPages)}>{totalPages}</button>);
      }
    }
    return buttons;
  };

  // ✅ Render documents avec onClick
  const renderDocuments = (patient) => {
    if (patient.documents === 'Consulter') {
      return (
        <span
          className="document-link"
          onClick={() => setSelectedPatient(patient)}
          style={{ cursor: 'pointer' }}
        >
          Consulter
        </span>
      );
    }
    return <span className="empty-state">Vide</span>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestion des patients</h1>
      </div>

      <div className="patients-content">
        <div className="patients-stats">
          <div className="stat-card"><h3>Total patients</h3><div className="stat-number">{stats.total?.toLocaleString()}</div></div>
          <div className="stat-card"><h3>Nouveaux ce mois</h3><div className="stat-number">{stats.newThisMonth}</div></div>
          <div className="stat-card"><h3>Trajets moyens/patient</h3><div className="stat-number">{stats.avgTrajets}</div></div>
          <div className="stat-card"><h3>Patients actifs</h3><div className="stat-number">{stats.activePatients}</div></div>
        </div>

        <div className="patients-list">
          <div className="patients-list-header">
            <div className="list-title">
              <h3>Tous Les Patients</h3>
              <p className="subtitle">Patients actifs</p>
            </div>
            <div className="list-controls">
              <div className="search-box">
                <SearchIcon />
                <input type="text" placeholder="Rechercher" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="sort-dropdown">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="recent">Trier par : Plus récent</option>
                  <option value="oldest">Plus ancien</option>
                  <option value="name-asc">Nom (A-Z)</option>
                  <option value="name-desc">Nom (Z-A)</option>
                </select>
                <SortIcon />
              </div>
            </div>
          </div>

          <table className="patients-table">
            <thead>
              <tr>
                <th>Nom du patient</th>
                <th>Adresse</th>
                <th>Numéro de téléphone</th>
                <th>Email</th>
                <th>Pays</th>
                <th>Documents</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: '500' }}>{patient.name}</div>
                      <span className={`status-badge ${patient.status}`}>Actif</span>
                    </div>
                  </td>
                  <td>{patient.address}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email}</td>
                  <td>{patient.country}</td>
                  {/* ✅ renderDocuments reçoit le patient complet */}
                  <td>{renderDocuments(patient)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="demandes-pagination">
            <button className="pagination-arrow" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>‹</button>
            {renderPaginationButtons()}
            <button className="pagination-arrow" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
          </div>
        </div>
      </div>

      {/* ✅ Modal s'ouvre quand selectedPatient est défini */}
      {selectedPatient && (
        <DocumentModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
      )}
    </div>
  );
};

export default Patients;