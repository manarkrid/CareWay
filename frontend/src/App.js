import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Import des pages
import Dashboard from './pages/Dashboard/Dashboard';
import Entreprise from './pages/Entreprise/Entreprise';
import Transactions from './pages/Transactions/Transactions';
import Demandes from './pages/Demandes/Demandes';
import Patients from './pages/Patients/Patients';
import Calendrier from './pages/Calendrier/Calendrier';
import Profil from './pages/Profil/Profil';

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
    <div className="app">
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