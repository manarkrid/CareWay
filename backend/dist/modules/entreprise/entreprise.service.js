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
    async getEmployees() {
        return [
            {
                id: 1,
                firstName: 'Loic',
                lastName: 'Dupont',
                role: 'Ambulancier',
                activityRate: 90,
                absenceDays: 2,
                status: 'Disponible'
            },
            {
                id: 2,
                firstName: 'Pierre',
                lastName: 'Bois',
                role: 'Chauffeur',
                activityRate: 95,
                absenceDays: 1,
                status: 'En trajet'
            }
        ];
    }
    async getVehicles() {
        return [
            {
                id: 1,
                registration: 'AB-133-BC',
                type: 'Ambulance',
                mileage: 45000,
                nextMaintenance: '2025-08-26',
                status: 'Disponible'
            },
            {
                id: 2,
                registration: 'ZV-887-FV',
                type: 'VSL',
                mileage: 120050,
                nextMaintenance: '2027-02-18',
                status: 'Disponible'
            }
        ];
    }
    async getContracts() {
        return [
            {
                id: 1,
                partnerName: 'CPAM Tarn',
                type: 'Public',
                status: 'En cours'
            },
            {
                id: 2,
                partnerName: 'Ct. du Sidobre',
                type: 'Privé',
                status: 'En cours'
            }
        ];
    }
    async getStats() {
        return {
            employees: 2,
            vehicles: 2,
            contracts: 2,
            totalTrips: 3359,
            delays: 3,
            cancellations: 12,
            incidents: 1,
        };
    }
};
exports.EntrepriseService = EntrepriseService;
exports.EntrepriseService = EntrepriseService = __decorate([
    (0, common_1.Injectable)()
], EntrepriseService);
//# sourceMappingURL=entreprise.service.js.map