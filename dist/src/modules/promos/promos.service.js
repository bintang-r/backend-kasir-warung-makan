"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
        if (data.image) {
            const oldPromo = await this.prisma.promo.findUnique({ where: { id } });
            if (oldPromo?.image && oldPromo.image.startsWith('/uploads/')) {
                const oldPath = path.join(process.cwd(), oldPromo.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
        }
        return this.prisma.promo.update({
            where: { id },
            data,
        });
    }
    async deletePromo(id) {
        const promo = await this.prisma.promo.findUnique({ where: { id } });
        if (promo?.image && promo.image.startsWith('/uploads/')) {
            const oldPath = path.join(process.cwd(), promo.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }
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