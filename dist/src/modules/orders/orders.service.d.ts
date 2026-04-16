import { PrismaService } from '../../prisma/prisma.service';
import { CartsService } from '../carts/carts.service';
import { NotificationsService } from '../notifications/notifications.service';
import { OrderSource, OrderStatus, OrderType } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    private cartsService;
    private notificationsService;
    constructor(prisma: PrismaService, cartsService: CartsService, notificationsService: NotificationsService);
    createOrder(cartId: bigint, userId?: bigint, guestSessionId?: bigint, tableId?: bigint, source?: OrderSource, orderType?: OrderType, address?: string): Promise<{
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
    getOrders(userId?: bigint, guestSessionId?: bigint): Promise<({
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
    getOrderById(id: bigint): Promise<({
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
    }) | null>;
    getAllOrders(): Promise<({
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
    updateStatus(orderId: bigint, status: OrderStatus): Promise<{
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
    addReview(orderId: bigint, userId: bigint | null, rating: number, comment: string): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        rating: number;
        comment: string | null;
        orderId: bigint;
    }>;
    deleteOrder(id: bigint): Promise<{
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
}
