import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
export declare class MenusService {
    private prisma;
    private auditLogsService;
    constructor(prisma: PrismaService, auditLogsService: AuditLogsService);
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
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
        isPopular: boolean;
        categoryId: bigint;
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
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
        isPopular: boolean;
        categoryId: bigint;
    }) | null>;
    create(data: any, actorId?: bigint): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
        isPopular: boolean;
        categoryId: bigint;
    }>;
    update(id: bigint, data: any, actorId?: bigint): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
        isPopular: boolean;
        categoryId: bigint;
    }>;
    remove(id: bigint, actorId?: bigint): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
        isPopular: boolean;
        categoryId: bigint;
    }>;
}
