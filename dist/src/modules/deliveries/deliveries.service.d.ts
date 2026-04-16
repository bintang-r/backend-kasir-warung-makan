import { PrismaService } from '../../prisma/prisma.service';
export declare class DeliveriesService {
    private prisma;
    constructor(prisma: PrismaService);
    assignDriver(orderId: bigint, driverId: bigint): Promise<{
        id: bigint;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: bigint;
        driverId: bigint | null;
    }>;
    updateStatus(deliveryId: bigint, status: string): Promise<{
        id: bigint;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: bigint;
        driverId: bigint | null;
    }>;
    getDeliveriesByDriver(driverId: bigint): Promise<({
        order: {
            id: bigint;
            status: import("@prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: bigint | null;
            guestSessionId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            orderType: import("@prisma/client").$Enums.OrderType;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
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
