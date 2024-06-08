import { Module } from '@nestjs/common';
import { PurchaseDetail } from "./purchase_detail.model";
import { PurchaseDetailService } from './purchase_detail.service';
import { PurchaseDetailController } from './purchase_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/products/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseDetail]),
    ProductModule
  ],
  providers: [PurchaseDetailService],
  controllers: [PurchaseDetailController],
  exports: [PurchaseDetailService]
})
export class PurchaseDetailModule {
    id: number = 0;
    quantity: number = 0;
    price: number = 0;
    total: number = 0;
    purchase_id: number = 0;
    product_id: number = 0;

}
