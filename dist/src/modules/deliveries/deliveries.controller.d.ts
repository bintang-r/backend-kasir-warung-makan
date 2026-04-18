import { DeliveriesService } from './deliveries.service';
export declare class DeliveriesController {
    private deliveriesService;
    constructor(deliveriesService: DeliveriesService);
    assign(body: {
        orderId: string;
        driverId: string;
    }): Promise<{
        id: bigint;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: bigint;
        driverId: bigint | null;
    }>;
    updateStatus(id: string, status: string): Promise<{
        id: bigint;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: bigint;
        driverId: bigint | null;
    }>;
    getMyDeliveries(req: any): Promise<({
        order: {
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
        };
    } & {
        id: bigint;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: bigint;
        driverId: bigint | null;
    })[]>;
}
