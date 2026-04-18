import { WhatsappService } from './whatsapp.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class WhatsappTasksService {
    private whatsappService;
    private prisma;
    private readonly logger;
    constructor(whatsappService: WhatsappService, prisma: PrismaService);
    handleMidnightReport(): Promise<void>;
}
