import { Module } from '@nestjs/common';
import { CompraDetalleService } from './compra_detalle.service';
import { CompraDetalleController } from './compra_detalle.controller';

@Module({
  providers: [CompraDetalleService],
  controllers: [CompraDetalleController]
})
export class CompraDetalleModule {}
