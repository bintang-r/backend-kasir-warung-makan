import { Controller, Get } from '@nestjs/common';
import { PromosService } from './promos.service';

@Controller('promos')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Get()
  async getActivePromos() {
    return this.promosService.getActivePromos();
  }
}
