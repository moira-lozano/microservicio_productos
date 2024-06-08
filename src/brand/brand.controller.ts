import { Controller, Get, Param } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from './brand.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Get()
    findAll(): Promise<Brand[]> {
        return this.brandService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Brand> {
        return this.brandService.findOne(id);
    }
}
