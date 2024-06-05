import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from "./purchase.model";

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(Purchase) 
        private readonly purchaseRepository: Repository<Purchase>,
      ) {}

      async migrarDatosCompra(data: any[]): Promise<void> {

        if (!Array.isArray(data)) {
          throw new Error('Los datos deben ser un array');
        }
      
        // Iterar sobre los datos y guardarlos en la base de datos
        for (const item of data) {
          const compra = new Purchase();
          compra.date = item.date;
          compra.total = item.total;
          compra.supplier_id = item.supplier_id;
      
          await this.purchaseRepository.save(compra);
        }
      }

      async findAll(): Promise<Purchase[]> { 
        return await this.purchaseRepository.find();
      }
 
      async findOne(id: number): Promise<Purchase | null> {
        const compra = await this.purchaseRepository.findOne({ where: { id } });
        return compra || null;
      }
      
      async create(purchase: Purchase): Promise<Purchase> { 
        return await this.purchaseRepository.save(purchase);
      }
    
      async update(id: number, purchase: Purchase): Promise<Purchase | null> { 
        await this.purchaseRepository.update(id, purchase);
        const updatedPurchase = await this.purchaseRepository.findOne({ where: { id } });
        return updatedPurchase || null;
      }
    
      async remove(id: number): Promise<void> {
        await this.purchaseRepository.delete(id);
      }
}
