import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(req: any): Promise<{
        id: bigint;
        createdAt: Date;
        message: string;
        userId: bigint | null;
        guestSessionId: bigint | null;
        title: string;
        isRead: boolean;
    }[]>;
    markAsRead(id: string): Promise<{
        id: bigint;
        createdAt: Date;
        message: string;
        userId: bigint | null;
        guestSessionId: bigint | null;
        title: string;
        isRead: boolean;
    }>;
    markAllAsRead(req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
