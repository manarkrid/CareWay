import React, { useState } from 'react';
import './Calendrier.css';
import AjouterTrajet from './AjouterTrajet';

const Calendrier = () => {
  const [activeTab, setActiveTab] = useState("Semaine");
  const [selectedPerson, setSelectedPerson] = useState("Tous");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  // Onglets principaux
  const tabs = ["Aujourd'hui", "À venir", "Passées", "Personne", "Semaine"];

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
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  const planningData = {
    'Lundi': ['Loïc', 'Paul'],
    'Mardi': ['Jose', 'Jean'],
    'Mercredi': ['Loïc', 'Paul'],
    'Jeudi': ['Jose', 'Jean'],
    'Vendredi': ['Loïc', 'Paul'],
    'Samedi': ['Jase', 'Jean'],
    'Dimanche': ['Loïc', 'Paul']
  };

  // État global de tous les trajets (partagé entre tous les onglets)
  const [allTrajets, setAllTrajets] = useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3001/api/calendrier/today')
      .then(res => res.json())
      .then(data => setAllTrajets(data))
      .catch(() => setAllTrajets([
        { id: 1, heure: '08:30', date: 'Aujourd\'hui', client: 'Hôpital Central', personne: 'Loïc', statut: 'En cours' },
        { id: 2, heure: '10:15', date: 'Aujourd\'hui', client: 'Clinique Nord', personne: 'Marie', statut: 'À venir' },
        { id: 3, heure: '14:00', date: 'Aujourd\'hui', client: 'Centre Médical', personne: 'Paul', statut: 'À venir' },
      ]));
  }, []);

  // Trajets filtrés par onglet
  const today = new Date().toLocaleDateString('fr-FR');
  const trajetsAujourdhui = allTrajets.filter(t => !t.date || t.date === 'Aujourd\'hui' || t.date === today);
  const trajetsAvenir = allTrajets.filter(t => t.date && t.date !== 'Aujourd\'hui' && t.date !== today && !['Hier', 'Il y a 2 jours', 'Il y a 3 jours', 'Il y a 4 jours'].includes(t.date));
  const trajetsPassees = allTrajets.filter(t => ['Hier', 'Il y a 2 jours', 'Il y a 3 jours', 'Il y a 4 jours'].includes(t.date));

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

  // Navigation des dates (pour l'onglet "Aujourd'hui")
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

  // Navigation par semaine (pour l'onglet "Semaine")
  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleSaveTrajet = async (trajetData) => {
    // Déterminer la date du trajet
    const dateLabel = trajetData.dateDebut || "Aujourd'hui";
    const newTrajet = {
      id: Date.now(),
      heure: trajetData.heureDebut || '00:00',
      date: dateLabel,
      client: trajetData.nom || 'Nouveau trajet',
      personne: trajetData.personnes?.length > 0 ? trajetData.personnes[0].nom : 'Non assigné',
      statut: 'Planifié',
      from: trajetData.adresse || '',
      to: '',
    };

    // Essayer d'envoyer au backend
    try {
      const response = await fetch('http://localhost:3001/api/calendrier/trajet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trajetData)
      });
      const saved = await response.json();
      setAllTrajets(prev => [...prev, { ...newTrajet, ...saved }]);
    } catch {
      // Fallback local
      setAllTrajets(prev => [...prev, newTrajet]);
    }
    setShowModal(false);
  };

  // Fonctions utilitaires pour les semaines
  const getStartOfWeek = (date) => {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Ajuste pour que la semaine commence lundi
    const start = new Date(currentDate.setDate(diff));
    return start;
  };

  const getEndOfWeek = (date) => {
    const start = getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  };

  // Fonction pour obtenir les dates de chaque jour de la semaine actuelle
  const getWeekDays = () => {
    const start = getStartOfWeek(currentDate);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push({
        name: joursSemaine[i],
        date: day
      });
    }

    return days;
  };

  // Rendu du contenu selon l'onglet actif
  const renderContent = () => {
    switch (activeTab) {
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
                <option value="Tous">les membres</option>
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
                    {getWeekDays().map((day, index) => (
                      <div key={index} className="mini-day">
                        <div>{joursSemaine[index].charAt(0)}</div>
                        <div className="mini-date">{formatShortDate(day.date).split(' ')[0]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mini-slots">
                    {timeSlots.map(time => (
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
        const weekDays = getWeekDays();

        // Construire un index dynamique : { "Lundi-09:00": [trajet1, trajet2], ... }
        const weekIndex = {};
        allTrajets.forEach(trajet => {
          // Trouver le jour de la semaine correspondant à la date du trajet
          weekDays.forEach(day => {
            const dayStr = day.date.toLocaleDateString('fr-FR');
            if (
              trajet.date === day.name ||
              trajet.date === dayStr ||
              (trajet.date === "Aujourd'hui" && dayStr === new Date().toLocaleDateString('fr-FR'))
            ) {
              // Trouver le créneau horaire le plus proche
              const heure = trajet.heure || '08:00';
              const slotHour = heure.split(':')[0] + ':00';
              const key = `${day.name}-${slotHour}`;
              if (!weekIndex[key]) weekIndex[key] = [];
              weekIndex[key].push(trajet);
            }
          });
        });

        return (
          <div className="content-week">
            <div className="week-header">
              <h2>Planning de la semaine</h2>
              <span style={{ fontSize: 13, color: '#6c757d' }}>
                {allTrajets.length} trajet(s) au total
              </span>
            </div>

            <div className="week-navigation">
              <button className="nav-button" onClick={handlePrevWeek}>‹ Semaine précédente</button>
              <div className="current-week">
                Semaine du {formatShortDate(getStartOfWeek(currentDate))} au {formatShortDate(getEndOfWeek(currentDate))}
              </div>
              <button className="nav-button" onClick={handleNextWeek}>Semaine suivante ›</button>
            </div>

            <div className="calendrier-grid">
              <div className="days-header">
                <div className="day-header"></div>
                {weekDays.map(day => {
                  const isToday = day.date.toLocaleDateString('fr-FR') === new Date().toLocaleDateString('fr-FR');
                  return (
                    <div key={day.name} className={`day-header ${isToday ? 'today-col' : ''}`}>
                      <div className="day-name">{day.name}</div>
                      <div className="day-date">{formatShortDate(day.date)}</div>
                    </div>
                  );
                })}
              </div>

              <div className="time-slots">
                {timeSlots.map(time => (
                  <div key={time} className="time-row">
                    <div className="time-label">{time}</div>
                    {weekDays.map(day => {
                      const key = `${day.name}-${time}`;
                      const trajetsCell = weekIndex[key] || [];
                      const isToday = day.date.toLocaleDateString('fr-FR') === new Date().toLocaleDateString('fr-FR');
                      return (
                        <div key={key} className={`day-cell ${isToday ? 'today-col' : ''}`}>
                          {trajetsCell.map((t, i) => (
                            <div key={i} className="person-item" style={{ backgroundColor: getPersonColor(t.personne) }}
                              title={`${t.client} — ${t.personne} (${t.statut})`}>
                              <span style={{ fontWeight: 600, fontSize: 11 }}>{t.heure}</span>
                              <span style={{ fontSize: 11, marginLeft: 4 }}>{t.personne}</span>
                              <br />
                              <span style={{ fontSize: 10, color: '#555' }}>{t.client}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {allTrajets.length === 0 && (
              <div style={{ textAlign: 'center', padding: 40, color: '#6c757d', fontSize: 14 }}>
                Aucun trajet cette semaine. Cliquez sur "+ Ajouter un trajet" pour en créer un.
              </div>
            )}
          </div>
        );

      case "À venir":
        const mockAvenir = [
          { id: 10, heure: '14:00', date: 'Demain', client: 'Clinique du Sidobre', personne: 'Loïc', statut: 'Planifié', from: '2 rue Gambetta', to: 'Clinique du Sidobre' },
          { id: 11, heure: '09:30', date: 'Dans 2 jours', client: 'CHIC Castres', personne: 'Paul', statut: 'Planifié', from: '5 bd Roosevelt', to: 'CHIC Castres' },
          { id: 12, heure: '11:00', date: 'Dans 3 jours', client: 'EHPAD Les Pins', personne: 'Jose', statut: 'Planifié', from: '8 rue des Lilas', to: 'EHPAD Les Pins' },
        ];
        const displayAvenir = [...mockAvenir, ...trajetsAvenir];
        return (
          <div className="content-today">
            <div className="today-header">
              <h2>Missions à venir</h2>
              <span style={{ fontSize: 14, color: '#6c757d' }}>{displayAvenir.length} mission(s)</span>
            </div>
            <div className="today-trajets">
              <div className="trajets-list">
                {displayAvenir.map(t => (
                  <div key={t.id} className="trajet-item">
                    <div className="trajet-time">{t.date}<br/><small>{t.heure}</small></div>
                    <div className="trajet-info">
                      <div className="trajet-client">{t.client}</div>
                      {t.from && <div className="trajet-person">{t.from}{t.to ? ` → ${t.to}` : ''}</div>}
                      <div className="trajet-person">avec {t.personne}</div>
                    </div>
                    <div className="trajet-statut planifie">{t.statut}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Passées":
        const mockPassees = [
          { id: 20, heure: '08:30', date: 'Hier', client: 'Hôpital Central', personne: 'Loïc', statut: 'Terminé', from: '4 rue Foch', to: 'Hôpital Central' },
          { id: 21, heure: '10:15', date: 'Il y a 2 jours', client: 'Clinique Nord', personne: 'Marie', statut: 'Terminé', from: '1 av. Lane', to: 'Clinique Nord' },
          { id: 22, heure: '14:00', date: 'Il y a 3 jours', client: 'Centre Médical', personne: 'Paul', statut: 'Terminé', from: '6 rue Dufour', to: 'Centre Médical' },
          { id: 23, heure: '16:45', date: 'Il y a 4 jours', client: 'Résidence Soleil', personne: 'Jean', statut: 'Annulé', from: '3 rue Foch', to: 'Résidence Soleil' },
        ];
        const displayPassees = [...mockPassees, ...trajetsPassees];
        return (
          <div className="content-today">
            <div className="today-header">
              <h2>Missions passées</h2>
              <span style={{ fontSize: 14, color: '#6c757d' }}>{displayPassees.length} mission(s)</span>
            </div>
            <div className="today-trajets">
              <div className="trajets-list">
                {displayPassees.map(t => (
                  <div key={t.id} className="trajet-item">
                    <div className="trajet-time">{t.date}<br/><small>{t.heure}</small></div>
                    <div className="trajet-info">
                      <div className="trajet-client">{t.client}</div>
                      {t.from && <div className="trajet-person">{t.from}{t.to ? ` → ${t.to}` : ''}</div>}
                      <div className="trajet-person">avec {t.personne}</div>
                    </div>
                    <div className={`trajet-statut ${t.statut === 'Terminé' ? 'termine' : 'annule'}`}>{t.statut}</div>
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

  // Fonction utilitaire pour les couleurs
  const getPersonColor = (name) => {
    const colors = {
      'Loïc': '#e3f2fd',
      'Paul': '#f3e5f5',
      'Jose': '#e8f5e9',
      'Jean': '#fff3e0',
      'Jase': '#fce4ec'
    };
    return colors[name] || '#e3f2fd';
  };

  return (
    <div className="calendrier-wrapper">
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