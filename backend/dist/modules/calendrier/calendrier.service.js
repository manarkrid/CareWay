"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendrierService = void 0;
const common_1 = require("@nestjs/common");
const entreprise_service_1 = require("../entreprise/entreprise.service");
let CalendrierService = class CalendrierService {
    constructor(entrepriseService) {
        this.entrepriseService = entrepriseService;
        this.todayTrajets = [];
    }
    getTodayTrajets() {
        const entrepriseTrips = this.entrepriseService.getTrajets().map(t => ({
            id: t.id,
            heure: t.raw?.heureDebut || '00:00',
            client: t.patient,
            personne: t.conducteur.split(' ')[0],
            statut: t.statut
        }));
        return entrepriseTrips;
    }
    addTrajet(trajetData) {
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
};
exports.CalendrierService = CalendrierService;
exports.CalendrierService = CalendrierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [entreprise_service_1.EntrepriseService])
], CalendrierService);
//# sourceMappingURL=calendrier.service.js.map