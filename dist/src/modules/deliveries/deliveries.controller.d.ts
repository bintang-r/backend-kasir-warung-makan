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
        orderId: bigint;
        driverId: bigint;
    }>;
    updateStatus(id: string, status: string): Promise<{
        id: bigint;
        status: string;
        orderId: bigint;
        driverId: bigint;
    }>;
    getMyDeliveries(req: any): Promise<({
        order: {
            id: bigint;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.OrderStatus;
            tableId: bigint | null;
            userId: bigint | null;
            guestSessionId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: bigint;
        status: string;
        orderId: bigint;
        driverId: bigint;
    })[]>;
}
