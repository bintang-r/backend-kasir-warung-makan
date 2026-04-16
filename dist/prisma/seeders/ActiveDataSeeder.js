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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedActiveData = seedActiveData;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const faker_1 = require("@faker-js/faker");
async function seedActiveData(prisma) {
    const password = await bcrypt.hash('password123', 10);
    const menus = await prisma.menu.findMany();
    const tables = await prisma.table.findMany();
    console.log('🌱 Generating 30 active customers with data...');
    for (let i = 1; i <= 30; i++) {
        const user = await prisma.user.create({
            data: {
                email: `customer${i}@example.com`,
                password,
                name: faker_1.faker.person.fullName(),
                role: client_1.Role.CUSTOMER,
            }
        });
        const cart = await prisma.cart.create({
            data: { userId: user.id }
        });
        const cartItemCount = faker_1.faker.number.int({ min: 1, max: 3 });
        for (let j = 0; j < cartItemCount; j++) {
            const randomMenu = menus[Math.floor(Math.random() * menus.length)];
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    menuId: randomMenu.id,
                    qty: faker_1.faker.number.int({ min: 1, max: 2 })
                }
            });
        }
        const orderCount = faker_1.faker.number.int({ min: 2, max: 4 });
        for (let k = 0; k < orderCount; k++) {
            const statusList = [client_1.OrderStatus.PENDING, client_1.OrderStatus.COOKING, client_1.OrderStatus.READY, client_1.OrderStatus.COMPLETED];
            const status = statusList[Math.floor(Math.random() * statusList.length)];
            const orderType = Math.random() > 0.3 ? client_1.OrderType.DINE_IN : client_1.OrderType.TAKEAWAY;
            const orderSource = Math.random() > 0.5 ? client_1.OrderSource.APP : client_1.OrderSource.QR;
            let totalPrice = 0;
            const orderItems = [];
            const itemCount = faker_1.faker.number.int({ min: 2, max: 5 });
            for (let m = 0; m < itemCount; m++) {
                const menu = menus[Math.floor(Math.random() * menus.length)];
                const qty = faker_1.faker.number.int({ min: 1, max: 2 });
                totalPrice += Number(menu.price) * qty;
                orderItems.push({
                    menuId: menu.id,
                    qty,
                    price: menu.price
                });
            }
            const order = await prisma.order.create({
                data: {
                    userId: user.id,
                    tableId: orderType === client_1.OrderType.DINE_IN ? tables[Math.floor(Math.random() * tables.length)].id : null,
                    orderSource,
                    orderType,
                    status,
                    totalPrice,
                    address: orderType === client_1.OrderType.TAKEAWAY ? faker_1.faker.location.streetAddress() : null,
                    createdAt: faker_1.faker.date.recent({ days: 10 }),
                    items: {
                        create: orderItems
                    }
                }
            });
            if (status === client_1.OrderStatus.COMPLETED || status === client_1.OrderStatus.READY || Math.random() > 0.5) {
                await prisma.payment.create({
                    data: {
                        orderId: order.id,
                        method: Math.random() > 0.5 ? client_1.PaymentMethod.CASH : client_1.PaymentMethod.EWALLET,
                        status: (status === client_1.OrderStatus.COMPLETED) ? client_1.PaymentStatus.PAID : client_1.PaymentStatus.UNPAID,
                        amount: totalPrice,
                        paidAt: (status === client_1.OrderStatus.COMPLETED) ? new Date() : null
                    }
                });
            }
            if (status === client_1.OrderStatus.COMPLETED && Math.random() > 0.3) {
                await prisma.review.create({
                    data: {
                        orderId: order.id,
                        userId: user.id,
                        rating: faker_1.faker.number.int({ min: 4, max: 5 }),
                        comment: faker_1.faker.lorem.sentence(),
                    }
                });
            }
            await prisma.notification.create({
                data: {
                    userId: user.id,
                    title: 'Update Pesanan',
                    message: `Pesanan #${order.id.toString()} Anda kini berstatus ${status}.`,
                    isRead: Math.random() > 0.5,
                    createdAt: new Date()
                }
            });
        }
    }
    console.log('✅ 30 Active Customers with complex data seeded');
}
//# sourceMappingURL=ActiveDataSeeder.js.map