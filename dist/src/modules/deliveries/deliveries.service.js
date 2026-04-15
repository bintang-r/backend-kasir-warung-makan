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
exports.DeliveriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DeliveriesService = class DeliveriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assignDriver(orderId, driverId) {
        return this.prisma.delivery.create({
            data: {
                orderId,
                driverId,
                status: 'delivering',
            },
        });
    }
    async updateStatus(deliveryId, status) {
        return this.prisma.delivery.update({
            where: { id: deliveryId },
            data: { status },
        });
    }
    async getDeliveriesByDriver(driverId) {
        return this.prisma.delivery.findMany({
            where: { driverId },
            include: { order: true },
        });
    }
};
exports.DeliveriesService = DeliveriesService;
exports.DeliveriesService = DeliveriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeliveriesService);
//# sourceMappingURL=deliveries.service.js.map