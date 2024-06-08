import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './models.model';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Model])],
    providers: [ModelsService],
    controllers: [ModelsController]
})
export class ModelsModule {}
