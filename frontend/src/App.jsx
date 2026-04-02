import React, { useState, useEffect } from 'react';
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

// Import Auth
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import ResetPassword from './pages/Auth/ResetPassword.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [globalSearch, setGlobalSearch] = useState('');

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (localStorage)
    const token = localStorage.getItem('careway_token');
    const savedUser = localStorage.getItem('careway_user');

    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    } else {
      if (window.location.pathname === '/reset-password') {
        setCurrentPage('reset-password');
      } else {
        setCurrentPage('login');
      }
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('careway_token', token);
    localStorage.setItem('careway_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('careway_token');
    localStorage.removeItem('careway_user');
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  // Rendu de la page selon l'état actuel
  const renderPage = () => {
    if (!isAuthenticated) {
      if (currentPage === 'register') {
        return <Register onNavigateToLogin={() => setCurrentPage('login')} />;
      }
      if (currentPage === 'forgot-password') {
        return <ForgotPassword onNavigateToLogin={() => setCurrentPage('login')} />;
      }
      if (currentPage === 'reset-password') {
        return <ResetPassword onNavigateToLogin={() => {
          window.history.replaceState({}, document.title, "/");
          setCurrentPage('login');
        }} />;
      }
      return <Login
        onLogin={handleLogin}
        onNavigateToRegister={() => setCurrentPage('register')}
        onNavigateToForgotPassword={() => setCurrentPage('forgot-password')}
      />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'entreprise':
        return <Entreprise />;
      case 'transactions':
        return <Transactions />;
      case 'demandes':
        return <Demandes filterQuery={globalSearch} />;
      case 'patients':
        return <Patients />;
      case 'calendrier':
        return <Calendrier />;
      case 'profil':
        return <Profil user={user} onUpdateUser={setUser} />;
      default:
        return <Dashboard />;
    }
  };

  // Si non connecté, retourner uniquement la page courante (Login/Register) sans Sidebar/Header
  if (!isAuthenticated) {
    return (
      <div className="app debug-layout">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="app debug-layout">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} user={user} />
      <div className="main-content">
        <Header user={user} onSearch={setGlobalSearch} onNavigate={setCurrentPage} />
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
