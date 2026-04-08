import React, { useState } from 'react';
import './Calendrier.css';
import AjouterTrajet from './AjouterTrajet';
import { useTrips } from '../../context/TripContext';

const Calendrier = () => {
  const { trips, employees, addNewTrajet } = useTrips();
  const [activeTab, setActiveTab] = useState("Semaine");
  const [selectedPerson, setSelectedPerson] = useState("Tous");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  // Helper to normalize any date format to YYYY-MM-DD
  const normalizeDate = (dateInput) => {
    if (!dateInput) return '';
    let d;
    if (dateInput instanceof Date) {
      d = dateInput;
    } else {
      // Handle "DD/MM/YYYY"
      if (dateInput.includes('/')) {
        const parts = dateInput.split('/');
        if (parts.length === 3) {
          d = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        }
      } 
      // Handle "D MMMM YYYY" (e.g. "8 avril 2026")
      else {
        const parts = dateInput.split(' ');
        if (parts.length >= 3) {
          const day = parseInt(parts[0]);
          const year = parseInt(parts[parts.length - 1]);
          const monthStr = parts[1].toLowerCase();
          const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
          const monthIdx = months.indexOf(monthStr);
          if (monthIdx !== -1) {
            d = new Date(year, monthIdx, day);
          }
        }
      }
    }
    
    if (!d || isNaN(d.getTime())) return '';
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // Onglets principaux
  const tabs = ["Aujourd'hui", "À venir", "Passées", "Personne", "Semaine"];

  // Données des personnes (from context)
  const personnesList = employees.map(emp => ({
    id: emp.id,
    name: emp.nom.split(' ')[0],
    fullName: emp.nom,
    role: 'Employé',
    statut: emp.statut || 'Disponible',
    trajets: trips.filter(t => t.conducteur === emp.nom).length
  }));

  const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  // Map trips to the format expected by Calendrier
  const allTrajets = trips.map(t => {
    const normalized = normalizeDate(t.date);
    const todayNormalized = normalizeDate(new Date());
    
    return {
      id: t.id,
      heure: t.raw?.heureDebut || '00:00',
      date: normalized === todayNormalized ? "Aujourd'hui" : t.date,
      normalizedDate: normalized,
      fullDate: t.date,
      client: t.patient,
      personne: t.conducteur.split(' ')[0],
      fullPersonne: t.conducteur,
      statut: t.statut,
      from: t.raw?.adresse || '',
      to: t.destination
    };
  });

  // Trajets filtrés par onglet
  const currentNormalized = normalizeDate(currentDate);
  const todayNormalized = normalizeDate(new Date());

  const trajetsAujourdhui = allTrajets.filter(t => t.normalizedDate === currentNormalized);
  
  const trajetsAvenir = allTrajets.filter(t => {
    if (!t.normalizedDate) return false;
    return t.normalizedDate > todayNormalized;
  });

  const trajetsPassees = allTrajets.filter(t => {
    if (!t.normalizedDate) return false;
    return t.normalizedDate < todayNormalized;
  });

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
    await addNewTrajet(trajetData);
    setShowModal(false);
  };

  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const getEndOfWeek = (date) => {
    const start = getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  };

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
                <div className="stat-number">{personnesList.filter(p => p.statut === 'Disponible').length}/{personnesList.length}</div>
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
                {trajetsAujourdhui.length > 0 ? trajetsAujourdhui.map(trajet => (
                  <div key={trajet.id} className="trajet-item">
                    <div className="trajet-time">{trajet.heure}</div>
                    <div className="trajet-info">
                      <div className="trajet-client">{trajet.client}</div>
                      <div className="trajet-person">avec {trajet.fullPersonne}</div>
                    </div>
                    <div className={`trajet-statut ${trajet.statut.toLowerCase().replace(' ', '-')}`}>
                      {trajet.statut}
                    </div>
                  </div>
                )) : (
                  <div className="no-trajets">Aucun trajet prévu pour aujourd'hui.</div>
                )}
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
                <option value="Tous">Tous les membres</option>
                {personnesList.map(p => (
                  <option key={p.id} value={p.fullName}>{p.fullName}</option>
                ))}
              </select>
            </div>

            <div className="person-grid">
              <div className="person-list">
                <h3>Membres de l'équipe</h3>
                {personnesList.map(person => (
                  <div
                    key={person.id}
                    className={`person-card ${selectedPerson === person.fullName || selectedPerson === 'Tous' ? 'selected' : ''}`}
                    onClick={() => setSelectedPerson(person.fullName)}
                  >
                    <div className="person-avatar">{person.name.charAt(0)}</div>
                    <div className="person-details">
                      <div className="person-name">{person.fullName}</div>
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
                    {timeSlots.map(time => {
                      const hasActivity = allTrajets.some(t => {
                        const isCorrectPerson = selectedPerson === 'Tous' || t.fullPersonne === selectedPerson;
                        const isCorrectHour = t.heure.split(':')[0] + ':00' === time;
                        return isCorrectPerson && isCorrectHour;
                      });
                      
                      return (
                        <div key={time} className="mini-time-slot">
                          <div className="mini-time">{time}</div>
                          <div className="mini-activity">
                            {hasActivity && <span className="activity-indicator">✓</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Semaine":
        const weekDays = getWeekDays();
        const weekIndex = {};
        allTrajets.forEach(trajet => {
          weekDays.forEach(day => {
            const dayNorm = normalizeDate(day.date);
            if (trajet.normalizedDate === dayNorm) {
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
                  const isToday = normalizeDate(day.date) === todayNormalized;
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
                      const isToday = normalizeDate(day.date) === todayNormalized;
                      return (
                        <div key={key} className={`day-cell ${isToday ? 'today-col' : ''}`}>
                          {trajetsCell.map((t, i) => (
                            <div key={i} className="person-item" style={{ backgroundColor: getPersonColor(t.personne) }}
                              title={`${t.client} — ${t.fullPersonne} (${t.statut})`}>
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
          </div>
        );

      case "À venir":
        return (
          <div className="content-today">
            <div className="today-header">
              <h2>Missions à venir</h2>
              <span style={{ fontSize: 14, color: '#6c757d' }}>{trajetsAvenir.length} mission(s)</span>
            </div>
            <div className="today-trajets">
              <div className="trajets-list">
                {trajetsAvenir.length > 0 ? trajetsAvenir.map(t => (
                  <div key={t.id} className="trajet-item">
                    <div className="trajet-time">{t.fullDate}<br/><small>{t.heure}</small></div>
                    <div className="trajet-info">
                      <div className="trajet-client">{t.client}</div>
                      {t.from && <div className="trajet-person">{t.from}{t.to ? ` → ${t.to}` : ''}</div>}
                      <div className="trajet-person">avec {t.fullPersonne}</div>
                    </div>
                    <div className="trajet-statut planifie">{t.statut}</div>
                  </div>
                )) : (
                  <div className="no-trajets">Aucune mission à venir.</div>
                )}
              </div>
            </div>
          </div>
        );

      case "Passées":
        return (
          <div className="content-today">
            <div className="today-header">
              <h2>Missions passées</h2>
              <span style={{ fontSize: 14, color: '#6c757d' }}>{trajetsPassees.length} mission(s)</span>
            </div>
            <div className="today-trajets">
              <div className="trajets-list">
                {trajetsPassees.length > 0 ? trajetsPassees.map(t => (
                  <div key={t.id} className="trajet-item">
                    <div className="trajet-time">{t.fullDate}<br/><small>{t.heure}</small></div>
                    <div className="trajet-info">
                      <div className="trajet-client">{t.client}</div>
                      {t.from && <div className="trajet-person">{t.from}{t.to ? ` → ${t.to}` : ''}</div>}
                      <div className="trajet-person">avec {t.fullPersonne}</div>
                    </div>
                    <div className={`trajet-statut ${t.statut === 'Terminé' ? 'termine' : 'annule'}`}>{t.statut}</div>
                  </div>
                )) : (
                  <div className="no-trajets">Aucune mission passée.</div>
                )}
              </div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  const getPersonColor = (name) => {
    const colors = {
      'Loïc': '#e3f2fd', 'Paul': '#f3e5f5', 'Jose': '#e8f5e9',
      'Marie': '#fff3e0', 'Jean': '#fce4ec', 'Pierre': '#e0f7fa'
    };
    return colors[name] || '#f8f9fa';
  };

  return (
    <div className="calendrier-wrapper">
      <div className="calendrier-header">
        <div className="tabs-container">
          {tabs.map(tab => (
            <button key={tab} className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <button className="add-trajet-btn" onClick={() => setShowModal(true)}>
          <span>+</span> Ajouter un trajet
        </button>
      </div>

      <div className="calendrier-content">
        {renderContent()}
      </div>

      <AjouterTrajet isOpen={showModal} onClose={() => setShowModal(false)} onSave={handleSaveTrajet} />
    </div>
  );
};

export default Calendrier;