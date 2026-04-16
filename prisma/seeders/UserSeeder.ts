import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

export async function seedUsers(prisma: PrismaClient) {
  const password = await bcrypt.hash('password123', 10);

  // 1. Seed Staff (3 of each)
  const roles = [Role.ADMIN, Role.KASIR, Role.KITCHEN, Role.DRIVER];
  
  for (const role of roles) {
    for (let i = 1; i <= 3; i++) {
      const email = `${role.toLowerCase()}${i}@rmsiantar.com`;
      await prisma.user.create({
        data: {
          email,
          password,
          name: `${role.charAt(0) + role.slice(1).toLowerCase()} Staff ${i}`,
          role,
        }
      });
    }
  }

  // 2. Seed Normal Customers (10)
  for (let i = 1; i <= 10; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        password,
        name: faker.person.fullName(),
        role: Role.CUSTOMER
      }
    });
  }

  console.log('✅ Staff and Basic Customers seeded');
}
