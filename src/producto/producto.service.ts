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
