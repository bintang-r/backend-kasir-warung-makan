"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats() {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        const [revenue, orderStatusCount, topMenus, recentOrders,] = await Promise.all([
            this.prisma.payment.groupBy({
                by: ['paidAt'],
                where: {
                    status: client_1.PaymentStatus.PAID,
                    paidAt: {
                        gte: sevenDaysAgo,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),
            this.prisma.order.groupBy({
                by: ['status'],
                _count: {
                    status: true,
                },
            }),
            this.prisma.orderItem.groupBy({
                by: ['menuId'],
                _sum: {
                    qty: true,
                },
                orderBy: {
                    _sum: {
                        qty: 'desc',
                    },
                },
                take: 5,
            }),
            this.prisma.order.findMany({
                take: 10,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    user: { select: { name: true } },
                    items: { include: { menu: true } },
                },
            }),
        ]);
        const revenueByDay = this.formatRevenueByDay(revenue);
        const topMenuIds = topMenus.map((m) => m.menuId);
        const menus = await this.prisma.menu.findMany({
            where: { id: { in: topMenuIds } },
            select: { id: true, name: true },
        });
        const formattedTopMenus = topMenus.map((tm) => ({
            name: menus.find((m) => m.id === tm.menuId)?.name || 'Unknown',
            qty: tm._sum.qty,
        }));
        return {
            revenueByDay,
            orderStatusCount,
            topMenus: formattedTopMenus,
            recentOrders,
        };
    }
    formatRevenueByDay(revenue) {
        const days = {};
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            days[dateStr] = 0;
        }
        revenue.forEach((r) => {
            if (r.paidAt) {
                const dateStr = r.paidAt.toISOString().split('T')[0];
                if (days[dateStr] !== undefined) {
                    days[dateStr] += Number(r._sum.amount);
                }
            }
        });
        return Object.keys(days)
            .map((date) => ({ date, amount: days[date] }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map