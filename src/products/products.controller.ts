import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { Products } from './products.model';

@Controller('producto')
export class ProductsController {
    constructor (private productosService: ProductsService) {}

    @Get('/ver')
    async findAll(): Promise<Products[]> {
      return this.productosService.findAll();
    }    
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Products> {
      const productos_por_id = await this.productosService.findOne(id);
      if (!productos_por_id) {
        throw new NotFoundException("This product does not exist");
      }
      return productos_por_id;
    }
  
    @Post('/crear')
    async create(@Body() product: Products): Promise<Products> {
      return this.productosService.create(product);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() product: Products): Promise<Products> {
      return this.productosService.update(id, product);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      try {
        return await this.productosService.remove(id);
      } catch (error) {
        throw new NotFoundException("This product does not exist");
        
      }
    }
}
