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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const whatsapp_service_1 = require("../whatsapp/whatsapp.service");
let OrdersService = class OrdersService {
    prisma;
    cartsService;
    notificationsService;
    whatsappService;
    constructor(prisma, cartsService, notificationsService, whatsappService) {
        this.prisma = prisma;
        this.cartsService = cartsService;
        this.notificationsService = notificationsService;
        this.whatsappService = whatsappService;
    }
    async createOrder(cartId, userId, guestSessionId, tableId, source = OrderSource.APP, orderType = OrderType.DINE_IN, address) {
        const cart = await this.prisma.cart.findUnique({
            where: { id: cartId },
            include: {
                items: { include: { menu: true } }
            }
        });
        if (!cart || cart.items.length === 0) {
            throw new BadRequestException('Cart is empty or not found');
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
                userId: userId || null,
                guestSessionId: guestSessionId || null,
                tableId: tableId || null,
                orderSource: source,
                orderType,
                address: address || null,
                totalPrice: totalPrice.toFixed(2),
                status: OrderStatus.PENDING,
                items: {
                    create: orderItemsData,
                },
                payments: {
                    create: {
                        amount: totalPrice.toFixed(2),
                        method: 'CASH',
                        status: 'UNPAID',
                    }
                }
            },
            include: {
                items: {
                    include: { menu: true },
                },
                payments: true
            },
        });
        await this.cartsService.clearCart(cart.id);
        await this.notificationsService.create({
            userId: userId || undefined,
            guestSessionId: guestSessionId || undefined,
            title: 'Pesanan Dikirim! 🚀',
            message: `Pesanan Anda #${order.id.toString()} sudah kami terima dan sedang menunggu konfirmasi.`,
        });
        return order;
    }
    async getOrders(userId, guestSessionId) {
        const orConditions = [];
        if (userId)
            orConditions.push({ userId });
        if (guestSessionId)
            orConditions.push({ guestSessionId });
        if (orConditions.length === 0)
            return [];
        return this.prisma.order.findMany({
            where: {
                OR: orConditions,
            },
            include: {
                items: {
                    include: { menu: true },
                },
                payments: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getOrderById(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: { menu: true },
                },
                table: true,
                payments: true,
            },
        });
    }
    async getAllOrders() {
        return this.prisma.order.findMany({
            include: {
                items: {
                    include: { menu: { include: { category: true } } },
                },
                user: { select: { id: true, name: true, email: true } },
                table: true,
                payments: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(orderId, status) {
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
        let title = 'Update Pesanan 🔔';
        let message = `Status pesanan #${orderId.toString()} kini berubah menjadi ${status}.`;
        if (status === OrderStatus.CONFIRMED) {
            title = 'Pesanan Dikonfirmasi ✅';
            message = `Pesanan Anda #${orderId.toString()} telah dikonfirmasi dan masuk antrean dapur.`;
        }
        else if (status === OrderStatus.COOKING) {
            title = 'Sedang Dimasak 👨‍🍳';
            message = `Siap-siap! Koki kami sedang memasak pesanan Anda #${orderId.toString()}.`;
        }
        else if (status === OrderStatus.READY) {
            title = 'Hore, Pesanan Siap! 🍽️';
            message = `Pesanan Anda #${orderId.toString()} telah matang dan siap dihidangkan. Silakan dinikmati!`;
        }
        await this.notificationsService.create({
            userId: order.userId || undefined,
            guestSessionId: order.guestSessionId || undefined,
            title,
            message,
        });
        if (status === OrderStatus.COMPLETED) {
            this.sendWhatsAppNotification(order.id);
        }
        return order;
    }
    async sendWhatsAppNotification(orderId) {
        try {
            const adminNum = await this.whatsappService.getAdminNumber();
            if (!adminNum)
                return;
            const order = await this.getOrderById(orderId);
            if (!order)
                return;
            const itemsStr = order.items.map(i => `- ${i.menu.name} (x${i.qty})`).join('\n');
            const whatsappMessage = `*✅ PESANAN SELESAI*\n` +
                `----------------------------------\n` +
                `*Order ID:* #${orderId.toString()}\n` +
                `*Total:* Rp ${new Intl.NumberFormat('id-ID').format(Number(order.totalPrice))}\n` +
                `*Detail Menu:*\n${itemsStr}\n` +
                `----------------------------------\n` +
                `Pesanan telah ditandai selesai oleh staff.`;
            await this.whatsappService.sendMessage(adminNum, whatsappMessage);
        }
        catch (err) {
            console.error('Failed to send WhatsApp completion note', err);
        }
    }
    async addReview(orderId, userId, rating, comment) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!order || order.status !== OrderStatus.COMPLETED) {
            throw new BadRequestException('Order must be completed before leaving a review');
        }
        return this.prisma.review.create({
            data: {
                orderId,
                userId,
                rating,
                comment,
            },
        });
    }
    async deleteOrder(id) {
        await this.prisma.orderItem.deleteMany({ where: { orderId: id } });
        await this.prisma.payment.deleteMany({ where: { orderId: id } });
        await this.prisma.review.deleteMany({ where: { orderId: id } });
        await this.prisma.delivery.deleteMany({ where: { orderId: id } });
        return this.prisma.order.delete({ where: { id } });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object, typeof (_b = typeof CartsService !== "undefined" && CartsService) === "function" ? _b : Object, typeof (_c = typeof NotificationsService !== "undefined" && NotificationsService) === "function" ? _c : Object, whatsapp_service_1.WhatsappService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map