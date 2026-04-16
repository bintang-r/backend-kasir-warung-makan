import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.menu.findMany({
      include: { category: true },
    });
  }

  async findOne(id: bigint) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async create(data: any) {
    return this.prisma.menu.create({
      data,
    });
  }

  async update(id: bigint, data: any) {
    if (data.image) {
      const oldMenu = await this.prisma.menu.findUnique({ where: { id } });
      if (oldMenu?.image && oldMenu.image.startsWith('/uploads/')) {
        const oldPath = path.join(process.cwd(), oldMenu.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async remove(id: bigint) {
    const menu = await this.prisma.menu.findUnique({ where: { id } });
    if (menu?.image && menu.image.startsWith('/uploads/')) {
      const oldPath = path.join(process.cwd(), menu.image);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Menghapus dari keranjang terlebih dahulu (karena keranjang sifatnya sementara)
    await this.prisma.cartItem.deleteMany({
      where: { menuId: id },
    });

    // Menghapus dari order items agar bisa dihapus walau sudah ada pesanan berjalan/historis
    await this.prisma.orderItem.deleteMany({
      where: { menuId: id },
    });

    return await this.prisma.menu.delete({
      where: { id },
    });
  }
}
