import { PrismaService } from '../../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        userId?: bigint;
        guestSessionId?: bigint;
        title: string;
        message: string;
    }): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        guestSessionId: bigint | null;
        message: string;
        title: string;
        isRead: boolean;
    }>;
    findAll(userId?: bigint, guestSessionId?: bigint): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        guestSessionId: bigint | null;
        message: string;
        title: string;
        isRead: boolean;
    }[]>;
    markAsRead(id: bigint): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        guestSessionId: bigint | null;
        message: string;
        title: string;
        isRead: boolean;
    }>;
    markAllAsRead(userId?: bigint, guestSessionId?: bigint): Promise<import("@prisma/client").Prisma.BatchPayload>;
    findAllAdmin(): Promise<({
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
    } & {
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        guestSessionId: bigint | null;
        message: string;
        title: string;
        isRead: boolean;
    })[]>;
}
