"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntrepriseService = void 0;
const common_1 = require("@nestjs/common");
let EntrepriseService = class EntrepriseService {
    constructor() {
        this.equipe = [
            { id: 1, nom: 'Loic Dupont', emplacement: 'Castres', absence: 2, activite: 90, statut: 'Disponible' },
            { id: 2, nom: 'Pierre Bois', emplacement: 'Toulouse', absence: 1, activite: 95, statut: 'En trajet' },
            { id: 3, nom: 'Jose Gomez', emplacement: 'Castres', absence: 4, activite: 88, statut: 'Disponible' },
            { id: 4, nom: 'Marie Lefèvre', emplacement: 'Castres', absence: 0, activite: 98, statut: 'En trajet' },
            { id: 5, nom: 'Jean Petit', emplacement: 'Albi', absence: 3, activite: 82, statut: 'Congés' },
        ];
        this.notificationSettings = [
            { id: 1, label: 'Refus auto', description: 'Trajets à 15€ / à -3km', enabled: true },
            { id: 2, label: 'Refus auto', description: 'Trajets à 1h d\'avance', enabled: true },
            { id: 3, label: 'Notification conflit planning', description: '', enabled: true },
            { id: 4, label: 'Alerte maintenance véhicule', description: '7j avant', enabled: true }
        ];
        this.trajets = [
            { id: '#TR-2038', date: '31/07/2025', conducteur: 'Loic Dupont', patient: 'L. Martin', destination: 'Toulouse', distance: '18km', statut: 'Terminé', month: 'Juillet', raw: {} },
            { id: '#TR-2037', date: '31/07/2025', conducteur: 'Pierre Bois', patient: 'J. Roux', destination: 'Castres', distance: '12km', statut: 'Terminé', month: 'Juillet', raw: {} },
            { id: '#TR-2036', date: '30/08/2025', conducteur: 'Jose Gomez', patient: 'H. Bernard', destination: 'Albi', distance: '25km', statut: 'En cours', month: 'Août', raw: {} },
            { id: '#TR-2035', date: '30/08/2025', conducteur: 'Marie Lefèvre', patient: 'E. Dupont', destination: 'Mazamet', distance: '20km', statut: 'Planifié', month: 'Août', raw: {} },
            { id: '#TR-2034', date: '29/08/2025', conducteur: 'Jean Petit', patient: 'A. Robert', destination: 'Castres', distance: '5km', statut: 'Refusé', month: 'Août', raw: {} },
        ];
    }
    getEquipe() {
        return this.equipe;
    }
    addEmployee(employee) {
        const newEmployee = {
            id: this.equipe.length + 1,
            ...employee,
            absence: 0,
            activite: 100,
            statut: employee.statut || 'Disponible'
        };
        this.equipe.push(newEmployee);
        return newEmployee;
    }
    getVehicules() {
        return [
            { id: 'V-001', immatriculation: 'AB-123-CD', type: 'VSL', marque: 'Renault Trafic', statut: 'Disponible', km: 45230 },
            { id: 'V-002', immatriculation: 'EF-456-GH', type: 'VSL', marque: 'Peugeot Expert', statut: 'En service', km: 72450 },
            { id: 'V-003', immatriculation: 'IJ-789-KL', type: 'Ambulance', marque: 'Mercedes Sprinter', statut: 'Maintenance', km: 98120 },
            { id: 'V-004', immatriculation: 'MN-012-OP', type: 'TAXI', marque: 'Toyota Prius', statut: 'Disponible', km: 32100 },
        ];
    }
    getTrajets(month) {
        if (month && month !== 'Tout') {
            return this.trajets.filter(t => t.month === month);
        }
        return this.trajets;
    }
    addTrajet(trajetData) {
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const now = new Date();
        const currentMonth = months[now.getMonth()];
        const newTrajet = {
            id: `#TR-${2038 + this.trajets.length}`,
            date: trajetData.dateDebut || now.toLocaleDateString('fr-FR'),
            conducteur: trajetData.personnes?.[0]?.nom || 'Non assigné',
            patient: trajetData.nom || 'Patient inconnu',
            destination: trajetData.adresse || 'Destination inconnue',
            distance: '0km',
            statut: 'Planifié',
            month: currentMonth,
            raw: trajetData
        };
        this.trajets.unshift(newTrajet);
        return newTrajet;
    }
    getNextTrip() {
        const next = this.trajets.find(t => t.statut === 'Planifié' || t.statut === 'En cours');
        if (next) {
            const raw = next.raw;
            return {
                date: next.date.split('/')[0] || '??',
                label: 'Trajet à venir',
                participant: `${next.patient} par ${next.conducteur.split(' ')[0]}`,
                departure: (raw?.heureDebut || '00:00') + ' ' + (raw?.adresse || 'Lieu'),
                arrival: (raw?.heureFin || '00:00') + ' ' + (next.destination || 'Destination'),
                details: raw?.repetition !== 'Aucune' ? `Répétition: ${raw?.repetition}` : 'Trajet ponctuel.'
            };
        }
        return null;
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
            totalTrajets: this.trajets.filter(t => t.statut === 'Terminé').length + 3342,
            totalRevenu: '115 420€',
            tauxSatisfaction: '94%',
            retards: 3,
            annulations: this.trajets.filter(t => t.statut === 'Refusé').length + 12,
            incidents: 1
        };
    }
    getDashboardStats() {
        return [
            {
                title: 'Total patients',
                value: '856',
                subtitle: 'Patients',
                change: '+10.0%',
                positive: true
            },
            {
                title: 'Trajets effectués',
                value: (this.trajets.filter(t => t.statut === 'Terminé').length + 3342).toLocaleString(),
                subtitle: 'Trajets',
                change: '+1.0%',
                positive: true
            },
            {
                title: 'Trajets en cours',
                value: this.trajets.filter(t => t.statut === 'En cours').length.toString(),
                subtitle: 'Trajets',
                change: '+12.0%',
                positive: true
            },
            {
                title: 'Trajets refusés',
                value: (this.trajets.filter(t => t.statut === 'Refusé').length + 17).toString(),
                subtitle: 'Trajets',
                change: '-7.0%',
                positive: false
            }
        ];
    }
    getNotificationSettings() {
        return this.notificationSettings;
    }
    updateNotificationSetting(id, enabled) {
        const setting = this.notificationSettings.find(s => s.id === id);
        if (setting) {
            setting.enabled = enabled;
        }
        return setting;
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
    downloadReport(id) {
        const reports = this.getRapports();
        const report = reports.find(r => r.id === parseInt(id));
        if (!report)
            return null;
        return `Titre,Type,Date,Trajets,Revenus,Taux Acceptation\n${report.titre},${report.type},${report.date},${report.trajets},"${report.revenus}",${report.tauxAcceptation}`;
    }
};
exports.EntrepriseService = EntrepriseService;
exports.EntrepriseService = EntrepriseService = __decorate([
    (0, common_1.Injectable)()
], EntrepriseService);
//# sourceMappingURL=entreprise.service.js.map