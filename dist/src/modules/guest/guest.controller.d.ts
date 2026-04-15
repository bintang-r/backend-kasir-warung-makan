import { GuestService } from './guest.service';
export declare class GuestController {
    private guestService;
    constructor(guestService: GuestService);
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
        token: string;
        expiresAt: Date;
        tableId: bigint | null;
    }) | null>;
    handleQrScan(tableId: string): Promise<{
        guest_token: string;
        table_id: string | null;
        session_id: string;
    }>;
}
