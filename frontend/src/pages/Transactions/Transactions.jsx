import React, { useState } from 'react';
import './Transactions.css';
import jsPDF from 'jspdf';
const Transactions = () => {
  const [activeMainTab, setActiveMainTab] = useState('Tout');
  const [activeFilterTab, setActiveFilterTab] = useState('Toutes les transactions');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3; // nombre de transactions par page

  const mainTabs = [
    'Tout',
    'Liste des transactions',
    'Historique de rejets',
    { label: 'Télétransmissions en attente', badge: 8 },
    'Évolution du revenu'
  ];

  const filterTabs = [
    'Toutes les transactions',
    'Payé',
    'En attente',
    'Rejeté',
    'Partiel'
  ];

  const transactions = [
    { date: '31/07/2025', idTrajet: '#TR-2038', patient: 'L. Martin', distance: '18km', statut: 'Payé (CPAM)', montant: '25€', icon: '✓' },
    { date: '31/07/2025', idTrajet: '#TR-2037', patient: 'J. Roux', distance: '12km', statut: 'Payé (CPAM)', montant: '20€', icon: '✓' },
    { date: '30/07/2025', idTrajet: '#TR-2036', patient: 'H. Bernard', distance: '25km', statut: 'Attente', montant: '31€', icon: '⏱' },
    { date: '30/07/2025', idTrajet: '#TR-2035', patient: 'E. Dupont', distance: '20km', statut: 'Rejeté', montant: '38€', icon: '✕' },
    { date: '30/07/2025', idTrajet: '#TR-2034', patient: 'C. Lisle', distance: '10km', statut: 'Payé (CPAM)', montant: '19€', icon: '✓' },
    { date: '29/07/2025', idTrajet: '#TR-2033', patient: 'M. Durand', distance: '15km', statut: 'Payé (CPAM)', montant: '22€', icon: '✓' },
    { date: '29/07/2025', idTrajet: '#TR-2032', patient: 'A. Petit', distance: '30km', statut: 'Attente', montant: '45€', icon: '⏱' },
    { date: '28/07/2025', idTrajet: '#TR-2031', patient: 'B. Moreau', distance: '8km', statut: 'Rejeté', montant: '15€', icon: '✕' },
    { date: '28/07/2025', idTrajet: '#TR-2030', patient: 'S. Laurent', distance: '22km', statut: 'Payé (CPAM)', montant: '28€', icon: '✓' },
  ];

  // ✅ Filtre par statut
  const transactionsFiltrees = activeFilterTab === 'Toutes les transactions'
    ? transactions
    : transactions.filter(t => {
        if (activeFilterTab === 'Payé') return t.statut.includes('Payé');
        if (activeFilterTab === 'En attente') return t.statut === 'Attente';
        if (activeFilterTab === 'Rejeté') return t.statut === 'Rejeté';
        return true;
      });

  // ✅ Pagination
  const totalPages = Math.ceil(transactionsFiltrees.length / ITEMS_PER_PAGE);
  const transactionsPaginees = transactionsFiltrees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ✅ Reset page quand on change de filtre
  const handleFilterChange = (tab) => {
    setActiveFilterTab(tab);
    setCurrentPage(1);
  };

  // ✅ Téléchargement de facture
 const handleDownload = (transaction) => {
  const doc = new jsPDF();

  // Titre
  doc.setFontSize(20);
  doc.setTextColor(33, 150, 243);
  doc.text('CareWay - Facture', 20, 20);

  // Ligne séparatrice
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 25, 190, 25);

  // Contenu
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`ID Trajet   : ${transaction.idTrajet}`, 20, 40);
  doc.text(`Date        : ${transaction.date}`, 20, 52);
  doc.text(`Patient     : ${transaction.patient}`, 20, 64);
  doc.text(`Distance    : ${transaction.distance}`, 20, 76);
  doc.text(`Statut      : ${transaction.statut}`, 20, 88);
  doc.text(`Montant     : ${transaction.montant}`, 20, 100);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('Merci de votre confiance - CareWay', 20, 280);

  // Télécharger
  doc.save(`Facture_${transaction.idTrajet.replace('#', '')}.pdf`);
};

  const monthlyData = [
    { month: 'Juillet', totalTrajets: 108, recusCPAM: '3 742€', totalNet: '3 677€' },
    { month: 'Juin', totalTrajets: 120, recusCPAM: '4 385€', totalNet: '4 102€' }
  ];

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div className="main-tabs">
          {mainTabs.map((tab, index) => (
            <button
              key={index}
              className={`main-tab ${activeMainTab === (typeof tab === 'string' ? tab : tab.label) ? 'active' : ''}`}
              onClick={() => setActiveMainTab(typeof tab === 'string' ? tab : tab.label)}
            >
              {typeof tab === 'string' ? tab : tab.label}
              {typeof tab === 'object' && tab.badge && (
                <span className="tab-badge">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="transactions-main-content">
        <div className="content-grid">
          <div className="revenue-chart-card">
            <h3>Revenu hebdomadaire</h3>
            <div className="chart-container">
              <div className="chart-y-axis">
                <span>400€</span>
                <span>300€</span>
                <span>200€</span>
                <span>100€</span>
                <span>0€</span>
              </div>
              <div className="chart-area">
                <svg viewBox="0 0 400 200" className="line-chart">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00D9A5" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00D9A5" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,120 L 50,100 L 100,80 L 150,110 L 200,70 L 250,90 L 300,60 L 350,50 L 400,40" fill="none" stroke="#00D9A5" strokeWidth="3" />
                  <path d="M 0,120 L 50,100 L 100,80 L 150,110 L 200,70 L 250,90 L 300,60 L 350,50 L 400,40 L 400,200 L 0,200 Z" fill="url(#gradient)" opacity="0.3" />
                </svg>
                <div className="chart-x-axis">
                  <span>26/07</span><span>27/07</span><span>28/07</span>
                  <span>29/07</span><span>30/07</span><span>31/07</span>
                </div>
              </div>
            </div>
          </div>

          <div className="monthly-summary-card">
            <h3>Synthèse mensuelle</h3>
            <div className="summary-table">
              <div className="summary-header">
                <span>Mois</span><span>Total trajets</span><span>Reçus CPAM</span><span>Total Net</span>
              </div>
              {monthlyData.map((data, index) => (
                <div key={index} className="summary-row">
                  <span className="month-name">{data.month}</span>
                  <span>{data.totalTrajets}</span>
                  <span>{data.recusCPAM}</span>
                  <span className="total-net">{data.totalNet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="transactions-list-card">
          <h3>Liste des transactions</h3>

          <div className="filter-tabs">
            {filterTabs.map((tab, index) => (
              <button
                key={index}
                className={`filter-tab ${activeFilterTab === tab ? 'active' : ''}`}
                onClick={() => handleFilterChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="transactions-table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th><th>ID Trajet</th><th>Patient</th>
                  <th>Distance</th><th>Statut</th><th>Montant</th><th>Facture</th>
                </tr>
              </thead>
              <tbody>
                {transactionsPaginees.length > 0 ? transactionsPaginees.map((transaction, index) => (
                  <tr key={index}>
                    <td>
                      <span className={`status-icon ${transaction.statut.includes('Payé') ? 'paid' : transaction.statut === 'Attente' ? 'pending' : 'rejected'}`}>
                        {transaction.icon}
                      </span>
                      {transaction.date}
                    </td>
                    <td>{transaction.idTrajet}</td>
                    <td>{transaction.patient}</td>
                    <td>{transaction.distance}</td>
                    <td>
                      <span className={`status-badge ${transaction.statut.includes('Payé') ? 'paid' : transaction.statut === 'Attente' ? 'pending' : 'rejected'}`}>
                        {transaction.statut}
                      </span>
                    </td>
                    <td className="montant">{transaction.montant}</td>
                    <td>
                      <button className="btn-download" onClick={() => handleDownload(transaction)}>
                        ⬇ Télécharger
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'20px', color:'#999'}}>Aucune transaction trouvée</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ✅ Pagination fonctionnelle */}
          <div className="pagination">
            <button className="pagination-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>← Précédent</button>
            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button key={num} className={`page-number ${currentPage === num ? 'active' : ''}`} onClick={() => setCurrentPage(num)}>{num}</button>
              ))}
            </div>
            <button className="pagination-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Suivant →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;