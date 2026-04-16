import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CartsService } from '../carts/carts.service';
import { NotificationsService } from '../notifications/notifications.service';
import { OrderSource, OrderStatus, OrderType } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private cartsService: CartsService,
    private notificationsService: NotificationsService,
  ) {}

  async createOrder(
    cartId: bigint,
    userId?: bigint, 
    guestSessionId?: bigint, 
    tableId?: bigint, 
    source: OrderSource = OrderSource.APP,
    orderType: OrderType = OrderType.DINE_IN,
    address?: string
  ) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: { include: { menu: true } }
      }
    });
    
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty or not found');
    }

    let totalPrice = 0;
    const orderItemsData = cart.items.map((item) => {
      const price = Number(item.menu.price);
      totalPrice += price * item.qty;
      return {
        menuId: item.menuId,
        qty: item.qty,
        price: item.menu.price,
      };
    });

    // Create Order and initial Payment in a transaction
    const order = await this.prisma.order.create({
      data: {
        userId: userId || null,
        guestSessionId: guestSessionId || null,
        tableId: tableId || null,
        orderSource: source,
        orderType,
        address: address || null,
        totalPrice: totalPrice.toFixed(2),
        status: OrderStatus.PENDING,
        items: {
          create: orderItemsData,
        },
        payments: {
          create: {
            amount: totalPrice.toFixed(2),
            method: 'CASH', // Default, will be updated during payment flow
            status: 'UNPAID',
          }
        }
      },
      include: {
        items: {
          include: { menu: true },
        },
        payments: true
      },
    });

    // Clear cart after successful order creation
    await this.cartsService.clearCart(cart.id);

    // Create Notification
    await this.notificationsService.create({
      userId: userId || undefined,
      guestSessionId: guestSessionId || undefined,
      title: 'Pesanan Dikirim! 🚀',
      message: `Pesanan Anda #${order.id.toString()} sudah kami terima dan sedang menunggu konfirmasi.`,
    });

    return order;
  }

  async getOrders(userId?: bigint, guestSessionId?: bigint) {
    const orConditions: any[] = [];
    if (userId) orConditions.push({ userId });
    if (guestSessionId) orConditions.push({ guestSessionId });

    if (orConditions.length === 0) return [];

    return this.prisma.order.findMany({
      where: {
        OR: orConditions,
      },
      include: {
        items: {
          include: { menu: true },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrderById(id: bigint) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { menu: true },
        },
        payments: true,
      },
    });
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: { menu: true },
        },
        user: { select: { name: true } },
        table: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(orderId: bigint, status: OrderStatus) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    // Create Notification based on status
    let title = 'Update Pesanan 🔔';
    let message = `Status pesanan #${orderId.toString()} kini berubah menjadi ${status}.`;

    if (status === OrderStatus.CONFIRMED) {
      title = 'Pesanan Dikonfirmasi ✅';
      message = `Pesanan Anda #${orderId.toString()} telah dikonfirmasi dan masuk antrean dapur.`;
    } else if (status === OrderStatus.COOKING) {
      title = 'Sedang Dimasak 👨‍🍳';
      message = `Siap-siap! Koki kami sedang memasak pesanan Anda #${orderId.toString()}.`;
    } else if (status === OrderStatus.READY) {
      title = 'Hore, Pesanan Siap! 🍽️';
      message = `Pesanan Anda #${orderId.toString()} telah matang dan siap dihidangkan. Silakan dinikmati!`;
    }

    await this.notificationsService.create({
      userId: order.userId || undefined,
      guestSessionId: order.guestSessionId || undefined,
      title,
      message,
    });

    return order;
  }



  async addReview(orderId: bigint, userId: bigint | null, rating: number, comment: string) {
    // Check if order is completed
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.status !== OrderStatus.COMPLETED) {
      throw new BadRequestException('Order must be completed before leaving a review');
    }

    return this.prisma.review.create({
      data: {
        orderId,
        userId,
        rating,
        comment,
      },
    });
  }
}
