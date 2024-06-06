import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductService } from "./product.service";
import { Product } from './product.model';

@Controller('producto')
export class ProductController {
    constructor (private productosService: ProductService) {}

    @Get('/ver')
    async findAll(): Promise<Product[]> {
      return this.productosService.findAll();
    }  
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product> {
      const productos_por_id = await this.productosService.findOne(id);
      if (!productos_por_id) {
        throw new NotFoundException("This product does not exist");
      }
      return productos_por_id;
    }
  
    @Post('/crear')
    async create(@Body() product: Product): Promise<Product> {
      return this.productosService.create(product);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() product: Product): Promise<Product | null> {
      const updatedProduct = await this.productosService.update(id, product);
      return updatedProduct !== null ? updatedProduct : null;
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      try {
        return await this.productosService.remove(id);
      } catch (error) {
        throw new NotFoundException("This product does not exist");
        
      }
    }

    @Post('/mas-comprados')
    async obtenerProductosMasCompradosPorTallas(): Promise<any[]>{
      return this.productosService.obtenerProductosMasCompradosPorTallas();  
    }
}
