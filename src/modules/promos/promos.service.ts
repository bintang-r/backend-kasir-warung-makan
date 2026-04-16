import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PromosService {
  constructor(private readonly prisma: PrismaService) {}

  async getActivePromos() {
    const promos = await this.prisma.promo.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    
    // Convert BigInt to string and map to proper structure
    return promos.map(promo => ({
      ...promo,
      id: promo.id.toString()
    }));
  }
}
