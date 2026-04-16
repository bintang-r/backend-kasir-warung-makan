import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: bigint) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateUser(id: bigint, data: any) {
    const updateData = { ...data };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async remove(id: bigint) {
    // Unlink records to preserve financial/business history
    await this.prisma.order.updateMany({
      where: { userId: id },
      data: { userId: null },
    });

    await this.prisma.delivery.updateMany({
      where: { driverId: id },
      data: { driverId: null },
    });

    // Delete temporary/personal data
    await this.prisma.notification.deleteMany({ where: { userId: id } });
    await this.prisma.review.deleteMany({ where: { userId: id } });
    await this.prisma.chatbotLog.deleteMany({ where: { userId: id } });
    await this.prisma.chatbotSession.deleteMany({ where: { userId: id } });

    const carts = await this.prisma.cart.findMany({ where: { userId: id } });
    const cartIds = carts.map(c => c.id);
    if (cartIds.length > 0) {
      await this.prisma.cartItem.deleteMany({ where: { cartId: { in: cartIds } } });
      await this.prisma.cart.deleteMany({ where: { userId: id } });
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
