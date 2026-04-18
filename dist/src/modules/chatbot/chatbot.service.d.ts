import { PrismaService } from '../../prisma/prisma.service';
export declare class ChatbotService {
    private prisma;
    constructor(prisma: PrismaService);
    logMessage(userId: bigint | null, message: string, response: string): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        message: string;
        response: string;
    }>;
    getHistory(userId: bigint): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        message: string;
        response: string;
    }[]>;
    getAllLogs(): Promise<({
        user: {
            name: string;
        } | null;
    } & {
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        message: string;
        response: string;
    })[]>;
    getAllSessions(): Promise<({
        user: {
            name: string;
        } | null;
    } & {
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        sessionId: string;
    })[]>;
    processMessage(message: string): Promise<string>;
    removeLog(id: bigint): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        message: string;
        response: string;
    }>;
    removeSession(id: bigint): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        sessionId: string;
    }>;
    clearAllLogs(): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
