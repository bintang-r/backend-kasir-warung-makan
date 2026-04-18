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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const whatsapp_service_1 = require("../whatsapp/whatsapp.service");
let PaymentsService = class PaymentsService {
    prisma;
    whatsappService;
    constructor(prisma, whatsappService) {
        this.prisma = prisma;
        this.whatsappService = whatsappService;
    }
    async processPayment(orderId, method, amount) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { payments: true }
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const existingPayment = order.payments.find(p => p.status === client_1.PaymentStatus.UNPAID);
        if (existingPayment) {
            const payment = await this.prisma.payment.update({
                where: { id: existingPayment.id },
                data: {
                    method,
                    status: client_1.PaymentStatus.PAID,
                    paidAt: new Date(),
                },
            });
            this.sendWhatsAppPaymentNotification(orderId, amount, method);
            return payment;
        }
        const payment = await this.prisma.payment.create({
            data: {
                orderId,
                method,
                amount,
                status: client_1.PaymentStatus.PAID,
                paidAt: new Date(),
            },
        });
        this.sendWhatsAppPaymentNotification(orderId, amount, method);
        return payment;
    }
    async sendWhatsAppPaymentNotification(orderId, amount, method) {
        try {
            const adminNum = await this.whatsappService.getAdminNumber();
            if (!adminNum)
                return;
            const whatsappMessage = `*💰 PEMBAYARAN DITERIMA*\n` +
                `----------------------------------\n` +
                `*Order ID:* #${orderId.toString()}\n` +
                `*Jumlah:* Rp ${new Intl.NumberFormat('id-ID').format(amount)}\n` +
                `*Metode:* ${method}\n` +
                `*Status:* LUNAS ✅\n` +
                `----------------------------------\n` +
                `Transaksi telah berhasil diverifikasi oleh sistem.`;
            await this.whatsappService.sendMessage(adminNum, whatsappMessage);
        }
        catch (err) {
            console.error('Failed to send WhatsApp payment note', err);
        }
    }
    async getPaymentByOrder(orderId) {
        return this.prisma.payment.findFirst({
            where: { orderId },
            include: { order: true }
        });
    }
    async findAll() {
        return this.prisma.payment.findMany({
            include: {
                order: {
                    include: {
                        user: { select: { name: true } },
                        table: true
                    }
                }
            },
            orderBy: { paidAt: 'desc' },
        });
    }
    async updateStatus(id, status) {
        const payment = await this.prisma.payment.update({
            where: { id },
            data: {
                status,
                paidAt: status === client_1.PaymentStatus.PAID ? new Date() : null
            },
        });
        if (status === client_1.PaymentStatus.PAID) {
            this.sendWhatsAppPaymentNotification(payment.orderId, Number(payment.amount), payment.method);
        }
        return payment;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        whatsapp_service_1.WhatsappService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map