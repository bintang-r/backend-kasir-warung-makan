"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMenus = seedMenus;
const faker_1 = require("@faker-js/faker");
async function seedMenus(prisma) {
    const categories = await prisma.category.findMany();
    const menuData = [
        { name: 'Rendang Daging Sapi', cat: 'Makanan Utama', price: 25000, popular: true, img: 'https://images.unsplash.com/photo-1575037614876-c38f4e3dda0a' },
        { name: 'Sate Padang Lidah', cat: 'Makanan Utama', price: 28000, popular: true, img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4' },
        { name: 'Ayam Pop Spesial', cat: 'Lauk Tambahan', price: 20000, popular: true, img: 'https://images.unsplash.com/photo-1626082928549-b00685e135ee' },
        { name: 'Dendeng Balado Basah', cat: 'Lauk Tambahan', price: 22000, popular: true, img: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb' },
        { name: 'Gulai Tunjang (Kikil)', cat: 'Lauk Tambahan', price: 24000, popular: false, img: 'https://images.unsplash.com/photo-1627308595229-7830f5c92f44' },
        { name: 'Gulai Kepala Ikan Kakap', cat: 'Makanan Utama', price: 65000, popular: true, img: 'https://images.unsplash.com/photo-1627308595229-7830f5c92f44' },
        { name: 'Ayam Bakar Padang', cat: 'Makanan Utama', price: 22000, popular: false, img: 'https://images.unsplash.com/photo-1626082928549-b00685e135ee' },
        { name: 'Ikan Asam Padeh', cat: 'Lauk Tambahan', price: 20000, popular: false, img: 'https://images.unsplash.com/photo-1627308595229-7830f5c92f44' },
        { name: 'Paru Goreng Kering', cat: 'Lauk Tambahan', price: 18000, popular: true, img: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb' },
        { name: 'Telur Dadar Barendo', cat: 'Lauk Tambahan', price: 12000, popular: true, img: 'https://images.unsplash.com/photo-1522244459664-2f277e50fff2' },
        { name: 'Teh Talua (Teh Telur)', cat: 'Minuman Segar', price: 15000, popular: true, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc' },
        { name: 'Jus Alpukat Cokelat', cat: 'Minuman Segar', price: 18000, popular: true, img: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb' },
        { name: 'Es Jeruk Peras', cat: 'Minuman Segar', price: 12000, popular: false, img: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb' },
        { name: 'Kopi Sidikalang Panas', cat: 'Minuman Hangat', price: 10000, popular: false, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc' },
        { name: 'Bubur Kampiun', cat: 'Pencuci Mulut', price: 15000, popular: true, img: 'https://images.unsplash.com/photo-1627308595229-7830f5c92f44' },
        { name: 'Es Tebak', cat: 'Pencuci Mulut', price: 15000, popular: false, img: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb' },
        { name: 'Nasi Putih', cat: 'Lauk Tambahan', price: 6000, popular: false, img: null },
        { name: 'Jengkol Balado', cat: 'Lauk Tambahan', price: 10000, popular: false, img: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb' },
        { name: 'Gulai Daun Singkong', cat: 'Lauk Tambahan', price: 5000, popular: false, img: null },
        { name: 'Perkedel Kentang', cat: 'Lauk Tambahan', price: 5000, popular: false, img: null },
    ];
    for (const item of menuData) {
        const category = categories.find(c => c.name === item.cat);
        if (category) {
            await prisma.menu.create({
                data: {
                    name: item.name,
                    description: faker_1.faker.commerce.productDescription(),
                    price: item.price,
                    isPopular: item.popular,
                    isAvailable: true,
                    image: item.img ? `${item.img}?auto=format&fit=crop&q=80&w=400` : null,
                    category: { connect: { id: category.id } }
                }
            });
        }
    }
    const randomItems = [
        'Ayam Goreng Bumbu', 'Udang Balado', 'Gulai Tambusu', 'Cumi Saus Padang',
        'Ikan Kembung Bakar', 'Otak Sapi Gulai', 'Paru Mercon', 'Soto Padang',
        'Martabak Mesir', 'Kerupuk Kulit Jangek', 'Es Teh Manis', 'Es Campur',
        'Jus Mangga', 'Kopi Susu Talua', 'Ketupat Sayur', 'Nasi Goreng Padang',
        'Mie Goreng Aceh (Style Padang)', 'Sate Usus', 'Sate Jantung', 'Sambal Ijo Extra'
    ];
    for (const name of randomItems) {
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        await prisma.menu.create({
            data: {
                name,
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.number.int({ min: 5000, max: 40000 }),
                isPopular: Math.random() > 0.8,
                isAvailable: true,
                category: { connect: { id: randomCat.id } }
            }
        });
    }
    console.log('✅ Menus seeded (40+ items)');
}
//# sourceMappingURL=MenuSeeder.js.map