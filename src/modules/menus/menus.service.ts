import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { LogType } from '@prisma/client';

@Injectable()
export class MenusService {
  constructor(
    private prisma: PrismaService,
    private auditLogsService: AuditLogsService,
  ) {}

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

  async create(data: any, actorId?: bigint) {
    const menu = await this.prisma.menu.create({
      data,
    });

    if (actorId) {
      await this.auditLogsService.log(
        actorId,
        `Menambah menu baru: ${menu.name}`,
        'Kelola Menu',
        `Harga: Rp ${menu.price.toString()}`,
        LogType.success
      );
    }

    return menu;
  }

  async update(id: bigint, data: any, actorId?: bigint) {
    if (data.image) {
      const oldMenu = await this.prisma.menu.findUnique({ where: { id } });
      if (oldMenu?.image && oldMenu.image.startsWith('/uploads/')) {
        const oldPath = path.join(process.cwd(), oldMenu.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const menu = await this.prisma.menu.update({
      where: { id },
      data,
    });

    if (actorId) {
      await this.auditLogsService.log(
        actorId,
        `Memperbarui menu: ${menu.name}`,
        'Kelola Menu',
        `Detail: ${JSON.stringify(data)}`,
        LogType.info
      );
    }

    return menu;
  }

  async remove(id: bigint, actorId?: bigint) {
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

    const deletedMenu = await this.prisma.menu.delete({
      where: { id },
    });

    if (actorId && menu) {
      await this.auditLogsService.log(
        actorId,
        `Menghapus menu: ${menu.name}`,
        'Kelola Menu',
        `Kategori ID: ${menu.categoryId}`,
        LogType.danger
      );
    }

    return deletedMenu;
  }

  async removeBulk(ids: bigint[], actorId?: bigint) {
    const menus = await this.prisma.menu.findMany({
      where: { id: { in: ids } }
    });

    for (const menu of menus) {
      if (menu.image && menu.image.startsWith('/uploads/')) {
        const oldPath = path.join(process.cwd(), menu.image);
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (e) {
            console.error('Failed to delete image:', oldPath);
          }
        }
      }
    }

    await this.prisma.cartItem.deleteMany({ where: { menuId: { in: ids } } });
    await this.prisma.orderItem.deleteMany({ where: { menuId: { in: ids } } });

    const result = await this.prisma.menu.deleteMany({
      where: { id: { in: ids } }
    });

    if (actorId) {
      await this.auditLogsService.log(
        actorId,
        `Menghapus ${result.count} menu secara masal`,
        'Kelola Menu',
        `ID: ${ids.map(id => id.toString()).join(', ')}`,
        LogType.danger
      );
    }

    return result;
  }

  async importBulk(data: any[], actorId?: bigint) {
    const createdCount = await this.prisma.menu.createMany({
      data: data.map(item => ({
        name: item.name,
        description: item.description || '',
        price: Number(item.price),
        image: item.image || null,
        categoryId: BigInt(item.categoryId),
        isAvailable: item.isAvailable === undefined ? true : item.isAvailable,
        isPopular: item.isPopular === undefined ? false : item.isPopular,
      })),
      skipDuplicates: true,
    });

    if (actorId && createdCount.count > 0) {
      await this.auditLogsService.log(
        actorId,
        `Mengimpor ${createdCount.count} menu baru via Excel`,
        'Kelola Menu',
        'Import Excel',
        LogType.success
      );
    }

    return createdCount;
  }
}
