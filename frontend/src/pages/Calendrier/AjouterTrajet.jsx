import React, { useState } from 'react';
import './AjouterTrajet.css';

const AjouterTrajet = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nom: '',
    dateDebut: '',
    heureDebut: '',
    heureFin: '',
    adresse: '',
    personnes: [],
    repetition: 'Aucune',
    joursSemaine: []
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePickerStart, setShowTimePickerStart] = useState(false);
  const [showTimePickerEnd, setShowTimePickerEnd] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const suggestions = [
    {
      id: 1,
      titre: "Créneau disponible 1",
      date: "19 Juin 2025",
      heure: "8h15 : 10h30"
    },
    {
      id: 2,
      titre: "Créneau disponible 2",
      date: "21 Juin 2025",
      heure: "8h15 : 10h30"
    }
  ];

  const personnesDisponibles = [
    { id: 1, nom: "Loïc Dupont" },
    { id: 2, nom: "Pierre Bois" },
    { id: 3, nom: "Jean Martin" },
    { id: 4, nom: "Paul Durand" }
  ];

  const joursOptions = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const heures = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : `${i}`;
    return [`${hour}:00`, `${hour}:15`, `${hour}:30`, `${hour}:45`];
  }).flat();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleDateSelect = (date) => {
    setFormData(prev => ({
      ...prev,
      dateDebut: formatDate(date)
    }));
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleTimeSelectStart = (time) => {
    setFormData(prev => ({
      ...prev,
      heureDebut: time
    }));
    setShowTimePickerStart(false);
  };

  const handleTimeSelectEnd = (time) => {
    setFormData(prev => ({
      ...prev,
      heureFin: time
    }));
    setShowTimePickerEnd(false);
  };

  const handleAddPerson = (person) => {
    if (!formData.personnes.some(p => p.id === person.id)) {
      setFormData(prev => ({
        ...prev,
        personnes: [...prev.personnes, person]
      }));
    }
  };

  const handleRemovePerson = (personId) => {
    setFormData(prev => ({
      ...prev,
      personnes: prev.personnes.filter(p => p.id !== personId)
    }));
  };

  const handleToggleDay = (day) => {
    setFormData(prev => {
      const jours = prev.joursSemaine.includes(day)
        ? prev.joursSemaine.filter(d => d !== day)
        : [...prev.joursSemaine, day];
      return { ...prev, joursSemaine: jours };
    });
  };

  const handleSubmit = () => {
    console.log('Trajet ajouté:', formData);
    if (onSave) onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  // Générer les jours du mois
  const generateDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Jours vides au début
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = formatDate(date) === formData.dateDebut;
      
      days.push(
        <div 
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateSelect(date)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>Ajouter un nouveau trajet</h2>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Nom du trajet */}
          <input
            type="text"
            className="trajet-name-input"
            placeholder="Nom du trajet..."
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
          />

          {/* Suggestions */}
          <div className="suggestions-section">
            <h3>
              Suggestions Trouvées
            </h3>
            {suggestions.map(suggestion => (
              <div 
                key={suggestion.id}
                className="suggestion-item"
              >
                <h4>{suggestion.titre}</h4>
                <div className="suggestion-date">{suggestion.date}</div>
                <div className="suggestion-time">{suggestion.heure}</div>
              </div>
            ))}
          </div>

          {/* Date & Heure */}
          <div className="date-time-section">
            <div className="section-title">
              <span>Date & Heure</span>
              <select className="timezone-select">
                <option>Fuseau horaire ▼</option>
                <option>Europe/Paris</option>
                <option>UTC</option>
              </select>
            </div>

            {/* Ligne de séparation */}
            <div style={{ 
              height: '1px', 
              background: '#e9ecef', 
              margin: '24px 0',
              border: 'none' 
            }} />

            <h3 className="section-title">Date du trajet</h3>

            {/* Date Picker */}
            <div className="date-picker">
              <div className="date-input-wrapper">
                <div className="date-input" onClick={() => setShowDatePicker(!showDatePicker)}>
                  {formData.dateDebut || "Choisir une date"}
                </div>
                
                {showDatePicker && (
                  <div className="calendar-popup">
                    <div className="calendar-header">
                      <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
                        ‹
                      </button>
                      <span>
                        {selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </span>
                      <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
                        ›
                      </button>
                    </div>
                    <div className="calendar-weekdays">
                      <div>L</div>
                      <div>M</div>
                      <div>M</div>
                      <div>J</div>
                      <div>V</div>
                      <div>S</div>
                      <div>D</div>
                    </div>
                    <div className="calendar-days">
                      {generateDays()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Time Pickers */}
            <div className="time-inputs">
              <div className="time-input-wrapper">
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>De</div>
                <div className="time-input" onClick={() => setShowTimePickerStart(!showTimePickerStart)}>
                  {formData.heureDebut || "Choisir une heure"}
                </div>
                
                {showTimePickerStart && (
                  <div className="time-picker-popup">
                    <div className="time-picker-list">
                      {heures.map((time, index) => (
                        <div 
                          key={index}
                          className={`time-option ${formData.heureDebut === time ? 'selected' : ''}`}
                          onClick={() => handleTimeSelectStart(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="time-input-wrapper">
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>A</div>
                <div className="time-input" onClick={() => setShowTimePickerEnd(!showTimePickerEnd)}>
                  {formData.heureFin || "Choisir une heure"}
                </div>
                
                {showTimePickerEnd && (
                  <div className="time-picker-popup">
                    <div className="time-picker-list">
                      {heures.map((time, index) => (
                        <div 
                          key={index}
                          className={`time-option ${formData.heureFin === time ? 'selected' : ''}`}
                          onClick={() => handleTimeSelectEnd(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div className="field-group">
            <label className="field-label">Entrer une adresse</label>
            <input
              type="text"
              className="address-input"
              placeholder="Adresse de départ..."
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
            />
          </div>

          {/* Personnes */}
          <div className="field-group">
            <label className="field-label">Ajouter des personnes</label>
            <select 
              className="people-select"
              onChange={(e) => {
                const person = personnesDisponibles.find(p => p.id === parseInt(e.target.value));
                if (person) handleAddPerson(person);
                e.target.value = '';
              }}
            >
              <option value="">Sélectionner une personne</option>
              {personnesDisponibles.map(person => (
                <option key={person.id} value={person.id}>
                  {person.nom}
                </option>
              ))}
            </select>

            {/* Personnes sélectionnées */}
            <div className="selected-people">
              {formData.personnes.map(person => (
                <div key={person.id} className="selected-person">
                  <span>{person.nom}</span>
                  <button 
                    className="remove-person"
                    onClick={() => handleRemovePerson(person.id)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Répétition */}
          <div className="field-group">
            <label className="field-label">Répétition</label>
            <select 
              className="repetition-select"
              name="repetition"
              value={formData.repetition}
              onChange={handleInputChange}
            >
              <option>Aucune</option>
              <option>Tous les jours</option>
              <option>Toutes les semaines</option>
              <option>Tous les mois</option>
            </select>

            {/* Jours de la semaine (si répétition hebdomadaire) */}
            {formData.repetition === 'Toutes les semaines' && (
              <div className="weekdays-selector">
                {joursOptions.map((day, index) => (
                  <button
                    key={index}
                    className={`weekday-btn ${formData.joursSemaine.includes(day) ? 'selected' : ''}`}
                    onClick={() => handleToggleDay(day)}
                    type="button"
                  >
                    {day}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Annuler
          </button>
          <button className="save-btn" onClick={handleSubmit}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AjouterTrajet;