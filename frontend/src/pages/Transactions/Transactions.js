import React, { useState } from 'react';
import './Transactions.css';
import TabNavigation from '../../components/shared/TabNavigation';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('Toutes');

  const tabs = [
    'Toutes',
    'En attente',
    'Validées',
    'Facturées',
    'Payées'
  ];

  const transactions = [
    {
      id: 'T001',
      date: '07/01/2026',
      patient: 'Marie Dupont',
      trajet: 'EHPAD → Hôpital',
      montant: 45.50,
      statut: 'Payée',
      type: 'VSL'
    },
    {
      id: 'T002',
      date: '07/01/2026',
      patient: 'Jean Martin',
      trajet: 'Domicile → Clinique',
      montant: 67.80,
      statut: 'En attente',
      type: 'Ambulance'
    },
    {
      id: 'T003',
      date: '06/01/2026',
      patient: 'Sophie Bernard',
      trajet: 'Clinique → Domicile',
      montant: 52.30,
      statut: 'Validée',
      type: 'VSL'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Transactions</h1>
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
      
      <div className="transactions-content">
        <div className="transactions-summary">
          <div className="summary-card">
            <h3>Total du mois</h3>
            <div className="amount">12,450.60€</div>
          </div>
          <div className="summary-card">
            <h3>En attente</h3>
            <div className="amount pending">2,340.20€</div>
          </div>
          <div className="summary-card">
            <h3>Payées</h3>
            <div className="amount paid">10,110.40€</div>
          </div>
        </div>

        <div className="transactions-table">
          <div className="table-header">
            <h3>Liste des transactions</h3>
            <button className="btn-export">Exporter</button>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Patient</th>
                <th>Trajet</th>
                <th>Type</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.patient}</td>
                  <td>{transaction.trajet}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.montant}€</td>
                  <td>
                    <span className={`status ${transaction.statut.toLowerCase().replace(' ', '-')}`}>
                      {transaction.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;