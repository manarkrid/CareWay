export declare class NotificationsService {
    private notifications;
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
    resetNotifications(): void;
}
