import { PrismaService } from '../../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        revenueByDay: {
            date: string;
            amount: any;
        }[];
        orderStatusCount: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.OrderGroupByOutputType, "status"[]> & {
            _count: {
                status: number;
            };
        })[];
        topMenus: {
            name: string;
            qty: number | null;
        }[];
        recentOrders: ({
            user: {
                name: string;
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
        })[];
    }>;
    private formatRevenueByDay;
}
