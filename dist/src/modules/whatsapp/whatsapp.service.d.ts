import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
export declare class WhatsappService implements OnModuleInit {
    private prisma;
    private configService;
    private client;
    private qrCode;
    private isReady;
    private readonly logger;
    constructor(prisma: PrismaService, configService: ConfigService);
    onModuleInit(): void;
    private initialize;
    getStatus(): {
        isReady: boolean;
        qrCode: string | null;
    };
    sendMessage(to: string, message: string): Promise<boolean>;
    private logMessage;
    getAdminNumber(): Promise<string | null>;
}
