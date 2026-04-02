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
exports.DemandesController = void 0;
const common_1 = require("@nestjs/common");
const demandes_service_1 = require("./demandes.service");
let DemandesController = class DemandesController {
    constructor(demandesService) {
        this.demandesService = demandesService;
    }
    getAll() {
        return this.demandesService.getAll();
    }
    getPriceMarkers() {
        return this.demandesService.getPriceMarkers();
    }
    updateStatut(id, body) {
        return this.demandesService.updateStatut(Number(id), body.statut);
    }
};
exports.DemandesController = DemandesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DemandesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('price-markers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DemandesController.prototype, "getPriceMarkers", null);
__decorate([
    (0, common_1.Patch)(':id/statut'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DemandesController.prototype, "updateStatut", null);
exports.DemandesController = DemandesController = __decorate([
    (0, common_1.Controller)('demandes'),
    __metadata("design:paramtypes", [demandes_service_1.DemandesService])
], DemandesController);
//# sourceMappingURL=demandes.controller.js.map