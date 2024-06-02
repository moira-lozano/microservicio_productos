import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { CompraService } from "./compra.service";
import { Compra } from "./compra.model";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('compra')
@Controller('compra')
export class CompraController {
    constructor (private compraService: CompraService) {}

    @Get()
    async findAll(): Promise<Compra[]> {
      return this.compraService.findAll();
    }    
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Compra> {
      const compras_por_id = await this.compraService.findOne(id);
      if (!compras_por_id) {
        throw new NotFoundException("This purchase does not exist");
      }
      return compras_por_id;
    }
  
    @Post()
    async create(@Body() purchase: Compra): Promise<Compra> {
      return this.compraService.create(purchase);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() purchase: Compra): Promise<Compra> {
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
