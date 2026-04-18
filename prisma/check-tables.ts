import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({ adapter });

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
