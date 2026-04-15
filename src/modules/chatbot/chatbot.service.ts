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
}
