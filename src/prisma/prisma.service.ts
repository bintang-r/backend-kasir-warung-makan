import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as mysql from 'mysql2/promise';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    console.log('Initializing PrismaService with PrismaMariaDb adapter...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    const pool = mysql.createPool(process.env.DATABASE_URL);
    const adapter = new PrismaMariaDb(pool);
    super({ adapter });
    console.log('PrismaClient super() called.');
  }

  async onModuleInit() {
    console.log('Connecting to database...');
    try {
      await this.$connect();
      console.log('Database connected successfully.');
    } catch (error) {
      console.error('Failed to connect to database:', error);
    }
  }
}

