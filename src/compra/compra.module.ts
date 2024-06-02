import { Module } from '@nestjs/common';
import { Compra } from "./compra.model";
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compra])
  ],
  providers: [CompraService],
  controllers: [CompraController]
})
export class CompraModule {
  id: number;
  date: Date;
  total: number;
  supplier_id: number;
}
