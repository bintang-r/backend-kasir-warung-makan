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
var WhatsappTasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappTasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const whatsapp_service_1 = require("./whatsapp.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let WhatsappTasksService = WhatsappTasksService_1 = class WhatsappTasksService {
    whatsappService;
    prisma;
    logger = new common_1.Logger(WhatsappTasksService_1.name);
    constructor(whatsappService, prisma) {
        this.whatsappService = whatsappService;
        this.prisma = prisma;
    }
    async handleMidnightReport() {
        this.logger.log('Running midnight revenue report...');
        try {
            const adminNum = await this.whatsappService.getAdminNumber();
            if (!adminNum) {
                this.logger.warn('Admin WhatsApp number not set. Skipping report.');
                return;
            }
            const yesterdayStart = new Date();
            yesterdayStart.setDate(yesterdayStart.getDate() - 1);
            yesterdayStart.setHours(0, 0, 0, 0);
            const yesterdayEnd = new Date();
            yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
            yesterdayEnd.setHours(23, 59, 59, 999);
            const completedOrders = await this.prisma.order.findMany({
                where: {
                    status: 'COMPLETED',
                    updatedAt: {
                        gte: yesterdayStart,
                        lte: yesterdayEnd,
                    }
                }
            });
            const totalRevenue = completedOrders.reduce((sum, order) => sum + Number(order.totalPrice), 0);
            const totalOrders = completedOrders.length;
            const dateStr = yesterdayStart.toLocaleDateString('id-ID', { dateStyle: 'long' });
            const reportMessage = `*📊 LAPORAN PENDAPATAN HARIAN*\n` +
                `----------------------------------\n` +
                `*Tanggal:* ${dateStr}\n` +
                `*Total Pesanan Selesai:* ${totalOrders}\n` +
                `*Total Omzet:* Rp ${new Intl.NumberFormat('id-ID').format(totalRevenue)}\n` +
                `----------------------------------\n` +
                `Terima kasih sudah menggunakan sistem RM Siantar Minang Jaya! 🚀`;
            await this.whatsappService.sendMessage(adminNum, reportMessage);
            this.logger.log(`Midnight report sent to ${adminNum}`);
        }
        catch (error) {
            this.logger.error('Error in handleMidnightReport', error);
        }
    }
};
exports.WhatsappTasksService = WhatsappTasksService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WhatsappTasksService.prototype, "handleMidnightReport", null);
exports.WhatsappTasksService = WhatsappTasksService = WhatsappTasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsappService,
        prisma_service_1.PrismaService])
], WhatsappTasksService);
//# sourceMappingURL=whatsapp-tasks.service.js.map