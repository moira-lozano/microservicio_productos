import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductoService } from "./producto.service";
import { Producto } from './producto.model';

@Controller('producto')
export class ProductoController {
    constructor (private productosService: ProductoService) {}

    @Get('/ver')
    async findAll(): Promise<Producto[]> {
      return this.productosService.findAll();
    }    
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Producto> {
      const productos_por_id = await this.productosService.findOne(id);
      if (!productos_por_id) {
        throw new NotFoundException("This product does not exist");
      }
      return productos_por_id;
    }
  
    @Post('/crear')
    async create(@Body() product: Producto): Promise<Producto> {
      return this.productosService.create(product);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() product: Producto): Promise<Producto> {
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
