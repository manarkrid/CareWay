"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
let PatientsService = class PatientsService {
    getStats() {
        return {
            total: 1247,
            newThisMonth: 23,
            avgTrajets: 4.2,
            activePatients: 856,
        };
    }
    getAll() {
        const patients = [
            { id: 1, name: 'Jane Cooper', address: '2 rue Foch', phone: '(33) 568745555', email: 'jane@microsoft.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-15' },
            { id: 2, name: 'Floyd Miles', address: '1 av. Lane', phone: '(33) 568745555', email: 'floyd@yahoo.com', country: 'France', documents: 'Vide', status: 'active', dateAdded: '2024-01-14' },
            { id: 3, name: 'Ronald Richards', address: '6 rue Dufour', phone: '(33) 568745555', email: 'ronald@adobe.com', country: 'France', documents: 'Vide', status: 'active', dateAdded: '2024-01-13' },
            { id: 4, name: 'Marvin McKinney', address: '3 rue Foch', phone: '(33) 568745555', email: 'marvin@tesla.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-12' },
            { id: 5, name: 'Jerome Bell', address: '4 rue Foch', phone: '(33) 568745555', email: 'jerome@google.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-11' },
            { id: 6, name: 'Kathryn Murphy', address: '5 rue Foch', phone: '(33) 568745555', email: 'kathryn@microsoft.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-10' },
            { id: 7, name: 'Jacob Jones', address: '6 rue Foch', phone: '(33) 568745555', email: 'jacob@yahoo.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-09' },
            { id: 8, name: 'Kristin Watson', address: '7 rue Foch', phone: '(33) 568745555', email: 'kristin@facebook.com', country: 'France', documents: 'Vide', status: 'active', dateAdded: '2024-01-08' },
            { id: 9, name: 'Cameron Williamson', address: '8 rue Foch', phone: '(33) 568745555', email: 'cameron@google.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-07' },
            { id: 10, name: 'Brooklyn Simmons', address: '9 rue Foch', phone: '(33) 568745555', email: 'brooklyn@yahoo.com', country: 'France', documents: 'Vide', status: 'active', dateAdded: '2024-01-06' },
            { id: 11, name: 'Leslie Alexander', address: '10 rue Foch', phone: '(33) 568745555', email: 'leslie@microsoft.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-05' },
            { id: 12, name: 'Guy Hawkins', address: '11 av. Victor Hugo', phone: '(33) 568745555', email: 'guy@adobe.com', country: 'France', documents: 'Vide', status: 'active', dateAdded: '2024-01-04' },
            { id: 13, name: 'Annette Black', address: '12 bd de la Liberté', phone: '(33) 568745555', email: 'annette@tesla.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-03' },
            { id: 14, name: 'Cody Fisher', address: '13 rue du Général', phone: '(33) 568745555', email: 'cody@google.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2024-01-02' },
            { id: 15, name: 'Arlene McCoy', address: '14 rue de la Paix', phone: '(33) 568745555', email: 'arlene@facebook.com', country: 'France', documents: 'Vide', status: 'active', dateAdded: '2024-01-01' },
            { id: 16, name: 'Devon Lane', address: '15 rue des Fleurs', phone: '(33) 568745555', email: 'devon@microsoft.com', country: 'France', documents: 'Consulter', status: 'active', dateAdded: '2023-12-31' },
        ];
        return { data: patients, total: 1247 };
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)()
], PatientsService);
//# sourceMappingURL=patients.service.js.map