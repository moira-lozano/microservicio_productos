import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.model';


@Module({
  imports: [
    TypeOrmModule.forFeature([Products])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {
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
