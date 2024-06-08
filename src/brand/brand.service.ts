import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.model';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private colorsRepository: Repository<Brand>,
    ) {}

    findAll(): Promise<Brand[]> {
        return this.colorsRepository.find();
    }

    findOne(id: number): Promise<Brand> {
        return this.colorsRepository.findOne({ where: { id } });
    }
}
