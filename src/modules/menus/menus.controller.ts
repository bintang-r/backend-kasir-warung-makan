import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

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
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/menus',
      filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const { ...rest } = body;
    const imagePath = file ? `/uploads/menus/${file.filename}` : rest.image;
    
    return this.menusService.create({
      ...rest,
      price: Number(rest.price),
      isAvailable: rest.isAvailable === 'true' || rest.isAvailable === true,
      isPopular: rest.isPopular === 'true' || rest.isPopular === true,
      categoryId: BigInt(rest.categoryId),
      image: imagePath,
    });
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/menus',
      filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const { name, description, price, isAvailable, isPopular, categoryId, image } = body;
    const imagePath = file ? `/uploads/menus/${file.filename}` : image;

    return this.menusService.update(BigInt(id), {
      name,
      description,
      price: price ? Number(price) : undefined,
      image: imagePath,
      isAvailable: isAvailable !== undefined ? (isAvailable === 'true' || isAvailable === true) : undefined,
      isPopular: isPopular !== undefined ? (isPopular === 'true' || isPopular === true) : undefined,
      categoryId: categoryId ? BigInt(categoryId) : undefined,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return this.menusService.remove(BigInt(id));
  }
}
