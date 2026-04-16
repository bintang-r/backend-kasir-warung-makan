"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTables = seedTables;
const client_1 = require("@prisma/client");
async function seedTables(prisma) {
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
    console.log('✅ Tables seeded (1-15)');
}
//# sourceMappingURL=TableSeeder.js.map