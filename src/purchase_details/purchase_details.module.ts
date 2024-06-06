import { Module } from '@nestjs/common';
import { PurchaseDetail } from "./purchase_detail.model";
import { PurchaseDetailService } from './purchase_detail.service';
import { PurchaseDetailController } from './purchase_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseDetail])
  ],
  providers: [PurchaseDetailService],
  controllers: [PurchaseDetailController]
})
export class PurchaseDetailModule {
    id: number = 0;
    quantity: number = 0;
    price: number = 0;
    total: number = 0;
    purchase_id: number = 0;
    product_id: number = 0;

}
