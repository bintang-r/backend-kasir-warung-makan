import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(req: any): Promise<{
        id: bigint;
        createdAt: Date;
        title: string;
        userId: bigint | null;
        guestSessionId: bigint | null;
        message: string;
        isRead: boolean;
    }[]>;
    markAsRead(id: string): Promise<{
        id: bigint;
        createdAt: Date;
        title: string;
        userId: bigint | null;
        guestSessionId: bigint | null;
        message: string;
        isRead: boolean;
    }>;
    markAllAsRead(req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    getAllForAdmin(): Promise<{
        id: string;
        userId: string | undefined;
        guestSessionId: string | undefined;
        user: {
            name: string;
        } | null;
        guestSession: {
            id: bigint;
            createdAt: Date;
            tableId: bigint | null;
            token: string;
            expiresAt: Date;
        } | null;
        createdAt: Date;
        title: string;
        message: string;
        isRead: boolean;
    }[]>;
}
