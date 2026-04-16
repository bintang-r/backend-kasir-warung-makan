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
        isPopular: boolean;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
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
        isPopular: boolean;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
    }) | null>;
    create(data: any): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isPopular: boolean;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
    }>;
    update(id: bigint, data: any): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isPopular: boolean;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isPopular: boolean;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
    }>;
}
