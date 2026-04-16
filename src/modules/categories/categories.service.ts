import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: bigint) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string }) {
    return this.prisma.category.create({
      data,
    });
  }

  async remove(id: bigint) {
    const menus = await this.prisma.menu.findMany({ where: { categoryId: id }, select: { id: true } });
    const menuIds = menus.map(m => m.id);

    if (menuIds.length > 0) {
      await this.prisma.cartItem.deleteMany({ where: { menuId: { in: menuIds } } });
      await this.prisma.orderItem.deleteMany({ where: { menuId: { in: menuIds } } });
      await this.prisma.menu.deleteMany({ where: { categoryId: id } });
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
