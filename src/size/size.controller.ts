import { Controller, Get, Param } from '@nestjs/common';
import { SizeService } from './size.service';
import { Size } from './size.model';

@Controller('size')
export class SizeController {
    constructor(private readonly sizeService: SizeService) {}

    @Get()
    findAll(): Promise<Size[]> {
        return this.sizeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Size> {
        return this.sizeService.findOne(id);
    }
}
