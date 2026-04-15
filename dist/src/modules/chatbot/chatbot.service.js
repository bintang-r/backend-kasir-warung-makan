"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ChatbotService = class ChatbotService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logMessage(userId, message, response) {
        return this.prisma.chatbotLog.create({
            data: {
                userId,
                message,
                response,
            },
        });
    }
    async getHistory(userId) {
        return this.prisma.chatbotLog.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createSession(userId, sessionId) {
        return this.prisma.chatbotSession.create({
            data: {
                userId,
                sessionId,
            },
        });
    }
    async processMessage(message) {
        const input = message.toLowerCase();
        if (input.includes('halo') || input.includes('assalamualaikum') || input.includes('pagi') || input.includes('siang')) {
            return "Halo dunsanak! Sanang basuo jo sanak. Ado nan bisa ambo bantu untuak mamiliah menu hari ko?";
        }
        if (input.includes('rekomendasi') || input.includes('enak') || input.includes('favorit') || input.includes('populer')) {
            const items = await this.prisma.menu.findMany({
                where: { isPopular: true, isAvailable: true },
                take: 3,
            });
            if (items.length > 0) {
                const list = items.map(i => `- ${i.name} (Rp ${Number(i.price).toLocaleString('id-ID')})`).join('\n');
                return `Iko menu nan paling banyak dicari dunsanak lain:\n${list}\n\nSilekan dicubo, rasonyo sabana lamak!`;
            }
        }
        if (input.includes('menu') || input.includes('makan') || input.includes('list')) {
            const categories = await this.prisma.category.findMany({ include: { _count: { select: { menus: true } } } });
            const list = categories.map(c => `- ${c.name} (${c._count.menus} macam)`).join('\n');
            return `Kami punyo bamacam-macam kategori menu:\n${list}\n\nSanak nio caliak nan ma? Tanyoan se nantin.`;
        }
        if (input.length > 3) {
            const items = await this.prisma.menu.findMany({
                where: {
                    OR: [
                        { name: { contains: input } },
                        { description: { contains: input } }
                    ],
                    isAvailable: true
                },
                take: 2
            });
            if (items.length > 0) {
                const i = items[0];
                return `${i.name} ado dunsanak! Haragonyo Rp ${Number(i.price).toLocaleString('id-ID')}. ${i.description || ''}. Nio dimasuakan ka keranjang?`;
            }
        }
        return "Maaf dunsanak, ambo alun paham apo nan sanak mukasuik. Cubo tanyo soal menu, rekomendasi, atau haraga makanan.";
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map