import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { CompraDetalleService} from "./compra_detalle.service";
import { CompraDetalle } from "./compra_detalle.model";

@Controller('compra-detalle')
export class CompraDetalleController {
    constructor (private compraDetalleService: CompraDetalleService) {}

    @Get()
    async findAll(): Promise<CompraDetalle[]> {
      return this.compraDetalleService.findAll();
    }    
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<CompraDetalle> {
      const compras_por_id = await this.compraDetalleService.findOne(id);
      if (!compras_por_id) {
        throw new NotFoundException("Purchase details do not exist");
      }
      return compras_por_id;
    }
  
    @Post()
    async create(@Body() purchase: CompraDetalle): Promise<CompraDetalle> {
      return this.compraDetalleService.create(purchase);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() purchase: CompraDetalle): Promise<CompraDetalle> {
      return this.compraDetalleService.update(id, purchase);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      try {
        return await this.compraDetalleService.remove(id);
      } catch (error) {
        throw new NotFoundException("Purchase details do not exist");
        
      }
    }
}
