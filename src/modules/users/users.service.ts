import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { LogType } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private auditLogsService: AuditLogsService,
  ) {}

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

  async create(data: any, actorId?: bigint) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    if (actorId) {
      await this.auditLogsService.log(
        actorId,
        `Membuat user baru: ${user.name} (${user.role})`,
        'Manajemen User',
        `Email: ${user.email}`,
        LogType.success
      );
    }

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateUser(id: bigint, data: any, actorId?: bigint) {
    const updateData = { ...data };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    const user = await this.prisma.user.update({
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

    if (actorId) {
      await this.auditLogsService.log(
        actorId,
        `Memperbarui user: ${user.name}`,
        'Manajemen User',
        `Role: ${user.role}, Email: ${user.email}`,
        LogType.info
      );
    }

    return user;
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

    const carts = await this.prisma.cart.findMany({ where: { userId: id } });
    const cartIds = carts.map(c => c.id);
    if (cartIds.length > 0) {
      await this.prisma.cartItem.deleteMany({ where: { cartId: { in: cartIds } } });
      await this.prisma.cart.deleteMany({ where: { userId: id } });
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    if (actorId && user) {
      await this.auditLogsService.log(
        actorId,
        `Menghapus user: ${user.name}`,
        'Manajemen User',
        `Role sebelumnya: ${user.role}`,
        LogType.warning
      );
    }

    return deletedUser;
  }
}
