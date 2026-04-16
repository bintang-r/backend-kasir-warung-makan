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
        driverId: bigint;
        orderId: bigint;
    }>;
    updateStatus(id: string, status: string): Promise<{
        id: bigint;
        status: string;
        driverId: bigint;
        orderId: bigint;
    }>;
    getMyDeliveries(req: any): Promise<({
        order: {
            id: bigint;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.OrderStatus;
            userId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            orderType: import("@prisma/client").$Enums.OrderType;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
            isReceived: boolean;
            tableId: bigint | null;
            guestSessionId: bigint | null;
        };
    } & {
        id: bigint;
        status: string;
        driverId: bigint;
        orderId: bigint;
    })[]>;
}
