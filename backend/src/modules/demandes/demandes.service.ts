import { Injectable } from '@nestjs/common';

@Injectable()
export class DemandesService {
  private userDemandes = new Map<number, any[]>();

  private readonly DEFAULT_DEMANDES = [
    { id: 1, name: 'Marie Dubois', date: '30/06/25', time: '10h15', from: '4 rue Foch', to: 'CHIC Castres Mazamet', type: 'VSL', direction: 'Aller-simple', distance: '22km', duration: '35mins', status: 'Attente', wait: '1h', price: 54, mutualisable: true },
    { id: 2, name: 'François Dupont', date: '22/06/25', time: '8h30', from: '6 av. Trois', to: 'Clinique du Sidobre', type: 'VSL', direction: 'Aller-simple', distance: '22km', duration: '26mins', status: 'Attente', wait: '30mins', price: 43, mutualisable: false },
    { id: 3, name: 'Anne Pichet', date: '20/06/25', time: '9h15', from: '32 rue du Lilas', to: 'EHPAD', type: 'VSL', direction: 'Aller-simple', distance: '19km', duration: '15mins', status: 'Attente', price: 36, mutualisable: true },
    { id: 4, name: 'Jean-Paul Renard', date: '18/06/25', time: '11h00', from: '5 bd Roosevelt', to: 'Centre Médical du Soult', type: 'TAXI', direction: 'Aller-retour', distance: '14km', duration: '20mins', status: 'Attente', wait: '2h', price: 42, mutualisable: true },
    { id: 5, name: 'Sophie Martin', date: '17/06/25', time: '14h30', from: '2 rue Gambetta', to: 'Cabinet Médical Centre', type: 'VSL', direction: 'Aller-simple', distance: '8km', duration: '12mins', status: 'Attente', price: 25, mutualisable: false },
  ];

  private getDemandesForUser(userId: number): any[] {
    if (!this.userDemandes.has(userId)) {
      // Clone DEFAULT_DEMANDES for this new user
      this.userDemandes.set(userId, JSON.parse(JSON.stringify(this.DEFAULT_DEMANDES)));
    }
    return this.userDemandes.get(userId);
  }

  getAll(userId: number) {
    return this.getDemandesForUser(userId);
  }

  updateStatut(userId: number, id: number, statut: string) {
    const demandes = this.getDemandesForUser(userId);
    const demande = demandes.find(d => d.id === id);
    if (!demande) return { error: 'Demande non trouvée' };
    demande.status = statut;
    return demande;
  }

  getPriceMarkers() { // Shared or per-user? Let's keep it shared as it's static for now
    return [
      { price: 36, left: '15%', top: '25%' },
      { price: 25, left: '25%', top: '35%' },
      { price: 35, left: '30%', top: '40%' },
      { price: 54, left: '45%', top: '35%' },
      { price: 42, left: '35%', top: '50%' },
      { price: 43, left: '40%', top: '60%' },
      { price: 51, left: '50%', top: '55%' },
      { price: 22, left: '60%', top: '50%' },
      { price: 23, left: '55%', top: '65%' },
      { price: 34, left: '65%', top: '65%' },
      { price: 35, left: '70%', top: '55%' },
      { price: 50, left: '80%', top: '70%' },
      { price: 45, left: '75%', top: '80%' },
      { price: 43, left: '85%', top: '80%' },
    ];
  }
}