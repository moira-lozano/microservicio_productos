import { Controller, Get, Param } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { Color } from './colors.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Color')
@Controller('colors')
export class ColorsController {
    constructor(private readonly colorsSerive: ColorsService) {}

    @Get()
    findAll(): Promise<Color[]> {
        return this.colorsSerive.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Color> {
        return this.colorsSerive.findOne(id);
    }
}
