import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseDetails } from "./purchase_details.model";

@Injectable()
export class PurchaseDetailsService {
    constructor(
        @InjectRepository(PurchaseDetails) 
        private readonly purchaseDetailsRepository: Repository<PurchaseDetails>,
      ) {}

      async migrarDatosCompra(data: any[]): Promise<void> {

        if (!Array.isArray(data)) {
          throw new Error('Los datos deben ser un array');
        }
      
        // Iterar sobre los datos y guardarlos en la base de datos
        for (const item of data) {
          const compra_detalle = new PurchaseDetails();
          compra_detalle.quantity = item.quantity;
          compra_detalle.cost = item.cost;
          compra_detalle.total = item.total;
          compra_detalle.purchase_id = item.purchase_id;
          compra_detalle.product_id = item.product_id;
      
          await this.purchaseDetailsRepository.save(compra_detalle);
        }
      }

      async findAll(): Promise<PurchaseDetails[]> { 
        return await this.purchaseDetailsRepository.find();
      }
    
      async findOne(id: number): Promise<PurchaseDetails> {
        return await this.purchaseDetailsRepository.findOne({ where: { id } });
      }
      
      async create(purchase: PurchaseDetails): Promise<PurchaseDetails> { 
        return await this.purchaseDetailsRepository.save(purchase);
      }
    
      async update(id: number, purchase: PurchaseDetails): Promise<PurchaseDetails> { 
        await this.purchaseDetailsRepository.update(id, purchase);
        return this.purchaseDetailsRepository.findOne({ where: { id } });
      }
    
      async remove(id: number): Promise<void> {
        await this.purchaseDetailsRepository.delete(id);
      }
}
