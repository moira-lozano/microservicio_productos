import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.model'; 

@Injectable()
export class ProductoService {
 
  constructor(
    @InjectRepository(Producto) 
    private readonly productRepository: Repository<Producto>,
  ) {}

  async migrarDatos(data: any[]): Promise<void> {

    if (!Array.isArray(data)) {
      throw new Error('Los datos deben ser un array');
    }
  
    // Iterar sobre los datos y guardarlos en la base de datos
    for (const item of data) {
      const producto = new Producto();
      producto.code = item.code;
      producto.name = item.name;
      producto.description = item.description;
      producto.price = item.price;
      producto.stock = item.stock;
      producto.image = item.image;
      producto.brand_id = item.brand_id;
      producto.size_id = item.size_id;
      producto.color_id = item.color_id;
      producto.model_id = item.model_id;
  
      await this.productRepository.save(producto);
    }
  }

  async findAll(): Promise<Producto[]> { 
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    return await this.productRepository.findOne({ where: { id } });
  }
  
  async create(product: Producto): Promise<Producto> { 
    return await this.productRepository.save(product);
  }

  async update(id: number, product: Producto): Promise<Producto> { 
    await this.productRepository.update(id, product);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
