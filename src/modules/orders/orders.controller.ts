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
  async create(@Request() req: any, @Body() body: any) {
    const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : undefined;
    const guestSessionId = req.user.role === 'GUEST' ? BigInt(req.user.id) : undefined;
    
    const { cartId, orderType, address, tableId } = body;
    const parsedCartId = BigInt(cartId);
    const parsedTableId = tableId ? BigInt(tableId) : undefined;

    return this.ordersService.createOrder(
      parsedCartId,
      userId, 
      guestSessionId, 
      parsedTableId, 
      req.user.role === 'GUEST' ? OrderSource.QR : OrderSource.APP,
      orderType,
      address
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req: any) {
    const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : undefined;
    const guestSessionId = req.user.role === 'GUEST' ? BigInt(req.user.id) : undefined;
    return this.ordersService.getOrders(userId, guestSessionId);
  }

  @Get('all')
  @Roles(Role.ADMIN, Role.KITCHEN, Role.KASIR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllStaff() {
    return this.ordersService.getAllOrders();
  }

  @Put(':id/status')
  @Roles(Role.ADMIN, Role.KITCHEN, Role.KASIR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.ordersService.updateStatus(BigInt(id), status);
  }

  @Put(':id/received')
  @UseGuards(JwtAuthGuard)
  async confirmReceived(@Param('id') id: string) {
    return this.ordersService.confirmReceived(BigInt(id));
  }

  @Post(':id/review')
  @UseGuards(JwtAuthGuard)
  async submitReview(
    @Param('id') id: string, 
    @Request() req: any, 
    @Body('rating') rating: number, 
    @Body('comment') comment: string
  ) {
    const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : null;
    return this.ordersService.addReview(BigInt(id), userId, rating, comment);
  }
}
