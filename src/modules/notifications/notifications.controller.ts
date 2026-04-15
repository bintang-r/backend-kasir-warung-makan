import { Controller, Get, Post, Patch, Param, Request, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getNotifications(@Request() req: any) {
    const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : undefined;
    const guestSessionId = req.user.role === 'GUEST' ? BigInt(req.user.id) : undefined;
    return this.notificationsService.findAll(userId, guestSessionId);
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard)
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(BigInt(id));
  }

  @Post('read-all')
  @UseGuards(JwtAuthGuard)
  async markAllAsRead(@Request() req: any) {
    const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : undefined;
    const guestSessionId = req.user.role === 'GUEST' ? BigInt(req.user.id) : undefined;
    return this.notificationsService.markAllAsRead(userId, guestSessionId);
  }
}
