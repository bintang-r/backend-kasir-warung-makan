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
  async create(@Body() body: { orderId: string; method: PaymentMethod; amount: number }) {
    return this.paymentsService.createPayment(BigInt(body.orderId), body.method, body.amount);
  }

  @Get(':orderId')
  @UseGuards(JwtAuthGuard)
  async findByOrder(@Param('orderId') orderId: string) {
    return this.paymentsService.getPaymentByOrder(BigInt(orderId));
  }
}
