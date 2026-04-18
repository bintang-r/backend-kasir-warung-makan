import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    findAll(): Promise<{
        id: string;
        orderId: string;
        userId: string | undefined;
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
        };
        createdAt: Date;
        rating: number;
        comment: string | null;
    }[]>;
    remove(id: string): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        orderId: bigint;
        rating: number;
        comment: string | null;
    }>;
}
