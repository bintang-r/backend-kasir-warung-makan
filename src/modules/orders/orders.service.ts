import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CartsService } from '../carts/carts.service';
import { OrderSource, OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private cartsService: CartsService,
  ) {}

  async createOrder(userId?: bigint, guestSessionId?: bigint, tableId?: bigint, source: OrderSource = OrderSource.APP) {
    const cart = await this.cartsService.getCart(userId, guestSessionId);
    
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
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

    const order = await this.prisma.order.create({
      data: {
        userId,
        guestSessionId,
        tableId,
        orderSource: source,
        totalPrice,
        status: OrderStatus.PENDING,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: { menu: true },
        },
      },
    });

    // Clear cart after successful order creation
    await this.cartsService.clearCart(cart.id);

    return order;
  }

  async getOrders(userId?: bigint, guestSessionId?: bigint) {
    return this.prisma.order.findMany({
      where: {
        OR: [
          { userId: userId || undefined },
          { guestSessionId: guestSessionId || undefined },
        ],
      },
      include: {
        items: {
          include: { menu: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(orderId: bigint, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}
