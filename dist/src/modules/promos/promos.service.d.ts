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
    findAllPromos(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        image: string | null;
        title: string;
        isActive: boolean;
    }[]>;
    createPromo(data: any): Promise<{
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        image: string | null;
        title: string;
        isActive: boolean;
    }>;
    updatePromo(id: bigint, data: any): Promise<{
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        image: string | null;
        title: string;
        isActive: boolean;
    }>;
    deletePromo(id: bigint): Promise<{
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        image: string | null;
        title: string;
        isActive: boolean;
    }>;
    findAllVouchers(): Promise<{
        id: string;
        code: string;
        discount: import("@prisma/client-runtime-utils").Decimal;
        expiredAt: Date;
    }[]>;
    findVoucherByCode(code: string): Promise<{
        id: string;
        code: string;
        discount: import("@prisma/client-runtime-utils").Decimal;
        expiredAt: Date;
    } | null>;
    createVoucher(data: any): Promise<{
        id: bigint;
        code: string;
        discount: import("@prisma/client-runtime-utils").Decimal;
        expiredAt: Date;
    }>;
    updateVoucher(id: bigint, data: any): Promise<{
        id: bigint;
        code: string;
        discount: import("@prisma/client-runtime-utils").Decimal;
        expiredAt: Date;
    }>;
    deleteVoucher(id: bigint): Promise<{
        id: bigint;
        code: string;
        discount: import("@prisma/client-runtime-utils").Decimal;
        expiredAt: Date;
    }>;
}
