import { Controller, Get, Param } from '@nestjs/common';
import { ModelsService } from './models.service';
import { Model } from './models.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Model')
@Controller('models')
export class ModelsController {
    constructor(private readonly modelService: ModelsService) {}

    @Get()
    findAll(): Promise<Model[]> {
        return this.modelService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Model> {
        return this.modelService.findOne(id);
    }
}
