import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, Query } from '@nestjs/common';
import { ProductService } from "./product.service";
import { Product } from './product.model';
import { ApiTags } from '@nestjs/swagger';
import { UpdateStockDto } from './dto/update-stock.dto';

@ApiTags('Product')
@Controller('producto')
export class ProductController {
  constructor(private productosService: ProductService) { }

  @Get('/ver')
  async findAll(): Promise<Product[]> {
    return this.productosService.findAll();
  }

  @Get('/masCompradosPorTalla')
  async obtenerProductosMasCompradosPorTallas(): Promise<any[]> {
    return await this.productosService.obtenerProductosMasCompradosPorTallas();
  }

  /* PARA ESCRIBIR EL ENDPOINT EN EL NAVEGADOR ES EL SGTE: /masCompradosPorTalla?talla=S o cualquier talla de la tabla Sizes*/
  @Get('/porTallaEspecifica')
  async obtenerProductosMasCompradosPorTalla(@Query('talla') talla: string): Promise<any[]> {
    if (!talla) {
      throw new NotFoundException("La talla es requerida");
    }
    return await this.productosService.obtenerProductosMasCompradosPorTalla(talla);
  }

  @Get('/masCompradosPorFecha')
  async obtenerProductosMasCompradosPorFechas(@Query('fecha') fecha: number): Promise<any[]> {
    if (!fecha) {
      throw new NotFoundException("El año es requerido");
    }
    return await this.productosService.obtenerProductosMasCompradosPorFechas(fecha);
  }
  @Get('/masCompradosPorYear')
  async obtenerProductosMasCompradosPorAno(@Query('year') year: number): Promise<any[]> {
    if (!year) {
      throw new NotFoundException("El año es requerido");
    }
    return await this.productosService.obtenerProductosMasCompradosPorYear(year);
  }

  @Get('/masCompradosPorMarca')
  async obtenerProductosMasCompradosPorMarca(@Query('marca') marca: string): Promise<any[]> {
    if (!marca) {
      throw new NotFoundException("La marca es requerida");
    }
    return await this.productosService.obtenerProductosMasCompradosPorMarca(marca);
  }

  @Get('/masCompradosPorModelo')
  async obtenerProductosMasCompradosPorModelo(@Query('modelo') modelo: string): Promise<any[]> {
    if (!modelo) {
      throw new NotFoundException("El modelo es requerida");
    }
    return await this.productosService.obtenerProductosMasCompradosPorModelo(modelo);
  }

  @Get('/productosConPromo')
  async verProductosConPromo(): Promise<any[]> {
    return await this.productosService.verProductosEnPromocion();
  }

  @Get('/porMarca')
  async obtenerTodosProductosMasCompradosPorMarca(): Promise<any[]> {
    return await this.productosService.obtenerTodosLosProductosMasCompradosPorMarca();
  }

  @Get('/porModelo')
  async obtenerTodosProductosMasCompradosPorModelo(): Promise<any[]> {
    return await this.productosService.obtenerTodosLosProductosMasCompradosPorModelo();
  }

  @Get('/porColor')
  async obtenerTodosProductosMasCompradosPorColor(): Promise<any[]> {
    return await this.productosService.obtenerTodosLosProductosMasCompradosPorColor();
  }


  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    const productos_por_id = await this.productosService.findOne(id);
    if (!productos_por_id) {
      throw new NotFoundException("This product does not exist");
    }
    return productos_por_id;
  }

  @Get('promotion/:nombreProductoOrId')
  async verProductosEnPromocion(@Param('nombreProductoOrId') nombreProductoOrId: string) {
    const productosEnPromocion = await this.productosService.verProductosEnPromoPorNombre(nombreProductoOrId);
    if (productosEnPromocion.length === 0) {
      throw new NotFoundException(`No se encontraron promociones para el producto ${nombreProductoOrId}`);
    }
    return productosEnPromocion;
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

  @Put(':id/stock')
  async actualizarStock(
    @Param('id') id: number,
    @Body('nuevoStock') nuevoStock: number,
    @Body('nuevoPrecio') nuevoPrecio: number,
  ) {
    await this.productosService.actualizarStock(id, nuevoStock, nuevoPrecio);
    return { message: 'Stock y precio actualizados correctamente' };
  }

  @Put(':id/quantity')
  async actualizarQuantity(
    @Param('id') id: number,
    @Body('quantity') quantity: number,
    @Body('price') price: number,
  ) {
    await this.productosService.actualizarStock(id, quantity, price);
    return { message: 'Stock y precio actualizados correctamente' };
  }

  @Put(':id/incrementar-stock')
  async incrementarStock(
    @Param('id') id: number,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    await this.productosService.updateStock(id, updateStockDto.quantity);
    return { message: 'Stock incrementado correctamente' };
  }

  @Put(':id/decrementar-stock')
  async decrementarStock(
    @Param('id') id: number,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    await this.productosService.updateStock(id, -updateStockDto.quantity);
    return { message: 'Stock decrementado correctamente' };
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
