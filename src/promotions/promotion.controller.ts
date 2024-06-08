import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { PromotionService } from "./promotion.service";
import { Promotion } from "./promotion.model";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Promotion')
@Controller('promocion')
export class PromotionController {

    constructor (private promocionService: PromotionService) {}

    @Get()
    async findAll(): Promise<Promotion[]> {
      return this.promocionService.findAll();
    }    
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Promotion> {
      const promocion_por_id = await this.promocionService.findOne(id);
      if (!promocion_por_id) {
        throw new NotFoundException("This promotion does not exist");
      }
      return promocion_por_id;
    }
  
    @Post()
    async create(@Body() purchase: Promotion): Promise<Promotion> {
      return this.promocionService.create(purchase);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() purchase: Promotion): Promise<Promotion | null> {
      const updatedPromotion = await this.promocionService.update(id, purchase);
      return updatedPromotion !== null ? updatedPromotion : null;
    }    
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      try {
        return await this.promocionService.remove(id);
      } catch (error) {
        throw new NotFoundException("This promotion does not exist");
        
      }
    }
}
