import { PrismaService } from '../../prisma/prisma.service';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        user: {
            name: string;
        } | null;
        order: {
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
        };
    } & {
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        orderId: bigint;
        rating: number;
        comment: string | null;
    })[]>;
    findOne(id: bigint): Promise<({
        user: {
            name: string;
        } | null;
        order: {
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
        };
    } & {
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        orderId: bigint;
        rating: number;
        comment: string | null;
    }) | null>;
    delete(id: bigint): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        orderId: bigint;
        rating: number;
        comment: string | null;
    }>;
}
