import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async remove(id: bigint) {
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
