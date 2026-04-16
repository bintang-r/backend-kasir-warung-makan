import { PromosService } from './promos.service';
export declare class PromosController {
    private readonly promosService;
    constructor(promosService: PromosService);
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
    createPromo(file: Express.Multer.File, body: any): Promise<{
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        image: string | null;
        title: string;
        isActive: boolean;
    }>;
    updatePromo(id: string, file: Express.Multer.File, body: any): Promise<{
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        image: string | null;
        title: string;
        isActive: boolean;
    }>;
    deletePromo(id: string): Promise<{
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
    createVoucher(body: any): Promise<{
        id: bigint;
        code: string;
        discount: import("@prisma/client-runtime-utils").Decimal;
        expiredAt: Date;
    }>;
    updateVoucher(id: string, body: any): Promise<{
        id: bigint;
        code: string;
        discount: import("@prisma/client-runtime-utils").Decimal;
        expiredAt: Date;
    }>;
    deleteVoucher(id: string): Promise<{
        id: bigint;
        code: string;
        discount: import("@prisma/client-runtime-utils").Decimal;
        expiredAt: Date;
    }>;
    verifyVoucher(code: string): Promise<{
        id: string;
        code: string;
        discount: import("@prisma/client-runtime-utils").Decimal;
        expiredAt: Date;
    } | null>;
}
