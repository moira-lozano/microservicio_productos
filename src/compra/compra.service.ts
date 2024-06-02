import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from "./compra.model";

@Injectable()
export class CompraService {
    constructor(
        @InjectRepository(Compra) 
        private readonly purchaseRepository: Repository<Compra>,
      ) {}

      async migrarDatosCompra(data: any[]): Promise<void> {

        if (!Array.isArray(data)) {
          throw new Error('Los datos deben ser un array');
        }
      
        // Iterar sobre los datos y guardarlos en la base de datos
        for (const item of data) {
          const compra = new Compra();
          compra.date = item.date;
          compra.total = item.total;
          compra.supplier_id = item.supplier_id;
      
          await this.purchaseRepository.save(compra);
        }
      }

      async findAll(): Promise<Compra[]> { 
        return await this.purchaseRepository.find();
      }
    
      async findOne(id: number): Promise<Compra> {
        return await this.purchaseRepository.findOne({ where: { id } });
      }
      
      async create(purchase: Compra): Promise<Compra> { 
        return await this.purchaseRepository.save(purchase);
      }
    
      async update(id: number, purchase: Compra): Promise<Compra> { 
        await this.purchaseRepository.update(id, purchase);
        return this.purchaseRepository.findOne({ where: { id } });
      }
    
      async remove(id: number): Promise<void> {
        await this.purchaseRepository.delete(id);
      }
}
