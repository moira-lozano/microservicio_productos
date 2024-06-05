import { Module } from '@nestjs/common';
import { PurchaseDetails } from "./purchase_details.model";
import { PurchaseDetailsService } from './purchase_details.service';
import { PurchaseDetailsController } from './purchase_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseDetails])
  ],
  providers: [PurchaseDetailsService],
  controllers: [PurchaseDetailsController]
})
export class PurchaseDetailsModule {
    id: number;
    quantity: number;
    cost: number;
    total: number;
    purchase_id: number;
    product_id: number;
}
