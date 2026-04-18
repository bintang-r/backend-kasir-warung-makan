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
exports.MenusService = void 0;
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
const client_1 = require("@prisma/client");
let MenusService = class MenusService {
    prisma;
    auditLogsService;
    constructor(prisma, auditLogsService) {
        this.prisma = prisma;
        this.auditLogsService = auditLogsService;
    }
    async findAll() {
        return this.prisma.menu.findMany({
            include: { category: true },
        });
    }
    async findOne(id) {
        return this.prisma.menu.findUnique({
            where: { id },
            include: { category: true },
        });
    }
    async create(data, actorId) {
        const menu = await this.prisma.menu.create({
            data,
        });
        if (actorId) {
            await this.auditLogsService.log(actorId, `Menambah menu baru: ${menu.name}`, 'Kelola Menu', `Harga: Rp ${menu.price.toString()}`, client_1.LogType.success);
        }
        return menu;
    }
    async update(id, data, actorId) {
        if (data.image) {
            const oldMenu = await this.prisma.menu.findUnique({ where: { id } });
            if (oldMenu?.image && oldMenu.image.startsWith('/uploads/')) {
                const oldPath = path.join(process.cwd(), oldMenu.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
        }
        const menu = await this.prisma.menu.update({
            where: { id },
            data,
        });
        if (actorId) {
            await this.auditLogsService.log(actorId, `Memperbarui menu: ${menu.name}`, 'Kelola Menu', `Detail: ${JSON.stringify(data)}`, client_1.LogType.info);
        }
        return menu;
    }
    async remove(id) {
        const menu = await this.prisma.menu.findUnique({ where: { id } });
        if (menu?.image && menu.image.startsWith('/uploads/')) {
            const oldPath = path.join(process.cwd(), menu.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }
        await this.prisma.cartItem.deleteMany({
            where: { menuId: id },
        });
        await this.prisma.orderItem.deleteMany({
            where: { menuId: id },
        });
        const deletedMenu = await this.prisma.menu.delete({
            where: { id },
        });
        if (actorId && menu) {
            await this.auditLogsService.log(actorId, `Menghapus menu: ${menu.name}`, 'Kelola Menu', `Kategori ID: ${menu.categoryId}`, client_1.LogType.danger);
        }
        return deletedMenu;
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object, audit_logs_service_1.AuditLogsService])
], MenusService);
//# sourceMappingURL=menus.service.js.map