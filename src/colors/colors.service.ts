import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './colors.model';

@Injectable()
export class ColorsService {
    constructor(
        @InjectRepository(Color)
        private colorsRepository: Repository<Color>,
    ) {}

    findAll(): Promise<Color[]> {
        return this.colorsRepository.find();
    }

    findOne(id: number): Promise<Color> {
        return this.colorsRepository.findOne({ where: { id } });
    }
}
