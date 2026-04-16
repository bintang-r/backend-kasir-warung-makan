import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '@prisma/client';

@Controller('menus')
export class MenusController {
  constructor(private menusService: MenusService) {}

  @Get()
  async findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.menusService.findOne(BigInt(id));
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() body: any) {
    const { id, ...rest } = body;
    return this.menusService.create({
      ...rest,
      categoryId: BigInt(rest.categoryId),
    });
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() body: any) {
    const { id: _id, ...rest } = body;
    return this.menusService.update(BigInt(id), {
      ...rest,
      categoryId: rest.categoryId ? BigInt(rest.categoryId) : undefined,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return this.menusService.remove(BigInt(id));
  }
}
