import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { PurchasesService } from "./purchases.service";
import { Purchases } from "./purchases.model";

@Controller('Purchases')
export class PurchasesController {
    constructor (private compraService: PurchasesService) {}

    @Get()
    async findAll(): Promise<Purchases[]> {
      return this.compraService.findAll();
    }    
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Purchases> {
      const compras_por_id = await this.compraService.findOne(id);
      if (!compras_por_id) {
        throw new NotFoundException("This purchase does not exist");
      }
      return compras_por_id;
    }
  
    @Post()
    async create(@Body() purchase: Purchases): Promise<Purchases> {
      return this.compraService.create(purchase);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() purchase: Purchases): Promise<Purchases> {
      return this.compraService.update(id, purchase);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      try {
        return await this.compraService.remove(id);
      } catch (error) {
        throw new NotFoundException("This purchase does not exist");
        
      }
    }
}
