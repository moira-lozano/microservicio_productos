import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto])
  ],
  controllers: [ProductoController],
  providers: [ProductoService]
})
export class ProductoModule {
  id: number;
  code:string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  brand_id: number;
  size_id: number;
  color_id: number;
  model_id: number;
}
