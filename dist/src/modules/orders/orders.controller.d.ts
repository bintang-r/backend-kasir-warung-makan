import { OrdersService } from './orders.service';
import { OrderStatus } from '@prisma/client';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(req: any): Promise<{
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
    findAll(req: any): Promise<({
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
    updateStatus(id: string, status: OrderStatus): Promise<{
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
