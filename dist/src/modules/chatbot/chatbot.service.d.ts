import { PrismaService } from '../../prisma/prisma.service';
export declare class ChatbotService {
    private prisma;
    constructor(prisma: PrismaService);
    logMessage(userId: bigint | null, message: string, response: string): Promise<{
        id: bigint;
        createdAt: Date;
        message: string;
        userId: bigint | null;
        response: string;
    }>;
    getHistory(userId: bigint): Promise<{
        id: bigint;
        createdAt: Date;
        message: string;
        userId: bigint | null;
        response: string;
    }[]>;
    getAllLogs(): Promise<({
        user: {
            name: string;
        } | null;
    } & {
        id: bigint;
        createdAt: Date;
        message: string;
        userId: bigint | null;
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
}
