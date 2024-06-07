import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Promotion } from "./promotion.model";

@Injectable()
export class PromotionService {
    constructor(
        @InjectRepository(Promotion) 
        private readonly promocionRepository: Repository<Promotion>,
      ) {}

      async migrarDatosPromocion(data: any[]): Promise<void> {

        if (!Array.isArray(data)) {
          throw new Error('Los datos deben ser un array');
        }
      
        // Iterar sobre los datos y guardarlos en la base de datos
        for (const item of data) {
          const promo = new Promotion();
          promo.start_date = item.start_date;
          promo.end_date = item.end_date;
          promo.description = item.description;
      
          await this.promocionRepository.save(promo);
        }
      }

      async findAll(): Promise<Promotion[]> { 
        return await this.promocionRepository.find();
      }
 
      async findOne(id: number): Promise<Promotion | null> {
        const compra = await this.promocionRepository.findOne({ where: { id } });
        return compra || null;
      }
      
      async create(promocion: Promotion): Promise<Promotion> { 
        return await this.promocionRepository.save(promocion);
      }
    
      async update(id: number, promocion: Promotion): Promise<Promotion | null> { 
        await this.promocionRepository.update(id, promocion);
        const updatedPromotion = await this.promocionRepository.findOne({ where: { id } });
        if (!updatedPromotion) {
          throw new Error(`This promotion with ID ${id} not found`);
        }
        return updatedPromotion;
      }
    
      async remove(id: number): Promise<void> {
        await this.promocionRepository.delete(id);
      }
}
