import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TablesService } from '../tables/tables.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GuestService {
  constructor(
    private prisma: PrismaService,
    private tablesService: TablesService,
    private jwtService: JwtService,
  ) {}

  async createSession(tableId: bigint) {
    const table = await this.tablesService.findOne(tableId);
    if (!table) {
      throw new NotFoundException('Table not found');
    }

    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 6); // 6 hours expiry

    const session = await this.prisma.guestSession.create({
      data: {
        tableId,
        token,
        expiresAt,
      },
    });

    const jwtPayload = { 
      sub: session.id.toString(), 
      tableId: tableId.toString(), 
      role: 'GUEST' 
    };

    return {
      guest_token: this.jwtService.sign(jwtPayload),
      table_id: tableId.toString(),
      session_id: session.id.toString(),
    };
  }

  async getSession(id: bigint) {
    return this.prisma.guestSession.findUnique({
      where: { id },
      include: { table: true },
    });
  }
}
