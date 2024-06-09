import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.model';


@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService],
  exports: [ProductService, TypeOrmModule], 
})
export class ProductModule {
  id: number = 0;
  code:string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  stock: number = 0;
  image: string = '';
  brand_id: number = 0;
  size_id: number = 0;
  color_id: number = 0;
  model_id: number = 0;
}
