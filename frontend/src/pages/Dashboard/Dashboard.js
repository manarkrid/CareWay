import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Dashboard CareWay - Version mise à jour
  console.log('Dashboard component loaded - New layout applied');
  // Données pour les statistiques principales
  const mainStats = [
    {
      title: 'Total patients',
      value: '856',
      subtitle: 'Patients',
      change: '+10.0%',
      positive: true
    },
    {
      title: 'Trajets effectués',
      value: '3,342',
      subtitle: 'Trajets',
      change: '+1.0%',
      positive: true
    },
    {
      title: 'Trajets en cours',
      value: '9',
      subtitle: 'Trajets',
      change: '+12.0%',
      positive: true
    },
    {
      title: 'Trajets refusés',
      value: '17',
      subtitle: 'Trajets',
      change: '-7.0%',
      positive: false
    }
  ];

  // Données pour le graphique d'évolution (simulées)
  const chartData = [
    { month: 'Jan', value: 45 },
    { month: 'Fév', value: 52 },
    { month: 'Mar', value: 58 },
    { month: 'Avr', value: 55 },
    { month: 'Mai', value: 42 },
    { month: 'Jun', value: 48 },
    { month: 'Jul', value: 51 },
    { month: 'Aoû', value: 77 },
    { month: 'Sep', value: 62 },
    { month: 'Oct', value: 59 },
    { month: 'Nov', value: 68 },
    { month: 'Déc', value: 64 }
  ];

  // Données pour l'équipe
  const equipeData = [
    {
      nom: 'Loic Dupont',
      emplacement: 'Castres',
      absence: 2,
      activite: 90,
      statut: 'Disponible'
    },
    {
      nom: 'Pierre Bois',
      emplacement: 'Toulouse',
      absence: 1,
      activite: 95,
      statut: 'En trajet'
    },
    {
      nom: 'Jose Gomez',
      emplacement: 'Castres',
      absence: 4,
      activite: 88,
      statut: 'Disponible'
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Statistiques principales */}
      <div className="main-stats">
        {mainStats.map((stat, index) => (
          <div key={index} className="main-stat-card">
            <div className="stat-header">
              <h3>{stat.title}</h3>
              <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-subtitle">{stat.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="dashboard-main">
        {/* Section gauche */}
        <div className="dashboard-left">
          {/* Graphique d'évolution */}
          <div className="chart-section">
            <div className="chart-header">
              <h3>Évolution du nombre de trajets</h3>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-color blue"></span>
                  Trajets demandés
                </span>
                <span className="legend-item">
                  <span className="legend-color dark-blue"></span>
                  Trajets réalisés
                </span>
                <select className="period-selector">
                  <option>Ce mois-ci</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-y-axis">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
              </div>
              <div className="chart-bars">
                {chartData.map((data, index) => (
                  <div key={index} className="chart-bar-container">
                    <div 
                      className="chart-bar"
                      style={{ height: `${data.value}%` }}
                    >
                      {data.value > 70 && <span className="bar-value">{data.value}</span>}
                    </div>
                    <span className="chart-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Équipe */}
          <div className="equipe-section">
            <div className="section-header">
              <h3>Équipe</h3>
              <button className="filter-btn">Filtrer ⚙️</button>
            </div>
            <div className="equipe-table">
              <table>
                <thead>
                  <tr>
                    <th>Nom de l'employé</th>
                    <th>Emplacement</th>
                    <th>Absence</th>
                    <th>Taux d'activité</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {equipeData.map((employee, index) => (
                    <tr key={index}>
                      <td>
                        <div className="employee-info">
                          <div className="employee-avatar">👤</div>
                          <span>{employee.nom}</span>
                        </div>
                      </td>
                      <td>{employee.emplacement}</td>
                      <td>{employee.absence}</td>
                      <td>
                        <span className="activity-rate">+{employee.activite}%</span>
                      </td>
                      <td>
                        <span className={`status ${employee.statut === 'Disponible' ? 'available' : 'busy'}`}>
                          {employee.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section droite */}
        <div className="dashboard-right">
          <div className="patients-repartition">
            <h3>Répartition des patients</h3>
            <div className="donut-chart">
              <div className="donut-container">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Cercle de fond */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="20"
                  />
                  {/* Segment bleu (65%) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#2196f3"
                    strokeWidth="20"
                    strokeDasharray="326 175"
                    strokeDashoffset="0"
                    transform="rotate(-90 100 100)"
                  />
                  {/* Segment vert (35%) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#00c853"
                    strokeWidth="20"
                    strokeDasharray="175 326"
                    strokeDashoffset="-326"
                    transform="rotate(-90 100 100)"
                  />
                </svg>
                <div className="donut-center">
                  <div className="percentage-35">35%</div>
                  <div className="percentage-65">65%</div>
                </div>
              </div>
              <div className="donut-legend">
                <div className="legend-item">
                  <span className="legend-dot blue"></span>
                  <span>65%</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot green"></span>
                  <span>35%</span>
                </div>
              </div>
            </div>
            <div className="patients-total">
              <strong>856 patients au total</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;