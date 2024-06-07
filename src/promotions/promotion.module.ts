import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionController } from './promotion.controller';
import { PromotionService } from "./promotion.service";
import { Promotion } from "./promotion.model";

@Module({
  imports: [
    TypeOrmModule.forFeature([Promotion])
  ],
  controllers: [PromotionController],
  providers: [PromotionService]
})
export class PromotionModule {
  id: number = 0;
  start_date: Date = new Date();
  end_date: Date = new Date();
  description: string = '';
}
