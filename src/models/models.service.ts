import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from './models.model';
import { Repository } from 'typeorm';

@Injectable()
export class ModelsService {
    constructor(
        @InjectRepository(Model)
        private modelRepository: Repository<Model>,
    ) {}

    findAll(): Promise<Model[]> {
        return this.modelRepository.find();
    }

    findOne(id: number): Promise<Model> {
        return this.modelRepository.findOne({ where: { id } });
    }
}
