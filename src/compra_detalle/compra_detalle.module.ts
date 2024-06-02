import { Module } from '@nestjs/common';
import { CompraDetalle } from "./compra_detalle.model";
import { CompraDetalleService } from './compra_detalle.service';
import { CompraDetalleController } from './compra_detalle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompraDetalle])
  ],
  providers: [CompraDetalleService],
  controllers: [CompraDetalleController]
})
export class CompraDetalleModule {
    id: number;
    quantity: number;
    cost: number;
    total: number;
    purchase_id: number;
    product_id: number;
}
