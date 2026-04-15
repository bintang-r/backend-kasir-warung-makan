import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('chatbot')
export class ChatbotController {
  constructor(private chatbotService: ChatbotService) {}

  @Post('message')
  @UseGuards(JwtAuthGuard)
  async handleMessage(@Request() req: any, @Body() body: { message: string }) {
    // Basic implementation as requested (logic last)
    // Just logs the message for now
    const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : null;
    const response = "Thank you for your message. Our agent will respond shortly.";
    await this.chatbotService.logMessage(userId, body.message, response);
    return { response };
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getHistory(@Request() req: any) {
    const userId = BigInt(req.user.id);
    return this.chatbotService.getHistory(userId);
  }
}
