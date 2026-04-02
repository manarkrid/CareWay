import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getAll(): {
        id: number;
        title: string;
        message: string;
        time: string;
        read: boolean;
        icon: string;
    }[];
    markAllAsRead(): {
        success: boolean;
        message: string;
    };
}
