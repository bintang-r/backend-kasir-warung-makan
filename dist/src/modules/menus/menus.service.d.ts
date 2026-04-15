import { PrismaService } from '../../prisma/prisma.service';
export declare class MenusService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        category: {
            id: bigint;
            name: string;
        };
    } & {
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
    })[]>;
    findOne(id: bigint): Promise<({
        category: {
            id: bigint;
            name: string;
        };
    } & {
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
    }) | null>;
    create(data: any): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
    }>;
    update(id: bigint, data: any): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
    }>;
}
