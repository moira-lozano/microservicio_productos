import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductPromService } from "./product_prom.service";
import { ProductProm } from "./product_prom.model";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product-Promo')
@Controller('producto-promo')
export class ProductPromController {
    constructor (private productPromo: ProductPromService) {}

    @Get()
    async findAll(): Promise<ProductProm[]> {
      return this.productPromo.findAll();
    }    
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ProductProm> {
      const producto_promo = await this.productPromo.findOne(id);
      if (!producto_promo) {
        throw new NotFoundException("This product promoted does not exist");
      }
      return producto_promo;
    }
  
    @Post()
    async create(@Body() purchase: ProductProm): Promise<ProductProm> {
      return this.productPromo.create(purchase);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() purchase: ProductProm): Promise<ProductProm | null> {
      const updatedProductProm = await this.productPromo.update(id, purchase);
      return updatedProductProm !== null ? updatedProductProm : null;
    }    
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      try {
        return await this.productPromo.remove(id);
      } catch (error) {
        throw new NotFoundException("This product promoted does not exist");
        
      }
    }
}
