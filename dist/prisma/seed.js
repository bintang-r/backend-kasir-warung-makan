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
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
require("dotenv/config");
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Start seeding...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@rmsiantar.com' },
        update: {},
        create: {
            email: 'admin@rmsiantar.com',
            password: adminPassword,
            name: 'Admin RM Siantar',
            role: client_1.Role.ADMIN,
        },
    });
    console.log('Admin user seeded.');
    const createOrGetCategory = async (name) => {
        let cat = await prisma.category.findFirst({ where: { name } });
        if (!cat) {
            cat = await prisma.category.create({ data: { name } });
        }
        return cat;
    };
    const catMakanan = await createOrGetCategory('Makanan Utama');
    const catMinuman = await createOrGetCategory('Minuman');
    const catLauk = await createOrGetCategory('Lauk Tambahan');
    const catDessert = await createOrGetCategory('Pencuci Mulut');
    console.log('Categories seeded.');
    const menus = [
        { name: 'Nasi Padang Rendang', description: 'Nasi hangat dengan bumbu kuah kental dan rendang daging sapi empuk khas Minang.', price: 25000, categoryId: catMakanan.id, isPopular: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1575037614876-c38f4e3dda0a?auto=format&fit=crop&q=80&w=400' },
        { name: 'Sate Padang Pariaman', description: 'Sate daging sapi lidah dengan kuah kacang kuning kental yang kaya rempah.', price: 28000, categoryId: catMakanan.id, isPopular: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=400' },
        { name: 'Nasi Ayam Batokok', description: 'Ayam goreng yang dipukul (batokok) dengan sambal ijo melimpah.', price: 24000, categoryId: catMakanan.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1626082928549-b00685e135ee?auto=format&fit=crop&q=80&w=400' },
        { name: 'Rendang Daging', description: 'Sepotong daging sapi legendaris Minang dengan bumbu karamelisasi.', price: 18000, categoryId: catLauk.id, isPopular: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1575037614876-c38f4e3dda0a?auto=format&fit=crop&q=80&w=400' },
        { name: 'Ayam Pop', description: 'Ayam rebus bumbu putih gurih khas Bukittinggi tanpa kulit.', price: 18000, categoryId: catLauk.id, isPopular: true, isAvailable: true, image: 'https://images.unplash.com/photo-1626082928549-b00685e135ee?auto=format&fit=crop&q=80&w=400' },
        { name: 'Dendeng Balado', description: 'Dendeng sapi garing dengan sambal merah yang pedas nikmat.', price: 20000, categoryId: catLauk.id, isPopular: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb?auto=format&fit=crop&q=80&w=400' },
        { name: 'Gulai Tunjang', description: 'Gulai kikil sapi yang super kenyal dan kaya akan bumbu rempah.', price: 20000, categoryId: catLauk.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1627308595229-7830f5c92f44?auto=format&fit=crop&q=80&w=400' },
        { name: 'Telur Dadar Barendo', description: 'Telur dadar goreng garing dan berenda khas rumah makan Padang.', price: 12000, categoryId: catLauk.id, isPopular: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1522244459664-2f277e50fff2?auto=format&fit=crop&q=80&w=400' },
        { name: 'Perkedel Kentang', description: 'Kentang tumbuk goreng dengan campuran daging dan bumbu.', price: 5000, categoryId: catLauk.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1627308595229-7830f5c92f44?auto=format&fit=crop&q=80&w=400' },
        { name: 'Sambal Ijo Special', description: 'Pelengkap wajib nasi padang dengan cabai hijau besar dan tomat hijau.', price: 3000, categoryId: catLauk.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=400' },
        { name: 'Ikan Asam Padeh', description: 'Gulai ikan laut dengan kuah merah pedas dan asam tanpa santan.', price: 18000, categoryId: catLauk.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1627308595229-7830f5c92f44?auto=format&fit=crop&q=80&w=400' },
        { name: 'Kerupuk Jangek', description: 'Kerupuk kulit sapi premium yang gurih dan renyah.', price: 10000, categoryId: catLauk.id, isPopular: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb?auto=format&fit=crop&q=80&w=400' },
        { name: 'Teh Talua', description: 'Minuman teh telur legendaris dengan lima gradasi warna.', price: 15000, categoryId: catMinuman.id, isPopular: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400' },
        { name: 'Es Teh Manis', description: 'Teh manis dingin menyegarkan pelepas dahaga.', price: 5000, categoryId: catMinuman.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400' },
        { name: 'Jus Alpukat', description: 'Jus alpukat mentega kental dengan topping coklat.', price: 15000, categoryId: catMinuman.id, isPopular: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb?auto=format&fit=crop&q=80&w=400' },
        { name: 'Es Jeruk Nipis', description: 'Perasan jeruk nipis asli menyegarkan.', price: 10000, categoryId: catMinuman.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb?auto=format&fit=crop&q=80&w=400' },
        { name: 'Es Teh Telur Kocok', description: 'Varian teh telur dingin yang kental dan gurih.', price: 16000, categoryId: catMinuman.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400' },
        { name: 'Air Mineral Dingin', description: 'Air mineral kemasan 600ml.', price: 5000, categoryId: catMinuman.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb?auto=format&fit=crop&q=80&w=400' },
        { name: 'Bubur Kampiun', description: 'Campuran bubur sumsum, ketan hitam, dan kolak pisang.', price: 15000, categoryId: catDessert.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1627308595229-7830f5c92f44?auto=format&fit=crop&q=80&w=400' },
        { name: 'Es Tebak', description: 'Es campur khas Minang dengan isian tebak, cincau, dan roti.', price: 15000, categoryId: catDessert.id, isAvailable: true, image: 'https://images.unsplash.com/photo-1605335158652-9f3b146ab6fb?auto=format&fit=crop&q=80&w=400' }
    ];
    for (const menu of menus) {
        const existing = await prisma.menu.findFirst({ where: { name: menu.name } });
        const { categoryId, ...menuData } = menu;
        const finalData = {
            ...menuData,
            category: { connect: { id: categoryId } }
        };
        if (existing) {
            await prisma.menu.update({
                where: { id: existing.id },
                data: finalData,
            });
        }
        else {
            await prisma.menu.create({ data: finalData });
        }
    }
    console.log('20+ Menu items seeded/updated.');
    for (let i = 1; i <= 10; i++) {
        const tableName = `Meja ${i}`;
        const existingTable = await prisma.table.findFirst({ where: { name: tableName } });
        if (!existingTable) {
            await prisma.table.create({
                data: {
                    name: tableName,
                    qrCode: `/qr?table_id=${i}`,
                    status: client_1.TableStatus.AKTIF
                }
            });
        }
    }
    console.log('10 Tables initialized.');
    console.log('Seeding completed successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map