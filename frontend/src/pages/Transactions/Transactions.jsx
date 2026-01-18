import React, { useState } from 'react';
import './Transactions.css';

const Transactions = () => {
  const [activeMainTab, setActiveMainTab] = useState('Tout');
  const [activeFilterTab, setActiveFilterTab] = useState('Toutes les transactions');
  const [currentPage, setCurrentPage] = useState(1);

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
    {
      date: '31/07/2025',
      idTrajet: '#TR-2038',
      patient: 'L. Martin',
      distance: '18km',
      statut: 'Payé (CPAM)',
      montant: '25€',
      icon: '✓'
    },
    {
      date: '31/07/2025',
      idTrajet: '#TR-2037',
      patient: 'J. Roux',
      distance: '12km',
      statut: 'Payé (CPAM)',
      montant: '20€',
      icon: '✓'
    },
    {
      date: '30/07/2025',
      idTrajet: '#TR-2036',
      patient: 'H. Bernard',
      distance: '25km',
      statut: 'Attente',
      montant: '31€',
      icon: '⏱'
    },
    {
      date: '30/07/2025',
      idTrajet: '#TR-2035',
      patient: 'E. Dupont',
      distance: '20km',
      statut: 'Rejeté',
      montant: '38€',
      icon: '✕'
    },
    {
      date: '30/07/2025',
      idTrajet: '#TR-2034',
      patient: 'C. Lisle',
      distance: '10km',
      statut: 'Payé (CPAM)',
      montant: '19€',
      icon: '✓'
    }
  ];

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
          {/* Graphique de revenu */}
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
                  <path
                    d="M 0,120 L 50,100 L 100,80 L 150,110 L 200,70 L 250,90 L 300,60 L 350,50 L 400,40"
                    fill="none"
                    stroke="#00D9A5"
                    strokeWidth="3"
                  />
                  <path
                    d="M 0,120 L 50,100 L 100,80 L 150,110 L 200,70 L 250,90 L 300,60 L 350,50 L 400,40 L 400,200 L 0,200 Z"
                    fill="url(#gradient)"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00D9A5" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00D9A5" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="chart-x-axis">
                  <span>26/07</span>
                  <span>27/07</span>
                  <span>28/07</span>
                  <span>29/07</span>
                  <span>30/07</span>
                  <span>31/07</span>
                </div>
              </div>
            </div>
          </div>

          {/* Synthèse mensuelle */}
          <div className="monthly-summary-card">
            <h3>Synthèse mensuelle</h3>
            <div className="summary-table">
              <div className="summary-header">
                <span>Mois</span>
                <span>Total trajets</span>
                <span>Reçus CPAM</span>
                <span>Total Net</span>
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

        {/* Liste des transactions */}
        <div className="transactions-list-card">
          <h3>Liste des transactions</h3>
          
          <div className="filter-tabs">
            {filterTabs.map((tab, index) => (
              <button
                key={index}
                className={`filter-tab ${activeFilterTab === tab ? 'active' : ''}`}
                onClick={() => setActiveFilterTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="transactions-table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>ID Trajet</th>
                  <th>Patient</th>
                  <th>Distance</th>
                  <th>Statut</th>
                  <th>Montant</th>
                  <th>Facture</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>
                      <span className={`status-icon ${transaction.statut.toLowerCase().includes('payé') ? 'paid' : transaction.statut.toLowerCase().includes('attente') ? 'pending' : 'rejected'}`}>
                        {transaction.icon}
                      </span>
                      {transaction.date}
                    </td>
                    <td>{transaction.idTrajet}</td>
                    <td>{transaction.patient}</td>
                    <td>{transaction.distance}</td>
                    <td>
                      <span className={`status-badge ${transaction.statut.toLowerCase().includes('payé') ? 'paid' : transaction.statut.toLowerCase().includes('attente') ? 'pending' : 'rejected'}`}>
                        {transaction.statut}
                      </span>
                    </td>
                    <td className="montant">{transaction.montant}</td>
                    <td>
                      <button className="btn-download">Télécharger</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button className="pagination-btn">← Précédent</button>
            <div className="pagination-numbers">
              <button className={`page-number ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
              <button className={`page-number ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
              <button className={`page-number ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
              <button className={`page-number ${currentPage === 4 ? 'active' : ''}`} onClick={() => setCurrentPage(4)}>4</button>
            </div>
            <button className="pagination-btn">Suivant →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;