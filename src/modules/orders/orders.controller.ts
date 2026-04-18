import { Controller, Get, Post, Body, Param, Put, Delete, Request, UseGuards, ForbiddenException, NotFoundException } from '@nestjs/common';
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
  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.KITCHEN, Role.KASIR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllStaff() {
    const orders = await this.ordersService.getAllOrders();
    return orders.map(order => ({
      ...order,
      id: order.id.toString(),
      userId: order.userId?.toString(),
      tableId: order.tableId?.toString(),
      guestSessionId: order.guestSessionId?.toString(),
      totalPrice: Number(order.totalPrice),
      items: order.items.map(i => ({
        ...i,
        id: i.id.toString(),
        orderId: i.orderId.toString(),
        menuId: i.menuId.toString(),
        price: Number(i.price)
      })),
      payments: (order as any).payments?.map(p => ({
        ...p,
        id: p.id.toString(),
        orderId: p.orderId.toString(),
        amount: Number(p.amount),
      })) || [],
    }));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req: any) {
    const order = await this.ordersService.getOrderById(BigInt(id));
    if (!order) throw new NotFoundException('Order not found');

    // Check ownership or staff role
    const isStaff = ([Role.SUPERADMIN, Role.ADMIN, Role.KITCHEN, Role.KASIR] as Role[]).includes(req.user.role as Role);
    const userId = req.user.role !== 'GUEST' ? BigInt(req.user.id) : null;
    const guestSessionId = req.user.role === 'GUEST' ? BigInt(req.user.id) : null;

    const isOwner = (userId && order.userId === userId) || 
                    (guestSessionId && order.guestSessionId === guestSessionId);

    if (!isStaff && !isOwner) {
      throw new ForbiddenException('You do not have permission to view this order');
    }

    return {
      ...order,
      id: order.id.toString(),
      userId: order.userId?.toString(),
      tableId: order.tableId?.toString(),
      guestSessionId: order.guestSessionId?.toString(),
      totalPrice: Number(order.totalPrice),
      items: order.items.map(i => ({
        ...i,
        id: i.id.toString(),
        orderId: i.orderId.toString(),
        menuId: i.menuId.toString(),
        price: Number(i.price)
      })),
      payments: order.payments.map(p => ({
        ...p,
        id: p.id.toString(),
        orderId: p.orderId.toString(),
        amount: Number(p.amount)
      }))
    };
  }

  @Delete(':id')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return this.ordersService.deleteOrder(BigInt(id));
  }

  @Put(':id/status')
  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.KITCHEN, Role.KASIR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.ordersService.updateStatus(BigInt(id), status);
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
