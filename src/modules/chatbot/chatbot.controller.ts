import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('chatbot')
export class ChatbotController {
  constructor(private chatbotService: ChatbotService) {}

  @Post('message')
  @UseGuards(JwtAuthGuard)
  async handleMessage(@Request() req: any, @Body() body: { message: string }) {
    const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : null;
    const response = await this.chatbotService.processMessage(body.message);
    await this.chatbotService.logMessage(userId, body.message, response);
    return { response };
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getHistory(@Request() req: any) {
    const userId = BigInt(req.user.id);
    return this.chatbotService.getHistory(userId);
  }

  @Get('logs')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllLogs() {
    const logs = await this.chatbotService.getAllLogs();
    return logs.map(l => ({ ...l, id: l.id.toString(), userId: l.userId?.toString() }));
  }

  @Get('sessions')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllSessions() {
    const sessions = await this.chatbotService.getAllSessions();
    return sessions.map(s => ({ ...s, id: s.id.toString(), userId: s.userId?.toString() }));
  }
}
