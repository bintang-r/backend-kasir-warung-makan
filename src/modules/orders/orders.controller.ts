import { Controller, Get, Post, Body, Param, Put, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, OrderStatus, OrderSource } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req: any) {
    const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : undefined;
    const guestSessionId = req.user.role === 'GUEST' ? BigInt(req.user.id) : undefined;
    
    // For guests, we should ideally fetch the table_id from their session
    // For now, we'll assume it's passed or derived.
    return this.ordersService.createOrder(userId, guestSessionId, undefined, req.user.role === 'GUEST' ? OrderSource.QR : OrderSource.APP);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req: any) {
    const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : undefined;
    const guestSessionId = req.user.role === 'GUEST' ? BigInt(req.user.id) : undefined;
    return this.ordersService.getOrders(userId, guestSessionId);
  }

  @Put(':id/status')
  @Roles(Role.ADMIN, Role.KITCHEN, Role.KASIR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.ordersService.updateStatus(BigInt(id), status);
  }
}
