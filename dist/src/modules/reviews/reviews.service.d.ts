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
        };
    } & {
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        rating: number;
        comment: string | null;
        orderId: bigint;
    })[]>;
    findOne(id: bigint): Promise<({
        user: {
            name: string;
        } | null;
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
        createdAt: Date;
        userId: bigint | null;
        rating: number;
        comment: string | null;
        orderId: bigint;
    }) | null>;
    delete(id: bigint): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        rating: number;
        comment: string | null;
        orderId: bigint;
    }>;
}
