import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<{
        recentOrders: {
            id: string;
            userId: string | undefined;
            tableId: string | undefined;
            items: {
                id: string;
                orderId: string;
                menuId: string;
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
                price: import("@prisma/client-runtime-utils").Decimal;
                qty: number;
            }[];
            user: {
                name: string;
            } | null;
            status: import("@prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            guestSessionId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            orderType: import("@prisma/client").$Enums.OrderType;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
            isReceived: boolean;
        }[];
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
    }>;
}
