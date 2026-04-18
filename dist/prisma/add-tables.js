"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
require("dotenv/config");
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🧐 Checking existing tables...');
    const count = await prisma.table.count();
    if (count > 0) {
        console.log(`✅ Table is NOT empty (${count} tables found). No action taken.`);
        return;
    }
    console.log('🚀 Seeding tables...');
    for (let i = 1; i <= 15; i++) {
        const name = `Meja ${i}`;
        await prisma.table.create({
            data: {
                name,
                qrCode: `/qr-table/${i}`,
                status: client_1.TableStatus.AKTIF
            }
        });
    }
    console.log('✅ 15 Tables successfully seeded!');
}
main()
    .catch((e) => {
    console.error('❌ Error seeding tables:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=add-tables.js.map