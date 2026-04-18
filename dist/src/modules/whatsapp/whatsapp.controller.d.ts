import { WhatsappService } from './whatsapp.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class WhatsappController {
    private whatsappService;
    private prisma;
    constructor(whatsappService: WhatsappService, prisma: PrismaService);
    getStatus(): Promise<{
        isReady: boolean;
        qrCode: string | null;
    }>;
    getSettings(): Promise<{
        admin_whatsapp_number: string | null;
        is_env_fixed: boolean;
    }>;
    updateSettings(body: {
        number: string;
    }): Promise<{
        success: boolean;
    }>;
    getLogs(): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        message: string;
        recipient: string;
    }[]>;
    sendTestMessage(body: {
        number: string;
    }): Promise<{
        success: boolean;
    }>;
}
