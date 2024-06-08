import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("models")
export class Model {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
