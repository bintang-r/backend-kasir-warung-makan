import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ChatbotService {
  constructor(private prisma: PrismaService) {}

  async logMessage(userId: bigint | null, message: string, response: string) {
    return this.prisma.chatbotLog.create({
      data: {
        userId,
        message,
        response,
      },
    });
  }

  async getHistory(userId: bigint) {
    return this.prisma.chatbotLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllLogs() {
    return this.prisma.chatbotLog.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllSessions() {
    return this.prisma.chatbotSession.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async processMessage(message: string): Promise<string> {
    const input = message.toLowerCase();
    
    // Greeting
    if (input.includes('halo') || input.includes('assalamualaikum') || input.includes('pagi') || input.includes('siang')) {
      return "Halo! Senang bertemu dengan Anda. Ada yang bisa saya bantu untuk memilih menu hari ini?";
    }

    // Recommendation
    if (input.includes('rekomendasi') || input.includes('enak') || input.includes('favorit') || input.includes('populer')) {
      const items = await this.prisma.menu.findMany({
        where: { isPopular: true, isAvailable: true },
        take: 3,
      });
      if (items.length > 0) {
        const list = items.map(i => `- ${i.name} (Rp ${Number(i.price).toLocaleString('id-ID')})`).join('\n');
        return `Ini menu yang paling banyak dicari pelanggan lain:\n${list}\n\nSilakan dicoba, rasanya benar-benar enak!`;
      }
    }

    // Menu / Category
    if (input.includes('menu') || input.includes('makan') || input.includes('list')) {
      const categories = await this.prisma.category.findMany({ include: { _count: { select: { menus: true } } } });
      const list = categories.map(c => `- ${c.name} (${c._count.menus} macam)`).join('\n');
      return `Kami punya bermacam-macam kategori menu:\n${list}\n\nAnda ingin melihat yang mana? Tanyakan saja nanti.`;
    }

    // Generic search for menu items
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
        return `${i.name} ada! Harganya Rp ${Number(i.price).toLocaleString('id-ID')}. ${i.description || ''}. Ingin dimasukkan ke keranjang?`;
      }
    }

    return "Maaf, saya belum paham apa maksud Anda. Coba tanya soal menu, rekomendasi, atau harga makanan.";
  }
}
