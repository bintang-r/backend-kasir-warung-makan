import { PrismaService } from '../../prisma/prisma.service';
import { TablesService } from '../tables/tables.service';
import { JwtService } from '@nestjs/jwt';
export declare class GuestService {
    private prisma;
    private tablesService;
    private jwtService;
    constructor(prisma: PrismaService, tablesService: TablesService, jwtService: JwtService);
    createSession(tableId?: bigint): Promise<{
        guest_token: string;
        table_id: string | null;
        session_id: string;
    }>;
    getSession(id: bigint): Promise<({
        table: {
            id: bigint;
            name: string;
            qrCode: string | null;
            status: import("@prisma/client").$Enums.TableStatus;
        } | null;
    } & {
        id: bigint;
        createdAt: Date;
        token: string;
        expiresAt: Date;
        tableId: bigint | null;
    }) | null>;
    findAll(): Promise<({
        orders: {
            id: bigint;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.OrderStatus;
            tableId: bigint | null;
            userId: bigint | null;
            guestSessionId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            orderType: import("@prisma/client").$Enums.OrderType;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
            isReceived: boolean;
        }[];
        table: {
            id: bigint;
            name: string;
            qrCode: string | null;
            status: import("@prisma/client").$Enums.TableStatus;
        } | null;
    } & {
        id: bigint;
        createdAt: Date;
        token: string;
        expiresAt: Date;
        tableId: bigint | null;
    })[]>;
}
