import { PrismaService } from '../../prisma/prisma.service';
import { CartsService } from '../carts/carts.service';
import { OrderSource, OrderStatus } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    private cartsService;
    constructor(prisma: PrismaService, cartsService: CartsService);
    createOrder(userId?: bigint, guestSessionId?: bigint, tableId?: bigint, source?: OrderSource): Promise<{
        items: ({
            menu: {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                categoryId: bigint;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
            };
        } & {
            id: bigint;
            price: import("@prisma/client-runtime-utils").Decimal;
            menuId: bigint;
            qty: number;
            orderId: bigint;
        })[];
    } & {
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        tableId: bigint | null;
        userId: bigint | null;
        guestSessionId: bigint | null;
        orderSource: import("@prisma/client").$Enums.OrderSource;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    getOrders(userId?: bigint, guestSessionId?: bigint): Promise<({
        items: ({
            menu: {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                categoryId: bigint;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
            };
        } & {
            id: bigint;
            price: import("@prisma/client-runtime-utils").Decimal;
            menuId: bigint;
            qty: number;
            orderId: bigint;
        })[];
    } & {
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        tableId: bigint | null;
        userId: bigint | null;
        guestSessionId: bigint | null;
        orderSource: import("@prisma/client").$Enums.OrderSource;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    updateStatus(orderId: bigint, status: OrderStatus): Promise<{
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        tableId: bigint | null;
        userId: bigint | null;
        guestSessionId: bigint | null;
        orderSource: import("@prisma/client").$Enums.OrderSource;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
}
