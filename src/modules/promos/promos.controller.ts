import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PromosService } from './promos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('promos')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Get()
  async getActivePromos() {
    return this.promosService.getActivePromos();
  }

  // --- Admin Endpoints for Promos ---
  @Get('admin/all')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllPromos() {
    return this.promosService.findAllPromos();
  }

  @Post('admin')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createPromo(@Body() body: any) {
    const { title, description, image, isActive } = body;
    return this.promosService.createPromo({ title, description, image, isActive });
  }

  @Put('admin/:id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updatePromo(@Param('id') id: string, @Body() body: any) {
    const { title, description, image, isActive } = body;
    return this.promosService.updatePromo(BigInt(id), { title, description, image, isActive });
  }

  @Delete('admin/:id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deletePromo(@Param('id') id: string) {
    return this.promosService.deletePromo(BigInt(id));
  }

  // --- Admin Endpoints for Vouchers ---
  @Get('vouchers/admin/all')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllVouchers() {
    return this.promosService.findAllVouchers();
  }

  @Post('vouchers/admin')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createVoucher(@Body() body: any) {
    const { code, discount, expiredAt } = body;
    return this.promosService.createVoucher({ code, discount, expiredAt });
  }

  @Put('vouchers/admin/:id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateVoucher(@Param('id') id: string, @Body() body: any) {
    const { code, discount, expiredAt } = body;
    return this.promosService.updateVoucher(BigInt(id), { code, discount, expiredAt });
  }

  @Delete('vouchers/admin/:id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteVoucher(@Param('id') id: string) {
    return this.promosService.deleteVoucher(BigInt(id));
  }

  @Get('vouchers/verify/:code')
  @UseGuards(JwtAuthGuard)
  async verifyVoucher(@Param('code') code: string) {
    return this.promosService.findVoucherByCode(code);
  }
}
