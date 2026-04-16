import { Controller, Get, Patch, Body, Request, UseGuards, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(u => ({ ...u, id: u.id.toString() }));
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req: any) {
    const user = await this.usersService.findById(BigInt(req.user.id));
    if (!user) return null;
    return { ...user, id: user.id.toString() };
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Request() req: any, @Body() body: any) {
    const userId = BigInt(req.user.id);
    const updated = await this.usersService.updateUser(userId, body);
    return { ...updated, id: updated.id.toString() };
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() body: any) {
    const updated = await this.usersService.updateUser(BigInt(id), body);
    return { ...updated, id: updated.id.toString() };
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return this.usersService.remove(BigInt(id));
  }
}
