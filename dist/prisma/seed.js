"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
require("dotenv/config");
const CategorySeeder_1 = require("./seeders/CategorySeeder");
const TableSeeder_1 = require("./seeders/TableSeeder");
const UserSeeder_1 = require("./seeders/UserSeeder");
const MenuSeeder_1 = require("./seeders/MenuSeeder");
const PromoSeeder_1 = require("./seeders/PromoSeeder");
const ActiveDataSeeder_1 = require("./seeders/ActiveDataSeeder");
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new client_1.PrismaClient({ adapter });
async function cleanDatabase() {
    console.log('🗑️ Cleaning database...');
    await prisma.delivery.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.review.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menu.deleteMany();
    await prisma.category.deleteMany();
    await prisma.table.deleteMany();
    await prisma.voucher.deleteMany();
    await prisma.promo.deleteMany();
    await prisma.guestSession.deleteMany();
    await prisma.user.deleteMany();
    console.log('✨ Database cleaned');
}
async function main() {
    try {
        console.log('🚀 Start seeding...');
        await cleanDatabase();
        await (0, CategorySeeder_1.seedCategories)(prisma);
        await (0, TableSeeder_1.seedTables)(prisma);
        await (0, UserSeeder_1.seedUsers)(prisma);
        await (0, MenuSeeder_1.seedMenus)(prisma);
        await (0, PromoSeeder_1.seedPromos)(prisma);
        await (0, ActiveDataSeeder_1.seedActiveData)(prisma);
        console.log('🏁 Seeding completed successfully!');
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=seed.js.map