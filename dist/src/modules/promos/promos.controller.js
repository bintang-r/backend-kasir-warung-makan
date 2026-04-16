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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromosController = void 0;
const common_1 = require("@nestjs/common");
const promos_service_1 = require("./promos.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let PromosController = class PromosController {
    promosService;
    constructor(promosService) {
        this.promosService = promosService;
    }
    async getActivePromos() {
        return this.promosService.getActivePromos();
    }
    async findAllPromos() {
        return this.promosService.findAllPromos();
    }
    async createPromo(body) {
        const { title, description, image, isActive } = body;
        return this.promosService.createPromo({ title, description, image, isActive });
    }
    async updatePromo(id, body) {
        const { title, description, image, isActive } = body;
        return this.promosService.updatePromo(BigInt(id), { title, description, image, isActive });
    }
    async deletePromo(id) {
        return this.promosService.deletePromo(BigInt(id));
    }
    async findAllVouchers() {
        return this.promosService.findAllVouchers();
    }
    async createVoucher(body) {
        const { code, discount, expiredAt } = body;
        return this.promosService.createVoucher({ code, discount, expiredAt });
    }
    async updateVoucher(id, body) {
        const { code, discount, expiredAt } = body;
        return this.promosService.updateVoucher(BigInt(id), { code, discount, expiredAt });
    }
    async deleteVoucher(id) {
        return this.promosService.deleteVoucher(BigInt(id));
    }
    async verifyVoucher(code) {
        return this.promosService.findVoucherByCode(code);
    }
};
exports.PromosController = PromosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "getActivePromos", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "findAllPromos", null);
__decorate([
    (0, common_1.Post)('admin'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "createPromo", null);
__decorate([
    (0, common_1.Put)('admin/:id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "updatePromo", null);
__decorate([
    (0, common_1.Delete)('admin/:id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "deletePromo", null);
__decorate([
    (0, common_1.Get)('vouchers/admin/all'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "findAllVouchers", null);
__decorate([
    (0, common_1.Post)('vouchers/admin'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "createVoucher", null);
__decorate([
    (0, common_1.Put)('vouchers/admin/:id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "updateVoucher", null);
__decorate([
    (0, common_1.Delete)('vouchers/admin/:id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "deleteVoucher", null);
__decorate([
    (0, common_1.Get)('vouchers/verify/:code'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "verifyVoucher", null);
exports.PromosController = PromosController = __decorate([
    (0, common_1.Controller)('promos'),
    __metadata("design:paramtypes", [promos_service_1.PromosService])
], PromosController);
//# sourceMappingURL=promos.controller.js.map