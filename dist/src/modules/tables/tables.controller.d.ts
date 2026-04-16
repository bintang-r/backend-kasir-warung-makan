import { TablesService } from './tables.service';
export declare class TablesController {
    private tablesService;
    constructor(tablesService: TablesService);
    findAll(): Promise<{
        id: bigint;
        name: string;
        qrCode: string | null;
        status: import("@prisma/client").$Enums.TableStatus;
    }[]>;
    create(body: any): Promise<{
        id: bigint;
        name: string;
        qrCode: string | null;
        status: import("@prisma/client").$Enums.TableStatus;
    }>;
    getQr(id: string): Promise<{
        qr: any;
    }>;
    remove(id: string): Promise<{
        id: bigint;
        name: string;
        qrCode: string | null;
        status: import("@prisma/client").$Enums.TableStatus;
    }>;
    update(id: string, body: any): Promise<{
        id: bigint;
        name: string;
        qrCode: string | null;
        status: import("@prisma/client").$Enums.TableStatus;
    }>;
}
