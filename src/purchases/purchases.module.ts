import { Module } from '@nestjs/common';
import { Purchases } from "./purchases.model";
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchases])
  ],
  providers: [PurchasesService],
  controllers: [PurchasesController]
})
export class PurchasesModule {
  id: number;
  date: Date;
  total: number;
  supplier_id: number;
}
