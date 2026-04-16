import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async processPayment(orderId: bigint, method: PaymentMethod, amount: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { payments: true }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Find the UNPAID payment record created by OrdersService
    const existingPayment = order.payments.find(p => p.status === PaymentStatus.UNPAID);

    if (existingPayment) {
      return this.prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          method,
          status: PaymentStatus.PAID,
          paidAt: new Date(),
        },
      });
    }

    // Fallback: Create new if none exists
    return this.prisma.payment.create({
      data: {
        orderId,
        method,
        amount,
        status: PaymentStatus.PAID,
        paidAt: new Date(),
      },
    });
  }

  async getPaymentByOrder(orderId: bigint) {
    return this.prisma.payment.findFirst({
      where: { orderId },
      include: { order: true }
    });
  }

  async findAll() {
    return this.prisma.payment.findMany({
      include: { 
        order: { 
          include: { 
            user: { select: { name: true } },
            table: true 
          } 
        } 
      },
      orderBy: { paidAt: 'desc' },
    });
  }

  async updateStatus(id: bigint, status: PaymentStatus) {
    return this.prisma.payment.update({
      where: { id },
      data: { 
        status,
        paidAt: status === PaymentStatus.PAID ? new Date() : null
      },
    });
  }
}
