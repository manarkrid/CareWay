"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
let NotificationsService = class NotificationsService {
    constructor() {
        this.notifications = [
            {
                id: 1,
                title: 'Nouveau trajet créé',
                message: 'Marie Dubois a planifié un trajet Castres → Toulouse.',
                time: 'Il y a 5 min',
                read: false,
                icon: '🚕'
            },
            {
                id: 2,
                title: 'Alerte Calendrier',
                message: 'Le trajet de François Dupont est dans 15 minutes.',
                time: 'Il y a 10 min',
                read: false,
                icon: '⏰'
            },
            {
                id: 3,
                title: 'Nouveau patient ajouté',
                message: 'Jean Martin a été ajouté avec succès.',
                time: 'Hier',
                read: true,
                icon: '👤'
            }
        ];
    }
    getAll() {
        return this.notifications;
    }
    markAllAsRead() {
        this.notifications = this.notifications.map(n => ({ ...n, read: true }));
        return { success: true, message: 'Toutes les notifications ont été marquées comme lues' };
    }
    resetNotifications() {
        this.notifications = this.notifications.map(n => {
            if (n.id === 1 || n.id === 2) {
                return { ...n, read: false };
            }
            return { ...n, read: true };
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)()
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map