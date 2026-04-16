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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(req, body) {
        const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : undefined;
        const guestSessionId = req.user.role === 'GUEST' ? BigInt(req.user.id) : undefined;
        const { cartId, orderType, address, tableId } = body;
        const parsedCartId = BigInt(cartId);
        const parsedTableId = tableId ? BigInt(tableId) : undefined;
        return this.ordersService.createOrder(parsedCartId, userId, guestSessionId, parsedTableId, req.user.role === 'GUEST' ? client_1.OrderSource.QR : client_1.OrderSource.APP, orderType, address);
    }
    async findAll(req) {
        const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : undefined;
        const guestSessionId = req.user.role === 'GUEST' ? BigInt(req.user.id) : undefined;
        return this.ordersService.getOrders(userId, guestSessionId);
    }
    async findAllStaff() {
        const orders = await this.ordersService.getAllOrders();
        return orders.map(order => ({
            ...order,
            id: order.id.toString(),
            userId: order.userId?.toString(),
            tableId: order.tableId?.toString(),
            guestSessionId: order.guestSessionId?.toString(),
            totalPrice: Number(order.totalPrice),
            items: order.items.map(i => ({
                ...i,
                id: i.id.toString(),
                orderId: i.orderId.toString(),
                menuId: i.menuId.toString(),
                price: Number(i.price)
            })),
            payments: order.payments?.map(p => ({
                ...p,
                id: p.id.toString(),
                orderId: p.orderId.toString(),
                amount: Number(p.amount),
            })) || [],
        }));
    }
    async findOne(id, req) {
        const order = await this.ordersService.getOrderById(BigInt(id));
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const isStaff = [client_1.Role.ADMIN, client_1.Role.KITCHEN, client_1.Role.KASIR].includes(req.user.role);
        const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : null;
        const guestSessionId = req.user.role === 'GUEST' ? BigInt(req.user.id) : null;
        const isOwner = (userId && order.userId === userId) ||
            (guestSessionId && order.guestSessionId === guestSessionId);
        if (!isStaff && !isOwner) {
            throw new common_1.ForbiddenException('You do not have permission to view this order');
        }
        return {
            ...order,
            id: order.id.toString(),
            userId: order.userId?.toString(),
            tableId: order.tableId?.toString(),
            guestSessionId: order.guestSessionId?.toString(),
            totalPrice: Number(order.totalPrice),
            items: order.items.map(i => ({
                ...i,
                id: i.id.toString(),
                orderId: i.orderId.toString(),
                menuId: i.menuId.toString(),
                price: Number(i.price)
            })),
            payments: order.payments.map(p => ({
                ...p,
                id: p.id.toString(),
                orderId: p.orderId.toString(),
                amount: Number(p.amount)
            }))
        };
    }
    async remove(id) {
        return this.ordersService.deleteOrder(BigInt(id));
    }
    async updateStatus(id, status) {
        return this.ordersService.updateStatus(BigInt(id), status);
    }
    async submitReview(id, req, rating, comment) {
        const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : null;
        return this.ordersService.addReview(BigInt(id), userId, rating, comment);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.KITCHEN, client_1.Role.KASIR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAllStaff", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.KITCHEN, client_1.Role.KASIR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/review'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('rating')),
    __param(3, (0, common_1.Body)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "submitReview", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map