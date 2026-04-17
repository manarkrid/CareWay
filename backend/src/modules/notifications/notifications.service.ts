import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    private userNotifications = new Map<number, any[]>();

    private readonly DEFAULT_NOTIFICATIONS = [
        { id: 1, title: 'Nouveau trajet créé', message: 'Marie Dubois a planifié un trajet Castres → Toulouse.', time: 'Il y a 5 min', read: false, icon: '🚕' },
        { id: 2, title: 'Alerte Calendrier', message: 'Le trajet de François Dupont est dans 15 minutes.', time: 'Il y a 10 min', read: false, icon: '⏰' },
        { id: 3, title: 'Nouveau patient ajouté', message: 'Jean Martin a été ajouté avec succès.', time: 'Hier', read: true, icon: '👤' }
    ];

    private getNotificationsForUser(userId: number): any[] {
        if (!this.userNotifications.has(userId)) {
            this.userNotifications.set(userId, JSON.parse(JSON.stringify(this.DEFAULT_NOTIFICATIONS)));
        }
        return this.userNotifications.get(userId);
    }

    getAll(userId: number) {
        return this.getNotificationsForUser(userId);
    }

    markAllAsRead(userId: number) {
        const notifications = this.getNotificationsForUser(userId);
        const updated = notifications.map(n => ({ ...n, read: true }));
        this.userNotifications.set(userId, updated);
        return { success: true, message: 'Toutes les notifications ont été marquées comme lues' };
    }

    resetNotifications(userId: number) {
        const notifications = this.getNotificationsForUser(userId);
        const updated = notifications.map(n => {
            if (n.id === 1 || n.id === 2) return { ...n, read: false };
            return { ...n, read: true };
        });
        this.userNotifications.set(userId, updated);
    }
}
