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
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isAvailable: boolean;
                isPopular: boolean;
                categoryId: bigint;
            };
        } & {
            id: bigint;
            price: import("@prisma/client-runtime-utils").Decimal;
            qty: number;
            menuId: bigint;
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
    }>;
    findAll(req: any): Promise<({
        items: ({
            menu: {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isAvailable: boolean;
                isPopular: boolean;
                categoryId: bigint;
            };
        } & {
            id: bigint;
            price: import("@prisma/client-runtime-utils").Decimal;
            qty: number;
            menuId: bigint;
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
    })[]>;
    findAllStaff(): Promise<{
        id: string;
        userId: string | undefined;
        tableId: string | undefined;
        guestSessionId: string | undefined;
        totalPrice: number;
        items: {
            id: string;
            orderId: string;
            menuId: string;
            price: number;
            menu: {
                category: {
                    id: bigint;
                    name: string;
                };
            } & {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isAvailable: boolean;
                isPopular: boolean;
                categoryId: bigint;
            };
            qty: number;
        }[];
        payments: any;
        table: {
            id: bigint;
            name: string;
            qrCode: string | null;
            status: import("@prisma/client").$Enums.TableStatus;
        } | null;
        user: {
            id: bigint;
            name: string;
            email: string;
        } | null;
        status: import("@prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        orderSource: import("@prisma/client").$Enums.OrderSource;
        address: string | null;
        orderType: import("@prisma/client").$Enums.OrderType;
        isReceived: boolean;
    }[]>;
    findOne(id: string, req: any): Promise<{
        id: string;
        userId: string | undefined;
        tableId: string | undefined;
        guestSessionId: string | undefined;
        totalPrice: number;
        items: {
            id: string;
            orderId: string;
            menuId: string;
            price: number;
            menu: {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isAvailable: boolean;
                isPopular: boolean;
                categoryId: bigint;
            };
            qty: number;
        }[];
        payments: {
            id: string;
            orderId: string;
            amount: number;
            status: import("@prisma/client").$Enums.PaymentStatus;
            method: import("@prisma/client").$Enums.PaymentMethod;
            paidAt: Date | null;
        }[];
        table: {
            id: bigint;
            name: string;
            qrCode: string | null;
            status: import("@prisma/client").$Enums.TableStatus;
        } | null;
        status: import("@prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        orderSource: import("@prisma/client").$Enums.OrderSource;
        address: string | null;
        orderType: import("@prisma/client").$Enums.OrderType;
        isReceived: boolean;
    }>;
    remove(id: string): Promise<{
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
    }>;
    updateStatus(id: string, status: OrderStatus): Promise<{
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
    }>;
    submitReview(id: string, req: any, rating: number, comment: string): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        orderId: bigint;
        rating: number;
        comment: string | null;
    }>;
}
