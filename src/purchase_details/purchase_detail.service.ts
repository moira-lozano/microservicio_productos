import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PurchaseDetail } from "./purchase_detail.model";

@Injectable()
export class PurchaseDetailService {
    constructor(
        @InjectRepository(PurchaseDetail) 
        private readonly purchaseDetailsRepository: Repository<PurchaseDetail>,
        private readonly dataSource: DataSource
      ) {}

      async migrarDatosCompra(data: any[]): Promise<void> {

        if (!Array.isArray(data)) {
          throw new Error('Los datos deben ser un array');
        }
      
        // Iterar sobre los datos y guardarlos en la base de datos
        for (const item of data) {
          const compra_detalle = new PurchaseDetail();
          compra_detalle.quantity = item.quantity;
          compra_detalle.price = item.price;
          compra_detalle.total = item.total;
          compra_detalle.purchase_id = item.purchase_id;
          compra_detalle.product_id = item.product_id;
      
          await this.purchaseDetailsRepository.save(compra_detalle);
        }
      }

      async findAll(): Promise<PurchaseDetail[]> { 
        return await this.purchaseDetailsRepository.find();
      }

      async findOne(id: number): Promise<PurchaseDetail | null> {
        const compraDetalles = await this.purchaseDetailsRepository.findOne({ where: { id } });
        return compraDetalles || null;
      }
      
      async create(purchase: PurchaseDetail): Promise<PurchaseDetail> { 
        return await this.purchaseDetailsRepository.save(purchase);
      }
    
      async update(id: number, purchase: PurchaseDetail): Promise<PurchaseDetail | null> { 
        await this.purchaseDetailsRepository.update(id, purchase);
        const updatedPurchaseDetail = await this.purchaseDetailsRepository.findOne({ where: { id } });
        return updatedPurchaseDetail || null;
      }
    
      async remove(id: number): Promise<void> {
        await this.purchaseDetailsRepository.delete(id);
      }
}
