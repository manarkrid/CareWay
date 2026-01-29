import React, { useState } from 'react';
import './Calendrier.css';
import AjouterTrajet from './AjouterTrajet';

const Calendrier = () => {
  const [activeTab, setActiveTab] = useState("Semaine");
  const [selectedView, setSelectedView] = useState("Semaine"); // Pour la vue interne
  const [selectedPerson, setSelectedPerson] = useState("Tous");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  // Onglets principaux
  const tabs = ["Aujourd'hui", "Personne", "Semaine"];

  // Données pour différentes vues
  const views = ["Jour", "Semaine", "Mois", "Année"];
  
  // Données des personnes
  const personnesList = [
    { id: 1, name: 'Loïc', role: 'Chauffeur', statut: 'Disponible', trajets: 12 },
    { id: 2, name: 'Paul', role: 'Chauffeur', statut: 'En trajet', trajets: 8 },
    { id: 3, name: 'Jose', role: 'Coordinateur', statut: 'Disponible', trajets: 15 },
    { id: 4, name: 'Jean', role: 'Chauffeur', statut: 'Congés', trajets: 10 },
    { id: 5, name: 'Jase', role: 'Assistant', statut: 'Disponible', trajets: 6 }
  ];

  // Données du planning
  const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const timeSlots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
  
  const planningData = {
    'Lundi': ['Loïc', 'Paul'],
    'Mardi': ['Jose', 'Jean'],
    'Mercredi': ['Loïc', 'Paul'],
    'Jeudi': ['Jose', 'Jean'],
    'Vendredi': ['Loïc', 'Paul'],
    'Samedi': ['Jase', 'Jean'],
    'Dimanche': ['Loïc', 'Paul']
  };

  // Données pour aujourd'hui
  const trajetsAujourdhui = [
    { id: 1, heure: '08:30', client: 'Hôpital Central', personne: 'Loïc', statut: 'En cours' },
    { id: 2, heure: '10:15', client: 'Clinique Nord', personne: 'Marie', statut: 'À venir' },
    { id: 3, heure: '14:00', client: 'Centre Médical', personne: 'Paul', statut: 'À venir' },
    { id: 4, heure: '16:45', client: 'Résidence Soleil', personne: 'Jean', statut: 'Planifié' }
  ];

  // Formatter la date
  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatShortDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  // Navigation des dates
  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleSaveTrajet = (trajetData) => {
    console.log('Trajet enregistré:', trajetData);
    setShowModal(false);
  };

  // Rendu du contenu selon l'onglet actif
  const renderContent = () => {
    switch(activeTab) {
      case "Aujourd'hui":
        return (
          <div className="content-today">
            <div className="today-header">
              <h2>{formatDate(currentDate)}</h2>
              <div className="date-navigation">
                <button className="nav-button" onClick={handlePrevDay}>‹</button>
                <button className="nav-button today-btn" onClick={handleToday}>Aujourd'hui</button>
                <button className="nav-button" onClick={handleNextDay}>›</button>
              </div>
            </div>

            <div className="today-stats">
              <div className="stat-card">
                <div className="stat-number">{trajetsAujourdhui.length}</div>
                <div className="stat-label">Trajets aujourd'hui</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3/5</div>
                <div className="stat-label">Personnes disponibles</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">2/4</div>
                <div className="stat-label">Véhicules disponibles</div>
              </div>
            </div>

            <div className="today-trajets">
              <h3>Planning du jour</h3>
              <div className="trajets-list">
                {trajetsAujourdhui.map(trajet => (
                  <div key={trajet.id} className="trajet-item">
                    <div className="trajet-time">{trajet.heure}</div>
                    <div className="trajet-info">
                      <div className="trajet-client">{trajet.client}</div>
                      <div className="trajet-person">avec {trajet.personne}</div>
                    </div>
                    <div className={`trajet-statut ${trajet.statut.toLowerCase().replace(' ', '-')}`}>
                      {trajet.statut}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Personne":
        return (
          <div className="content-person">
            <div className="person-filter-header">
              <h2>Équipe & Planning</h2>
              <select 
                className="person-select-large"
                value={selectedPerson}
                onChange={(e) => setSelectedPerson(e.target.value)}
              >
                <option value="Tous">Toute l'équipe</option>
                {personnesList.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="person-grid">
              {/* Liste des personnes */}
              <div className="person-list">
                <h3>Membres de l'équipe</h3>
                {personnesList.map(person => (
                  <div 
                    key={person.id} 
                    className={`person-card ${selectedPerson === person.name || selectedPerson === 'Tous' ? 'selected' : ''}`}
                    onClick={() => setSelectedPerson(person.name)}
                  >
                    <div className="person-avatar">
                      {person.name.charAt(0)}
                    </div>
                    <div className="person-details">
                      <div className="person-name">{person.name}</div>
                      <div className="person-role">{person.role}</div>
                    </div>
                    <div className="person-stats">
                      <div className="person-trajets">{person.trajets} trajets</div>
                      <div className={`person-status ${person.statut.toLowerCase().replace('é', 'e')}`}>
                        {person.statut}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Planning de la personne sélectionnée */}
              <div className="person-planning">
                <h3>
                  {selectedPerson === 'Tous' ? 'Planning de l\'équipe' : `Planning de ${selectedPerson}`}
                </h3>
                <div className="mini-calendar">
                  <div className="mini-days">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
                      <div key={index} className="mini-day">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="mini-slots">
                    {timeSlots.slice(0, 6).map(time => (
                      <div key={time} className="mini-time-slot">
                        <div className="mini-time">{time}</div>
                        <div className="mini-activity">
                          {selectedPerson === 'Loïc' && time === '09:00' && '✓'}
                          {selectedPerson === 'Paul' && time === '10:00' && '✓'}
                          {selectedPerson === 'Jose' && time === '11:00' && '✓'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Semaine":
        return (
          <div className="content-week">
            <div className="week-header">
              <h2>Planning de la semaine</h2>
              <div className="view-selector">
                {views.map(view => (
                  <button
                    key={view}
                    className={`view-button ${selectedView === view ? 'active' : ''}`}
                    onClick={() => setSelectedView(view)}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation par semaine */}
            <div className="week-navigation">
              <button className="nav-button" onClick={handlePrevDay}>‹ Semaine précédente</button>
              <div className="current-week">
                Semaine du {formatShortDate(getStartOfWeek(currentDate))} au {formatShortDate(getEndOfWeek(currentDate))}
              </div>
              <button className="nav-button" onClick={handleNextDay}>Semaine suivante ›</button>
            </div>

            {/* Grille du calendrier */}
            <div className="calendrier-grid">
              <div className="days-header">
                <div className="day-header"></div>
                {joursSemaine.map(day => (
                  <div key={day} className="day-header">{day}</div>
                ))}
              </div>

              <div className="time-slots">
                {timeSlots.map((time, timeIndex) => (
                  <div key={time} className="time-row">
                    <div className="time-label">{time}</div>
                    {joursSemaine.map(day => (
                      <div key={`${day}-${time}`} className="day-cell">
                        {planningData[day] && timeIndex === 1 && (
                          planningData[day].map((person, index) => (
                            <div 
                              key={`${day}-${person}-${index}`} 
                              className="person-item"
                              style={{ 
                                backgroundColor: getPersonColor(person)
                              }}
                            >
                              {person}
                            </div>
                          ))
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="content-default">
            <p>Sélectionnez une vue pour afficher le contenu</p>
          </div>
        );
    }
  };

  // Fonctions utilitaires
  const getPersonColor = (name) => {
    const person = personnesList.find(p => p.name === name);
    return person ? {
      'Loïc': '#e3f2fd',
      'Paul': '#f3e5f5', 
      'Jose': '#e8f5e9',
      'Jean': '#fff3e0',
      'Jase': '#fce4ec'
    }[name] || '#e3f2fd' : '#e3f2fd';
  };

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const getEndOfWeek = (date) => {
    const start = getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  };

  return (
    <div className="page-content full-width">
      {/* Header interactif */}
      <div className="calendrier-header">
        <div className="tabs-container">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <button 
          className="add-trajet-btn"
          onClick={() => setShowModal(true)}
        >
          <span>+</span> Ajouter un trajet
        </button>
      </div>

      {/* Contenu dynamique */}
      <div className="calendrier-content">
        {renderContent()}
      </div>

      {/* Modale Ajouter Trajet */}
      <AjouterTrajet 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTrajet}
      />
    </div>
  );
};

export default Calendrier;