import { Controller, Post, Body } from '@nestjs/common';
import { MigracionService } from './migracion.service';

@Controller('migracion')
export class MigracionController {
  constructor(private readonly migracionService: MigracionService) {}

  @Post('datos')
  async migrarDatos(@Body() data: any[]): Promise<void> {
    await this.migracionService.migrarDatos(data);
  }
}

