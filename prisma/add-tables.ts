import { PrismaClient, TableStatus } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({ adapter });

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
        status: TableStatus.AKTIF
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
