import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { PurchaseDetailService } from "./purchase_detail.service";
import { PurchaseDetail } from "./purchase_detail.model";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Compra-detalle')
@Controller('compra-detalle')
export class PurchaseDetailController {
    constructor (private compraDetalleService: PurchaseDetailService) {}

    @Get()
    async findAll(): Promise<PurchaseDetail[]> {
      return this.compraDetalleService.findAll();
    }    

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PurchaseDetail> {
      const compras_por_id = await this.compraDetalleService.findOne(id);
      if (!compras_por_id) {
        throw new NotFoundException("Purchase details do not exist");
      }
      return compras_por_id;
    }
  
    @Post()
    async create(@Body() purchase: PurchaseDetail): Promise<PurchaseDetail> {
      return this.compraDetalleService.create(purchase);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() purchase: PurchaseDetail): Promise<PurchaseDetail | null> {
      const updatedPurchaseDetail = this.compraDetalleService.update(id, purchase);
      return updatedPurchaseDetail !== null ? updatedPurchaseDetail : null;
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
