"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const categories_module_1 = require("./modules/categories/categories.module");
const menus_module_1 = require("./modules/menus/menus.module");
const tables_module_1 = require("./modules/tables/tables.module");
const guest_module_1 = require("./modules/guest/guest.module");
const carts_module_1 = require("./modules/carts/carts.module");
const orders_module_1 = require("./modules/orders/orders.module");
const payments_module_1 = require("./modules/payments/payments.module");
const deliveries_module_1 = require("./modules/deliveries/deliveries.module");
const chatbot_module_1 = require("./modules/chatbot/chatbot.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const promos_module_1 = require("./modules/promos/promos.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const reviews_module_1 = require("./modules/reviews/reviews.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            categories_module_1.CategoriesModule,
            menus_module_1.MenusModule,
            tables_module_1.TablesModule,
            guest_module_1.GuestModule,
            carts_module_1.CartsModule,
            orders_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            deliveries_module_1.DeliveriesModule,
            chatbot_module_1.ChatbotModule,
            notifications_module_1.NotificationsModule,
            promos_module_1.PromosModule,
            dashboard_module_1.DashboardModule,
            reviews_module_1.ReviewsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map