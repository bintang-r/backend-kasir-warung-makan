import { PrismaService } from '../../prisma/prisma.service';
export declare class PromosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getActivePromos(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        image: string | null;
        title: string;
        isActive: boolean;
    }[]>;
}
