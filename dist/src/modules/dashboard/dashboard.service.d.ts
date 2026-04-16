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
                orderId: bigint;
                menuId: bigint;
                qty: number;
            })[];
        } & {
            id: bigint;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.OrderStatus;
            userId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            orderType: import("@prisma/client").$Enums.OrderType;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
            isReceived: boolean;
            tableId: bigint | null;
            guestSessionId: bigint | null;
        })[];
    }>;
    private formatRevenueByDay;
}
