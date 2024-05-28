import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompraDetalle } from "./compra_detalle.model";

@Injectable()
export class CompraDetalleService {
    constructor(
        @InjectRepository(CompraDetalle) 
        private readonly purchaseDetailsRepository: Repository<CompraDetalle>,
      ) {}

      async migrarDatosCompra(data: any[]): Promise<void> {

        if (!Array.isArray(data)) {
          throw new Error('Los datos deben ser un array');
        }
      
        // Iterar sobre los datos y guardarlos en la base de datos
        for (const item of data) {
          const compra_detalle = new CompraDetalle();
          compra_detalle.quantity = item.quantity;
          compra_detalle.cost = item.cost;
          compra_detalle.total = item.total;
          compra_detalle.purchase_id = item.purchase_id;
          compra_detalle.product_id = item.product_id;
      
          await this.purchaseDetailsRepository.save(compra_detalle);
        }
      }

      async findAll(): Promise<CompraDetalle[]> { 
        return await this.purchaseDetailsRepository.find();
      }
    
      async findOne(id: number): Promise<CompraDetalle> {
        return await this.purchaseDetailsRepository.findOne({ where: { id } });
      }
      
      async create(purchase: CompraDetalle): Promise<CompraDetalle> { 
        return await this.purchaseDetailsRepository.save(purchase);
      }
    
      async update(id: number, purchase: CompraDetalle): Promise<CompraDetalle> { 
        await this.purchaseDetailsRepository.update(id, purchase);
        return this.purchaseDetailsRepository.findOne({ where: { id } });
      }
    
      async remove(id: number): Promise<void> {
        await this.purchaseDetailsRepository.delete(id);
      }
}
