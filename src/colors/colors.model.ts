import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("colors")
export class Color {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
