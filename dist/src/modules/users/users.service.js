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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
const client_1 = require("@prisma/client");
let UsersService = class UsersService {
    prisma;
    auditLogsService;
    constructor(prisma, auditLogsService) {
        this.prisma = prisma;
        this.auditLogsService = auditLogsService;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async create(data, actorId) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
        if (actorId) {
            await this.auditLogsService.log(actorId, `Membuat user baru: ${user.name} (${user.role})`, 'Manajemen User', `Email: ${user.email}`, client_1.LogType.success);
        }
        return user;
    }
    async findAll() {
        return this.prisma.user.findMany();
    }
    async updateUser(id, data, actorId) {
        const updateData = { ...data };
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        else {
            delete updateData.password;
        }
        const user = await this.prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        if (actorId) {
            await this.auditLogsService.log(actorId, `Memperbarui user: ${user.name}`, 'Manajemen User', `Role: ${user.role}, Email: ${user.email}`, client_1.LogType.info);
        }
        return user;
    }
    async remove(id) {
        await this.prisma.order.updateMany({
            where: { userId: id },
            data: { userId: null },
        });
        await this.prisma.delivery.updateMany({
            where: { driverId: id },
            data: { driverId: null },
        });
        await this.prisma.notification.deleteMany({ where: { userId: id } });
        await this.prisma.review.deleteMany({ where: { userId: id } });
        const carts = await this.prisma.cart.findMany({ where: { userId: id } });
        const cartIds = carts.map(c => c.id);
        if (cartIds.length > 0) {
            await this.prisma.cartItem.deleteMany({ where: { cartId: { in: cartIds } } });
            await this.prisma.cart.deleteMany({ where: { userId: id } });
        }
        const user = await this.prisma.user.findUnique({ where: { id } });
        const deletedUser = await this.prisma.user.delete({
            where: { id },
        });
        if (actorId && user) {
            await this.auditLogsService.log(actorId, `Menghapus user: ${user.name}`, 'Manajemen User', `Role sebelumnya: ${user.role}`, client_1.LogType.warning);
        }
        return deletedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object, audit_logs_service_1.AuditLogsService])
], UsersService);
//# sourceMappingURL=users.service.js.map