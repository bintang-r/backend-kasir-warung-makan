import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentMethod, PaymentStatus } from '@prisma/client';
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private whatsappService: WhatsappService,
  ) {}

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
      const payment = await this.prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          method,
          status: PaymentStatus.PAID,
          paidAt: new Date(),
        },
      });

      this.sendWhatsAppPaymentNotification(orderId, amount, method);
      return payment;
    }

    // Fallback: Create new if none exists
    const payment = await this.prisma.payment.create({
      data: {
        orderId,
        method,
        amount,
        status: PaymentStatus.PAID,
        paidAt: new Date(),
      },
    });

    this.sendWhatsAppPaymentNotification(orderId, amount, method);
    return payment;
  }

  private async sendWhatsAppPaymentNotification(orderId: bigint, amount: number, method: string) {
    try {
      const adminNum = await this.whatsappService.getAdminNumber();
      if (!adminNum) return;

      const whatsappMessage = `*💰 PEMBAYARAN DITERIMA*\n` +
                              `----------------------------------\n` +
                              `*Order ID:* #${orderId.toString()}\n` +
                              `*Jumlah:* Rp ${new Intl.NumberFormat('id-ID').format(amount)}\n` +
                              `*Metode:* ${method}\n` +
                              `*Status:* LUNAS ✅\n` +
                              `----------------------------------\n` +
                              `Transaksi telah berhasil diverifikasi oleh sistem.`;

      await this.whatsappService.sendMessage(adminNum, whatsappMessage);
    } catch (err) {
      console.error('Failed to send WhatsApp payment note', err);
    }
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
    const payment = await this.prisma.payment.update({
      where: { id },
      data: { 
        status,
        paidAt: status === PaymentStatus.PAID ? new Date() : null
      },
    });

    if (status === PaymentStatus.PAID) {
      this.sendWhatsAppPaymentNotification(payment.orderId, Number(payment.amount), payment.method);
    }

    return payment;
  }
}
