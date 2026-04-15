import { PrismaService } from '../../prisma/prisma.service';
import { TablesService } from '../tables/tables.service';
import { JwtService } from '@nestjs/jwt';
export declare class GuestService {
    private prisma;
    private tablesService;
    private jwtService;
    constructor(prisma: PrismaService, tablesService: TablesService, jwtService: JwtService);
    createSession(tableId: bigint): Promise<{
        guest_token: string;
        table_id: string;
        session_id: string;
    }>;
    getSession(id: bigint): Promise<({
        table: {
            id: bigint;
            name: string;
            qrCode: string | null;
            status: import("@prisma/client").$Enums.TableStatus;
        };
    } & {
        id: bigint;
        createdAt: Date;
        token: string;
        expiresAt: Date;
        tableId: bigint;
    }) | null>;
}
