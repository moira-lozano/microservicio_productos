import { Injectable } from '@nestjs/common';
import { Size } from './size.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SizeService {
    constructor(
        @InjectRepository(Size)
        private sizeRepository: Repository<Size>,
    ) {}

    findAll(): Promise<Size[]> {
        return this.sizeRepository.find();
    }

    findOne(id: number): Promise<Size> {
        return this.sizeRepository.findOne({ where: { id } });
    }
}
