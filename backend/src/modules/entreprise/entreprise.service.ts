import { Injectable } from '@nestjs/common';

@Injectable()
export class EntrepriseService {
  getEquipe() {
    return [
      { nom: 'Loic Dupont', emplacement: 'Castres', absence: 2, activite: 90, statut: 'Disponible' },
      { nom: 'Pierre Bois', emplacement: 'Toulouse', absence: 1, activite: 95, statut: 'En trajet' },
      { nom: 'Jose Gomez', emplacement: 'Castres', absence: 4, activite: 88, statut: 'Disponible' },
      { nom: 'Marie Lefèvre', emplacement: 'Castres', absence: 0, activite: 98, statut: 'En trajet' },
      { nom: 'Jean Petit', emplacement: 'Albi', absence: 3, activite: 82, statut: 'Congés' },
    ];
  }

  getVehicules() {
    return [
      { id: 'V-001', immatriculation: 'AB-123-CD', type: 'VSL', marque: 'Renault Trafic', statut: 'Disponible', km: 45230 },
      { id: 'V-002', immatriculation: 'EF-456-GH', type: 'VSL', marque: 'Peugeot Expert', statut: 'En service', km: 72450 },
      { id: 'V-003', immatriculation: 'IJ-789-KL', type: 'Ambulance', marque: 'Mercedes Sprinter', statut: 'Maintenance', km: 98120 },
      { id: 'V-004', immatriculation: 'MN-012-OP', type: 'TAXI', marque: 'Toyota Prius', statut: 'Disponible', km: 32100 },
    ];
  }

  getTrajets() {
    return [
      { id: '#TR-2038', date: '31/07/2025', conducteur: 'Loic Dupont', patient: 'L. Martin', distance: '18km', statut: 'Terminé' },
      { id: '#TR-2037', date: '31/07/2025', conducteur: 'Pierre Bois', patient: 'J. Roux', distance: '12km', statut: 'Terminé' },
      { id: '#TR-2036', date: '30/07/2025', conducteur: 'Jose Gomez', patient: 'H. Bernard', distance: '25km', statut: 'En cours' },
      { id: '#TR-2035', date: '30/07/2025', conducteur: 'Marie Lefèvre', patient: 'E. Dupont', distance: '20km', statut: 'Planifié' },
    ];
  }

  getContrats() {
    return [
      { id: 'C-001', organisme: 'CPAM du Tarn', type: 'Convention', dateDebut: '01/01/2025', dateFin: '31/12/2025', statut: 'Actif' },
      { id: 'C-002', organisme: 'MSA Midi-Pyrénées', type: 'Convention', dateDebut: '01/03/2025', dateFin: '28/02/2026', statut: 'Actif' },
      { id: 'C-003', organisme: 'Mutuelle Nationale', type: 'Contrat', dateDebut: '01/06/2025', dateFin: '31/05/2026', statut: 'Actif' },
    ];
  }

  getHistorique() {
    return {
      chartData: [
        { month: 'Jan', value: 45 },
        { month: 'Fév', value: 52 },
        { month: 'Mar', value: 58 },
        { month: 'Avr', value: 55 },
        { month: 'Mai', value: 42 },
        { month: 'Jun', value: 48 },
        { month: 'Jul', value: 77 },
      ],
      totalTrajets: 3342,
      totalRevenu: '115 420€',
      tauxSatisfaction: '94%',
    };
  }

  getNotifications() {
    return [
      { id: 1, type: 'alerte', message: 'Maintenance véhicule V-003 prévue dans 3 jours', date: '04/03/2026', priorite: 'haute' },
      { id: 2, type: 'info', message: 'Nouveau contrat CPAM enregistré avec succès', date: '03/03/2026', priorite: 'normale' },
      { id: 3, type: 'alerte', message: 'Jean Petit en congés du 05/03 au 12/03', date: '02/03/2026', priorite: 'normale' },
      { id: 4, type: 'info', message: '8 télétransmissions en attente de validation', date: '01/03/2026', priorite: 'haute' },
    ];
  }

  getRapports() {
    return [
      { id: 1, titre: 'Rapport mensuel - Mars 2026', type: 'Mensuel', date: '01/04/2026', trajets: 342, revenus: '12 450€', tauxAcceptation: '94%' },
      { id: 2, titre: 'Rapport mensuel - Février 2026', type: 'Mensuel', date: '01/03/2026', trajets: 298, revenus: '10 820€', tauxAcceptation: '91%' },
      { id: 3, titre: 'Rapport mensuel - Janvier 2026', type: 'Mensuel', date: '01/02/2026', trajets: 315, revenus: '11 340€', tauxAcceptation: '93%' },
      { id: 4, titre: 'Rapport annuel - 2025', type: 'Annuel', date: '01/01/2026', trajets: 3342, revenus: '115 420€', tauxAcceptation: '92%' },
    ];
  }

  downloadReport(id: string) {
    const reports = this.getRapports();
    const report = reports.find(r => r.id === parseInt(id));
    if (!report) return null;

    // Simulate CSV content
    return `Titre,Type,Date,Trajets,Revenus,Taux Acceptation\n${report.titre},${report.type},${report.date},${report.trajets},"${report.revenus}",${report.tauxAcceptation}`;
  }
}