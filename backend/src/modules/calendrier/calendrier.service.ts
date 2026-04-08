import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { EntrepriseService } from '../entreprise/entreprise.service';

@Injectable()
export class CalendrierService {
  constructor(private readonly entrepriseService: EntrepriseService) {}

  private todayTrajets = [];

  getTodayTrajets() {
    // Return both local mock and trips from entreprise
    const entrepriseTrips = this.entrepriseService.getTrajets().map(t => ({
      id: t.id,
      heure: (t as any).raw?.heureDebut || '00:00',
      client: t.patient,
      personne: t.conducteur.split(' ')[0],
      statut: t.statut
    }));
    return entrepriseTrips;
  }

  addTrajet(trajetData: any) {
    return this.entrepriseService.addTrajet(trajetData);
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