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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const carts_service_1 = require("../carts/carts.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    prisma;
    cartsService;
    constructor(prisma, cartsService) {
        this.prisma = prisma;
        this.cartsService = cartsService;
    }
    async createOrder(userId, guestSessionId, tableId, source = client_1.OrderSource.APP) {
        const cart = await this.cartsService.getCart(userId, guestSessionId);
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        let totalPrice = 0;
        const orderItemsData = cart.items.map((item) => {
            const price = Number(item.menu.price);
            totalPrice += price * item.qty;
            return {
                menuId: item.menuId,
                qty: item.qty,
                price: item.menu.price,
            };
        });
        const order = await this.prisma.order.create({
            data: {
                userId,
                guestSessionId,
                tableId,
                orderSource: source,
                totalPrice,
                status: client_1.OrderStatus.PENDING,
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: {
                    include: { menu: true },
                },
            },
        });
        await this.cartsService.clearCart(cart.id);
        return order;
    }
    async getOrders(userId, guestSessionId) {
        return this.prisma.order.findMany({
            where: {
                OR: [
                    { userId: userId || undefined },
                    { guestSessionId: guestSessionId || undefined },
                ],
            },
            include: {
                items: {
                    include: { menu: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(orderId, status) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        carts_service_1.CartsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map