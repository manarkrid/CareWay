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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntrepriseController = void 0;
const common_1 = require("@nestjs/common");
const entreprise_service_1 = require("./entreprise.service");
let EntrepriseController = class EntrepriseController {
    constructor(entrepriseService) {
        this.entrepriseService = entrepriseService;
    }
    getEquipe() {
        return this.entrepriseService.getEquipe();
    }
    getVehicules() {
        return this.entrepriseService.getVehicules();
    }
    getTrajets() {
        return this.entrepriseService.getTrajets();
    }
    getContrats() {
        return this.entrepriseService.getContrats();
    }
    getHistorique() {
        return this.entrepriseService.getHistorique();
    }
    getNotifications() {
        return this.entrepriseService.getNotifications();
    }
    getRapports() {
        return this.entrepriseService.getRapports();
    }
    downloadReport(id, res) {
        const csv = this.entrepriseService.downloadReport(id);
        if (!csv) {
            return res.status(404).json({ message: 'Rapport non trouvé' });
        }
        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', `attachment; filename="rapport-${id}.csv"`);
        return res.send(csv);
    }
};
exports.EntrepriseController = EntrepriseController;
__decorate([
    (0, common_1.Get)('equipe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntrepriseController.prototype, "getEquipe", null);
__decorate([
    (0, common_1.Get)('vehicules'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntrepriseController.prototype, "getVehicules", null);
__decorate([
    (0, common_1.Get)('trajets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntrepriseController.prototype, "getTrajets", null);
__decorate([
    (0, common_1.Get)('contrats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntrepriseController.prototype, "getContrats", null);
__decorate([
    (0, common_1.Get)('historique'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntrepriseController.prototype, "getHistorique", null);
__decorate([
    (0, common_1.Get)('notifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntrepriseController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)('rapports'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntrepriseController.prototype, "getRapports", null);
__decorate([
    (0, common_1.Get)('rapport/:id/download'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EntrepriseController.prototype, "downloadReport", null);
exports.EntrepriseController = EntrepriseController = __decorate([
    (0, common_1.Controller)('entreprise'),
    __metadata("design:paramtypes", [entreprise_service_1.EntrepriseService])
], EntrepriseController);
//# sourceMappingURL=entreprise.controller.js.map