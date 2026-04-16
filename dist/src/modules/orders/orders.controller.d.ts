import { OrdersService } from './orders.service';
import { OrderStatus } from '@prisma/client';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, body: any): Promise<{
        items: ({
            menu: {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isPopular: boolean;
                categoryId: bigint;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isAvailable: boolean;
            };
        } & {
            id: bigint;
            price: import("@prisma/client-runtime-utils").Decimal;
            menuId: bigint;
            qty: number;
            orderId: bigint;
        })[];
        payments: {
            id: bigint;
            status: import("@prisma/client").$Enums.PaymentStatus;
            method: import("@prisma/client").$Enums.PaymentMethod;
            amount: import("@prisma/client-runtime-utils").Decimal;
            paidAt: Date | null;
            orderId: bigint;
        }[];
    } & {
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
    }>;
    findAll(req: any): Promise<({
        items: ({
            menu: {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isPopular: boolean;
                categoryId: bigint;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isAvailable: boolean;
            };
        } & {
            id: bigint;
            price: import("@prisma/client-runtime-utils").Decimal;
            menuId: bigint;
            qty: number;
            orderId: bigint;
        })[];
        payments: {
            id: bigint;
            status: import("@prisma/client").$Enums.PaymentStatus;
            method: import("@prisma/client").$Enums.PaymentMethod;
            amount: import("@prisma/client-runtime-utils").Decimal;
            paidAt: Date | null;
            orderId: bigint;
        }[];
    } & {
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
    })[]>;
    findOne(id: string, req: any): Promise<{
        items: ({
            menu: {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isPopular: boolean;
                categoryId: bigint;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isAvailable: boolean;
            };
        } & {
            id: bigint;
            price: import("@prisma/client-runtime-utils").Decimal;
            menuId: bigint;
            qty: number;
            orderId: bigint;
        })[];
        payments: {
            id: bigint;
            status: import("@prisma/client").$Enums.PaymentStatus;
            method: import("@prisma/client").$Enums.PaymentMethod;
            amount: import("@prisma/client-runtime-utils").Decimal;
            paidAt: Date | null;
            orderId: bigint;
        }[];
    } & {
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
    }>;
    findAllStaff(): Promise<({
        user: {
            name: string;
        } | null;
        table: {
            id: bigint;
            name: string;
            qrCode: string | null;
            status: import("@prisma/client").$Enums.TableStatus;
        } | null;
        items: ({
            menu: {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isPopular: boolean;
                categoryId: bigint;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isAvailable: boolean;
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
        orderType: import("@prisma/client").$Enums.OrderType;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        address: string | null;
        isReceived: boolean;
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
        orderType: import("@prisma/client").$Enums.OrderType;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        address: string | null;
        isReceived: boolean;
    }>;
    submitReview(id: string, req: any, rating: number, comment: string): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        rating: number;
        comment: string | null;
        orderId: bigint;
    }>;
}
