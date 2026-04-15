import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(orderId: bigint, method: PaymentMethod, amount: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const payment = await this.prisma.payment.create({
      data: {
        orderId,
        method,
        amount,
        status: PaymentStatus.PAID,
        paidAt: new Date(),
      },
    });

    return payment;
  }

  async getPaymentByOrder(orderId: bigint) {
    return this.prisma.payment.findFirst({
      where: { orderId },
    });
  }
}
