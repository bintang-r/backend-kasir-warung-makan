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
        message: string;
        userId: bigint | null;
        response: string;
    }[]>;
}
