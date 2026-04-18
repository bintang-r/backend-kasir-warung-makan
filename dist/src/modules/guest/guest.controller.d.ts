import { GuestService } from './guest.service';
export declare class GuestController {
    private readonly guestService;
    constructor(guestService: GuestService);
    findAll(): Promise<{
        id: string;
        tableId: string | undefined;
        ordersCount: number;
        orders: {
            id: bigint;
            status: import("@prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: bigint | null;
            guestSessionId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
            orderType: import("@prisma/client").$Enums.OrderType;
            isReceived: boolean;
            tableId: bigint | null;
        }[];
        table: {
            id: bigint;
            name: string;
            qrCode: string | null;
            status: import("@prisma/client").$Enums.TableStatus;
        } | null;
        createdAt: Date;
        token: string;
        expiresAt: Date;
    }[]>;
    createSession(body: {
        tableId?: string;
    }): Promise<{
        guest_token: string;
        table_id: string | null;
        session_id: string;
    }>;
    getSession(id: string): Promise<({
        table: {
            id: bigint;
            name: string;
            qrCode: string | null;
            status: import("@prisma/client").$Enums.TableStatus;
        } | null;
    } & {
        id: bigint;
        createdAt: Date;
        tableId: bigint | null;
        token: string;
        expiresAt: Date;
    }) | null>;
    handleQrScan(tableId: string): Promise<{
        guest_token: string;
        table_id: string | null;
        session_id: string;
    }>;
    remove(id: string): Promise<{
        id: bigint;
        createdAt: Date;
        tableId: bigint | null;
        token: string;
        expiresAt: Date;
    }>;
}
