import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as mariadb from 'mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = mariadb.createPool(process.env.DATABASE_URL);
    const adapter = new PrismaMariaDb(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
