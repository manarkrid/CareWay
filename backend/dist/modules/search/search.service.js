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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const demandes_service_1 = require("../demandes/demandes.service");
const patients_service_1 = require("../patients/patients.service");
let SearchService = class SearchService {
    constructor(demandesService, patientsService) {
        this.demandesService = demandesService;
        this.patientsService = patientsService;
    }
    search(query) {
        if (!query || query.trim() === '') {
            return { patients: [], demandes: [], pages: [] };
        }
        const lowerQuery = query.toLowerCase();
        const allPages = [
            { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
            { id: 'entreprise', label: 'Entreprise & Flotte', icon: '🏢' },
            { id: 'transactions', label: 'Transactions', icon: '💶' },
            { id: 'demandes', label: 'Demandes de trajets', icon: '🚕' },
            { id: 'patients', label: 'Patients', icon: '👥' },
            { id: 'calendrier', label: 'Calendrier', icon: '📅' },
            { id: 'profil', label: 'Mon Profil', icon: '👤' },
        ];
        const matchedPages = allPages.filter(p => p.label.toLowerCase().includes(lowerQuery));
        const { data: allPatients } = this.patientsService.getAll();
        const matchedPatients = allPatients
            .filter(p => p.name.toLowerCase().includes(lowerQuery) || (p.address && p.address.toLowerCase().includes(lowerQuery)))
            .slice(0, 5)
            .map(p => ({ id: p.id, label: p.name, subLabel: p.address, action: 'patients', icon: '👤' }));
        const allDemandes = this.demandesService.getAll();
        const matchedDemandes = allDemandes
            .filter(d => d.name.toLowerCase().includes(lowerQuery) || d.from.toLowerCase().includes(lowerQuery) || d.to.toLowerCase().includes(lowerQuery))
            .slice(0, 5)
            .map(d => ({ id: d.id, label: `${d.name}`, subLabel: `${d.from} → ${d.to} (${d.date})`, action: 'demandes', icon: '🚕' }));
        return {
            pages: matchedPages,
            patients: matchedPatients,
            demandes: matchedDemandes
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [demandes_service_1.DemandesService,
        patients_service_1.PatientsService])
], SearchService);
//# sourceMappingURL=search.service.js.map