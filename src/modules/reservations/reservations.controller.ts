import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationStatusDto } from './dto/update-reservation-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { Request } from '@nestjs/common';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Allow guests (no guard) or logged in users to create reservation
  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
    @Request() req: any,
  ) {
    const userId = req?.user?.id ? BigInt(req.user.id) : undefined;
    return this.reservationsService.create(createReservationDto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.KASIR, Role.ADMIN, Role.SUPERADMIN)
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.KASIR, Role.ADMIN, Role.SUPERADMIN)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateReservationStatusDto,
  ) {
    return this.reservationsService.updateStatus(BigInt(id), updateDto);
  }
}
