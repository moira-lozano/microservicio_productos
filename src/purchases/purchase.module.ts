import { Module } from '@nestjs/common';
import { Purchase } from "./purchase.model";
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseDetail } from 'src/purchase_details/purchase_detail.model';
import { PurchaseDetailModule } from 'src/purchase_details/purchase_details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, PurchaseDetail]),
    PurchaseDetailModule
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController]
})
export class PurchaseModule {
  id: number = 0;
  date: Date = new Date();
  total: number = 0;
  supplier_id: number = 0;
}
