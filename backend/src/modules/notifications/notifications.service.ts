import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    private notifications = [
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
}
