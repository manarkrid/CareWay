import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';

// Import des pages
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Entreprise from './pages/Entreprise/Entreprise.jsx';
import Transactions from './pages/Transactions/Transactions.jsx';
import Demandes from './pages/Demandes/Demandes.jsx';
import Patients from './pages/Patients/Patients.jsx';
import Calendrier from './pages/Calendrier/Calendrier.jsx';
import Profil from './pages/Profil/Profil.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'entreprise':
        return <Entreprise />;
      case 'transactions':
        return <Transactions />;
      case 'demandes':
        return <Demandes />;
      case 'patients':
        return <Patients />;
      case 'calendrier':
        return <Calendrier />;
      case 'profil':
        return <Profil />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app debug-layout">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main-content">
        <Header />
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;