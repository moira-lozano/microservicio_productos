import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductProm } from "./product_prom.model";

@Injectable()
export class ProductPromService {
    constructor(
        @InjectRepository(ProductProm) 
        private readonly prodPromoRepository: Repository<ProductProm>,
      ) {}

      async migrarDatosPromocion(data: any[]): Promise<void> {

        if (!Array.isArray(data)) {
          throw new Error('Los datos deben ser un array');
        }
      
        // Iterar sobre los datos y guardarlos en la base de datos
        for (const item of data) {
          const producto_promo = new ProductProm();
          producto_promo.discount = item.discount;
          producto_promo.price = item.price;
          producto_promo.prom_id = item.prom_id;
          producto_promo.product_id = item.product_id;
      
          await this.prodPromoRepository.save(producto_promo);
        }
      }

      async findAll(): Promise<ProductProm[]> { 
        return await this.prodPromoRepository.find();
      }
 
      async findOne(id: number): Promise<ProductProm | null> {
        const compra = await this.prodPromoRepository.findOne({ where: { id } });
        return compra || null;
      }
      
      async create(promocion: ProductProm): Promise<ProductProm> { 
        return await this.prodPromoRepository.save(promocion);
      }
    
      async update(id: number, promocion: ProductProm): Promise<ProductProm | null> { 
        await this.prodPromoRepository.update(id, promocion);
        const updatedProductProm = await this.prodPromoRepository.findOne({ where: { id } });
        if (!updatedProductProm) {
          throw new Error(`This product promoted with ID ${id} not found`);
        }
        return updatedProductProm;
      }
    
      async remove(id: number): Promise<void> {
        await this.prodPromoRepository.delete(id);
      }
}
