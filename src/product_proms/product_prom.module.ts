import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPromController } from './product_prom.controller';
import { ProductPromService } from './product_prom.service';
import { ProductProm } from './product_prom.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductProm])
  ],
  controllers: [ProductPromController],
  providers: [ProductPromService]
})
export class ProductPromModule {
  id: number = 0;
  discount: number = 0;
  price: number = 0;
  prom_id: number = 0;
  product_id: number = 0;
}
