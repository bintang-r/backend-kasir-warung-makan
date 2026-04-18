"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
require("dotenv/config");
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const tables = await prisma.table.findMany();
    console.log('--- TABLE LIST ---');
    tables.forEach(t => {
        console.log(`ID: ${t.id}, Name: ${t.name}, Status: ${t.status}`);
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=check-tables.js.map