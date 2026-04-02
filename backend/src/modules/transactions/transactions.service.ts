import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  getAll() {
    return [
      { date: '31/07/2025', idTrajet: '#TR-2038', patient: 'L. Martin', distance: '18km', statut: 'Payé (CPAM)', montant: '25€', icon: '✓' },
      { date: '31/07/2025', idTrajet: '#TR-2037', patient: 'J. Roux', distance: '12km', statut: 'Payé (CPAM)', montant: '20€', icon: '✓' },
      { date: '30/07/2025', idTrajet: '#TR-2036', patient: 'H. Bernard', distance: '25km', statut: 'Attente', montant: '31€', icon: '⏱' },
      { date: '30/07/2025', idTrajet: '#TR-2035', patient: 'E. Dupont', distance: '20km', statut: 'Rejeté', montant: '38€', icon: '✕' },
      { date: '30/07/2025', idTrajet: '#TR-2034', patient: 'C. Lisle', distance: '10km', statut: 'Payé (CPAM)', montant: '19€', icon: '✓' },
      { date: '29/07/2025', idTrajet: '#TR-2033', patient: 'M. Dubois', distance: '15km', statut: 'Payé (CPAM)', montant: '22€', icon: '✓' },
      { date: '29/07/2025', idTrajet: '#TR-2032', patient: 'P. Moreau', distance: '30km', statut: 'Attente', montant: '44€', icon: '⏱' },
      { date: '28/07/2025', idTrajet: '#TR-2031', patient: 'A. Lefebvre', distance: '8km', statut: 'Payé (CPAM)', montant: '16€', icon: '✓' },
    ];
  }

  getMonthlySummary() {
    return [
      { month: 'Juillet', totalTrajets: 108, recusCPAM: '3 742€', totalNet: '3 677€' },
      { month: 'Juin', totalTrajets: 120, recusCPAM: '4 385€', totalNet: '4 102€' },
      { month: 'Mai', totalTrajets: 95, recusCPAM: '3 290€', totalNet: '3 155€' },
      { month: 'Avril', totalTrajets: 112, recusCPAM: '3 876€', totalNet: '3 798€' },
    ];
  }

  getWeeklyRevenue() {
    return [
      { date: '26/07', montant: 210 },
      { date: '27/07', montant: 185 },
      { date: '28/07', montant: 320 },
      { date: '29/07', montant: 275 },
      { date: '30/07', montant: 340 },
      { date: '31/07', montant: 290 },
    ];
  }
}