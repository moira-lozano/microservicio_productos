import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductoService } from "./producto.service";
import { ProductoModule } from "./producto.module";
import { Producto } from './producto.model'; // Cambia esto

@Controller('producto')
export class ProductoController {
    constructor (private productosService: ProductoService) {}

    @Get()
    async findAll(): Promise<Producto[]> {
      return this.productosService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Producto> {
      return this.productosService.findOne(id);
    }
  
    @Post()
    async create(@Body() product: Producto): Promise<Producto> {
      return this.productosService.create(product);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() product: Producto): Promise<Producto> {
      return this.productosService.update(id, product);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      return this.productosService.remove(id);
    }
}
