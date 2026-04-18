import { ChatbotService } from './chatbot.service';
export declare class ChatbotController {
    private chatbotService;
    constructor(chatbotService: ChatbotService);
    handleMessage(req: any, body: {
        message: string;
    }): Promise<{
        response: string;
    }>;
    getHistory(req: any): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        message: string;
        response: string;
    }[]>;
    getAllLogs(): Promise<{
        id: string;
        userId: string | undefined;
        user: {
            name: string;
        } | null;
        createdAt: Date;
        message: string;
        response: string;
    }[]>;
    getAllSessions(): Promise<{
        id: string;
        userId: string | undefined;
        user: {
            name: string;
        } | null;
        createdAt: Date;
        sessionId: string;
    }[]>;
    removeLog(id: string): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        message: string;
        response: string;
    }>;
    clearAllLogs(): Promise<import("@prisma/client").Prisma.BatchPayload>;
    removeSession(id: string): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        sessionId: string;
    }>;
}
