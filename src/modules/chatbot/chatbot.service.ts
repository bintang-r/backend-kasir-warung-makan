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

  async createSession(userId: bigint, sessionId: string) {
    return this.prisma.chatbotSession.create({
      data: {
        userId,
        sessionId,
      },
    });
  }

  async processMessage(message: string): Promise<string> {
    const input = message.toLowerCase();
    
    // Greeting
    if (input.includes('halo') || input.includes('assalamualaikum') || input.includes('pagi') || input.includes('siang')) {
      return "Halo dunsanak! Sanang basuo jo sanak. Ado nan bisa ambo bantu untuak mamiliah menu hari ko?";
    }

    // Recommendation
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

    // Menu / Category
    if (input.includes('menu') || input.includes('makan') || input.includes('list')) {
      const categories = await this.prisma.category.findMany({ include: { _count: { select: { menus: true } } } });
      const list = categories.map(c => `- ${c.name} (${c._count.menus} macam)`).join('\n');
      return `Kami punyo bamacam-macam kategori menu:\n${list}\n\nSanak nio caliak nan ma? Tanyoan se nantin.`;
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
        return `${i.name} ado dunsanak! Haragonyo Rp ${Number(i.price).toLocaleString('id-ID')}. ${i.description || ''}. Nio dimasuakan ka keranjang?`;
      }
    }

    return "Maaf dunsanak, ambo alun paham apo nan sanak mukasuik. Cubo tanyo soal menu, rekomendasi, atau haraga makanan.";
  }
}
