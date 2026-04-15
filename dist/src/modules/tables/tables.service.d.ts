import { PrismaService } from '../../prisma/prisma.service';
export declare class TablesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: bigint;
        name: string;
        qrCode: string | null;
        status: import("@prisma/client").$Enums.TableStatus;
    }[]>;
    findOne(id: bigint): Promise<{
        id: bigint;
        name: string;
        qrCode: string | null;
        status: import("@prisma/client").$Enums.TableStatus;
    } | null>;
    create(data: {
        name: string;
    }): Promise<{
        id: bigint;
        name: string;
        qrCode: string | null;
        status: import("@prisma/client").$Enums.TableStatus;
    }>;
    generateQr(id: bigint): Promise<any>;
}
