import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
export declare class WhatsappService implements OnModuleInit {
    private prisma;
    private configService;
    private senderClient;
    private receiverClient;
    private senderState;
    private receiverState;
    private readonly logger;
    constructor(prisma: PrismaService, configService: ConfigService);
    private createClientInstance;
    onModuleInit(): void;
    private initializeClient;
    private updateAdminNumber;
    getStatus(): {
        sender: {
            isReady: boolean;
            qrCode: string | null;
        };
        receiver: {
            isReady: boolean;
            qrCode: string | null;
        };
    };
    sendMessage(to: string, message: string): Promise<boolean>;
    private logMessage;
    getAdminNumber(): Promise<string | null>;
}
