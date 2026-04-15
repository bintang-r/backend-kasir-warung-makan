import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { GuestService } from './guest.service';

@Controller('guest')
export class GuestController {
  constructor(private guestService: GuestService) {}

  @Post('session')
  async createSession(@Body() body: { tableId?: string }) {
    const tableId = body.tableId ? BigInt(body.tableId) : undefined;
    return this.guestService.createSession(tableId);
  }

  @Get('session/:id')
  async getSession(@Param('id') id: string) {
    return this.guestService.getSession(BigInt(id));
  }
  
  @Get('qr/:table_id')
  async handleQrScan(@Param('table_id') tableId: string) {
    return this.guestService.createSession(BigInt(tableId));
  }
}
