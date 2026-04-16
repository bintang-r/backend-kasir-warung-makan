"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCategories = seedCategories;
async function seedCategories(prisma) {
    const categories = [
        'Makanan Utama',
        'Lauk Tambahan',
        'Minuman Segar',
        'Minuman Hangat',
        'Pencuci Mulut',
        'Paket Hemat'
    ];
    for (const name of categories) {
        await prisma.category.upsert({
            where: { id: 0 },
            update: {},
            create: { name }
        }).catch(async () => {
            const exists = await prisma.category.findFirst({ where: { name } });
            if (!exists) {
                await prisma.category.create({ data: { name } });
            }
        });
    }
    console.log('✅ Categories seeded');
}
//# sourceMappingURL=CategorySeeder.js.map