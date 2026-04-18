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
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isPopular: boolean;
                isAvailable: boolean;
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
        orderType: import("@prisma/client").$Enums.OrderType;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        address: string | null;
        isReceived: boolean;
        tableId: bigint | null;
    }>;
    getOrders(userId?: bigint, guestSessionId?: bigint): Promise<({
        items: ({
            menu: {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isPopular: boolean;
                isAvailable: boolean;
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
        orderType: import("@prisma/client").$Enums.OrderType;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        address: string | null;
        isReceived: boolean;
        tableId: bigint | null;
    })[]>;
    getOrderById(id: bigint): Promise<({
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
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isPopular: boolean;
                isAvailable: boolean;
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
        orderType: import("@prisma/client").$Enums.OrderType;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        address: string | null;
        isReceived: boolean;
        tableId: bigint | null;
    }) | null>;
    getAllOrders(): Promise<({
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
        items: ({
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
                isPopular: boolean;
                isAvailable: boolean;
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
        orderType: import("@prisma/client").$Enums.OrderType;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        address: string | null;
        isReceived: boolean;
        tableId: bigint | null;
    })[]>;
    updateStatus(orderId: bigint, status: OrderStatus): Promise<{
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
    }>;
    addReview(orderId: bigint, userId: bigint | null, rating: number, comment: string): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        orderId: bigint;
        rating: number;
        comment: string | null;
    }>;
    deleteOrder(id: bigint): Promise<{
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
    }>;
}
