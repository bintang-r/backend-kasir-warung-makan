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
exports.GuestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const tables_service_1 = require("../tables/tables.service");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
let GuestService = class GuestService {
    prisma;
    tablesService;
    jwtService;
    constructor(prisma, tablesService, jwtService) {
        this.prisma = prisma;
        this.tablesService = tablesService;
        this.jwtService = jwtService;
    }
    async createSession(tableId) {
        if (tableId) {
            const table = await this.tablesService.findOne(tableId);
            if (!table) {
                throw new common_1.NotFoundException('Table not found');
            }
        }
        const token = (0, uuid_1.v4)();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 6);
        const session = await this.prisma.guestSession.create({
            data: {
                tableId: tableId || null,
                token,
                expiresAt,
            },
        });
        const jwtPayload = {
            sub: session.id.toString(),
            tableId: tableId ? tableId.toString() : null,
            role: 'GUEST'
        };
        return {
            guest_token: this.jwtService.sign(jwtPayload),
            table_id: tableId ? tableId.toString() : null,
            session_id: session.id.toString(),
        };
    }
    async getSession(id) {
        return this.prisma.guestSession.findUnique({
            where: { id },
            include: { table: true },
        });
    }
    async findAll() {
        return this.prisma.guestSession.findMany({
            include: { table: true, orders: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async remove(id) {
        await this.prisma.order.updateMany({
            where: { guestSessionId: id },
            data: { guestSessionId: null },
        });
        await this.prisma.notification.deleteMany({
            where: { guestSessionId: id },
        });
        await this.prisma.cart.deleteMany({
            where: { guestSessionId: id },
        });
        return this.prisma.guestSession.delete({
            where: { id },
        });
    }
};
exports.GuestService = GuestService;
exports.GuestService = GuestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tables_service_1.TablesService,
        jwt_1.JwtService])
], GuestService);
//# sourceMappingURL=guest.service.js.map