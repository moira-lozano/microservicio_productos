import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { PurchaseDetailsService} from "./purchase_details.service";
import { PurchaseDetails } from "./purchase_details.model";

@Controller('compra-detalle')
export class PurchaseDetailsController {
    constructor (private compraDetalleService: PurchaseDetailsService) {}

    @Get()
    async findAll(): Promise<PurchaseDetails[]> {
      return this.compraDetalleService.findAll();
    }    
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PurchaseDetails> {
      const compras_por_id = await this.compraDetalleService.findOne(id);
      if (!compras_por_id) {
        throw new NotFoundException("Purchase details do not exist");
      }
      return compras_por_id;
    }
  
    @Post()
    async create(@Body() purchase: PurchaseDetails): Promise<PurchaseDetails> {
      return this.compraDetalleService.create(purchase);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() purchase: PurchaseDetails): Promise<PurchaseDetails> {
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
