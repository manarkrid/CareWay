import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendrierService {
  private todayTrajets = [
    { id: 1, heure: '08:30', client: 'Hôpital Central', personne: 'Loïc', statut: 'En cours' },
    { id: 2, heure: '10:15', client: 'Clinique Nord', personne: 'Marie', statut: 'À venir' },
    { id: 3, heure: '14:00', client: 'Centre Médical', personne: 'Paul', statut: 'À venir' },
    { id: 4, heure: '16:45', client: 'Résidence Soleil', personne: 'Jean', statut: 'Planifié' },
  ];

  getTodayTrajets() {
    return this.todayTrajets;
  }

  addTrajet(trajetData: any) {
    const newTrajet = {
      id: this.todayTrajets.length + 1,
      heure: trajetData.heureDebut || '00:00',
      client: trajetData.nom || 'Nouveau trajet',
      personne: trajetData.personnes && trajetData.personnes.length > 0 ? trajetData.personnes[0].nom : 'Non assigné',
      statut: 'Planifié',
    };
    this.todayTrajets.push(newTrajet);
    return newTrajet;
  }

  getTeam() {
    return [
      { id: 1, name: 'Loïc', role: 'Chauffeur', statut: 'Disponible', trajets: 12 },
      { id: 2, name: 'Paul', role: 'Chauffeur', statut: 'En trajet', trajets: 8 },
      { id: 3, name: 'Jose', role: 'Coordinateur', statut: 'Disponible', trajets: 15 },
      { id: 4, name: 'Jean', role: 'Chauffeur', statut: 'Congés', trajets: 10 },
      { id: 5, name: 'Jase', role: 'Assistant', statut: 'Disponible', trajets: 6 },
    ];
  }

  getPlanningHebdo() {
    return {
      joursSemaine: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      planningData: {
        'Lundi': ['Loïc', 'Paul'],
        'Mardi': ['Jose', 'Jean'],
        'Mercredi': ['Loïc', 'Paul'],
        'Jeudi': ['Jose', 'Jean'],
        'Vendredi': ['Loïc', 'Paul'],
        'Samedi': ['Jase', 'Jean'],
        'Dimanche': ['Loïc', 'Paul'],
      },
      todayStats: {
        trajetsCount: 4,
        personnesDisponibles: '3/5',
        vehiculesDisponibles: '2/4',
      },
    };
  }
}