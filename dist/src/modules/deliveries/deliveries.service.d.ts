import { PrismaService } from '../../prisma/prisma.service';
export declare class DeliveriesService {
    private prisma;
    constructor(prisma: PrismaService);
    assignDriver(orderId: bigint, driverId: bigint): Promise<{
        id: bigint;
        status: string;
        driverId: bigint;
        orderId: bigint;
    }>;
    updateStatus(deliveryId: bigint, status: string): Promise<{
        id: bigint;
        status: string;
        driverId: bigint;
        orderId: bigint;
    }>;
    getDeliveriesByDriver(driverId: bigint): Promise<({
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
