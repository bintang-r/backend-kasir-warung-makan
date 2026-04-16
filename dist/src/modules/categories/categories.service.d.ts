import { PrismaService } from '../../prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: bigint;
        name: string;
    }[]>;
    findOne(id: bigint): Promise<{
        id: bigint;
        name: string;
    } | null>;
    create(data: {
        name: string;
    }): Promise<{
        id: bigint;
        name: string;
    }>;
}
