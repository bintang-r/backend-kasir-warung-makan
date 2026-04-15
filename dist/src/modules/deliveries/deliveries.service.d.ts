import { PrismaService } from '../../prisma/prisma.service';
export declare class DeliveriesService {
    private prisma;
    constructor(prisma: PrismaService);
    assignDriver(orderId: bigint, driverId: bigint): Promise<{
        id: bigint;
        status: string;
        orderId: bigint;
        driverId: bigint;
    }>;
    updateStatus(deliveryId: bigint, status: string): Promise<{
        id: bigint;
        status: string;
        orderId: bigint;
        driverId: bigint;
    }>;
    getDeliveriesByDriver(driverId: bigint): Promise<({
        order: {
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
        };
    } & {
        id: bigint;
        status: string;
        orderId: bigint;
        driverId: bigint;
    })[]>;
}
