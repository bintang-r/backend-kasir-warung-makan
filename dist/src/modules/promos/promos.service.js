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
exports.PromosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PromosService = class PromosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getActivePromos() {
        const promos = await this.prisma.promo.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
        return promos.map(p => ({ ...p, id: p.id.toString() }));
    }
    async findAllPromos() {
        const promos = await this.prisma.promo.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return promos.map(p => ({ ...p, id: p.id.toString() }));
    }
    async createPromo(data) {
        return this.prisma.promo.create({ data });
    }
    async updatePromo(id, data) {
        return this.prisma.promo.update({
            where: { id },
            data,
        });
    }
    async deletePromo(id) {
        return this.prisma.promo.delete({ where: { id } });
    }
    async findAllVouchers() {
        const vouchers = await this.prisma.voucher.findMany({
            orderBy: { expiredAt: 'desc' },
        });
        return vouchers.map(v => ({ ...v, id: v.id.toString() }));
    }
    async findVoucherByCode(code) {
        const voucher = await this.prisma.voucher.findUnique({
            where: { code },
        });
        return voucher ? { ...voucher, id: voucher.id.toString() } : null;
    }
    async createVoucher(data) {
        return this.prisma.voucher.create({
            data: {
                ...data,
                expiredAt: new Date(data.expiredAt),
            },
        });
    }
    async updateVoucher(id, data) {
        return this.prisma.voucher.update({
            where: { id },
            data: {
                ...data,
                expiredAt: data.expiredAt ? new Date(data.expiredAt) : undefined,
            },
        });
    }
    async deleteVoucher(id) {
        return this.prisma.voucher.delete({ where: { id } });
    }
};
exports.PromosService = PromosService;
exports.PromosService = PromosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PromosService);
//# sourceMappingURL=promos.service.js.map