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
exports.EntrepriseController = void 0;
const common_1 = require("@nestjs/common");
const entreprise_service_1 = require("./entreprise.service");
let EntrepriseController = class EntrepriseController {
    constructor(entrepriseService) {
        this.entrepriseService = entrepriseService;
    }
    async getEmployees() {
        return this.entrepriseService.getEmployees();
    }
    async getVehicles() {
        return this.entrepriseService.getVehicles();
    }
    async getContracts() {
        return this.entrepriseService.getContracts();
    }
    async getStats() {
        return this.entrepriseService.getStats();
    }
};
exports.EntrepriseController = EntrepriseController;
__decorate([
    (0, common_1.Get)('employees'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EntrepriseController.prototype, "getEmployees", null);
__decorate([
    (0, common_1.Get)('vehicles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EntrepriseController.prototype, "getVehicles", null);
__decorate([
    (0, common_1.Get)('contracts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EntrepriseController.prototype, "getContracts", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EntrepriseController.prototype, "getStats", null);
exports.EntrepriseController = EntrepriseController = __decorate([
    (0, common_1.Controller)('entreprise'),
    __metadata("design:paramtypes", [entreprise_service_1.EntrepriseService])
], EntrepriseController);
//# sourceMappingURL=entreprise.controller.js.map