import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, PaymentMethod } from '@prisma/client';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.KASIR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createAdmin(@Body() body: { orderId: string; method: PaymentMethod; amount: number }) {
    return this.paymentsService.processPayment(BigInt(body.orderId), body.method, body.amount);
  }

  @Post('process')
  @UseGuards(JwtAuthGuard)
  async process(@Body() body: { orderId: string; method: PaymentMethod; amount: number }) {
    return this.paymentsService.processPayment(BigInt(body.orderId), body.method, body.amount);
  }

  @Get(':orderId')
  @UseGuards(JwtAuthGuard)
  async findByOrder(@Param('orderId') orderId: string) {
    const payment = await this.paymentsService.getPaymentByOrder(BigInt(orderId));
    if (!payment) return null;
    return { ...payment, id: payment.id.toString(), orderId: payment.orderId.toString() };
  }

  @Get()
  @Roles(Role.ADMIN, Role.KASIR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    const payments = await this.paymentsService.findAll();
    return payments.map(p => ({
      ...p,
      id: p.id.toString(),
      orderId: p.orderId.toString(),
      order: {
        ...p.order,
        id: p.order.id.toString(),
        userId: p.order.userId?.toString(),
        tableId: p.order.tableId?.toString()
      }
    }));
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN, Role.KASIR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: PaymentStatus) {
    return this.paymentsService.updateStatus(BigInt(id), status);
  }
}
