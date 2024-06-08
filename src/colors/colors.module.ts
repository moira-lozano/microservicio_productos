import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './colors.model';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorsService],
  controllers: [ColorsController]
})
export class ColorsModule {}
