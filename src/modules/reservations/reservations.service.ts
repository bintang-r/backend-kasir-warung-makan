import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationStatusDto } from './dto/update-reservation-status.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReservationDto, userId?: bigint) {
    const { items, paymentType, tableId, ...reservationData } = dto;
    let orderId: bigint | undefined = undefined;

    return this.prisma.$transaction(async (tx) => {
      // 1. If there are items, create an order
      if (items && items.length > 0) {
        const totalPrice = items.reduce((sum, item) => sum + item.qty * item.price, 0);

        const order = await tx.order.create({
          data: {
            userId,
            tableId: tableId ? BigInt(tableId) : null,
            orderSource: 'APP',
            orderType: 'DINE_IN',
            status: 'PENDING',
            totalPrice,
            items: {
              create: items.map(item => ({
                menuId: BigInt(item.menuId),
                qty: item.qty,
                price: item.price
              }))
            }
          }
        });

        orderId = order.id;

        // DP Payment Handling
        if (paymentType === 'DP' || paymentType === 'FULL') {
          const paymentAmount = paymentType === 'DP' ? totalPrice / 2 : totalPrice;
          await tx.payment.create({
            data: {
              orderId: order.id,
              method: 'EWALLET', // assuming e-wallet or similar for online
              status: 'PAID',
              amount: paymentAmount,
              paidAt: new Date()
            }
          });
        }
      }

      // 2. Create the Reservation
      return tx.reservation.create({
        data: {
          name: reservationData.name,
          phone: reservationData.phone,
          date: new Date(reservationData.date),
          guestCount: reservationData.guestCount,
          notes: reservationData.notes,
          userId,
          tableId: tableId ? BigInt(tableId) : null,
          orderId
        }
      });
    });
  }

  async findAll() {
    return this.prisma.reservation.findMany({
      orderBy: { date: 'asc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
        table: true,
        order: {
          include: {
            items: { include: { menu: true } },
            payments: true
          }
        }
      },
    });
  }

  async updateStatus(id: bigint, updateDto: UpdateReservationStatusDto) {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return this.prisma.reservation.update({
      where: { id },
      data: {
        status: updateDto.status,
        ...(updateDto.notes && { notes: updateDto.notes }),
      },
    });
  }
}
