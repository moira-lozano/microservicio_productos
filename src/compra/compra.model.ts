import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date; 

  @Column('real')
  total: number;

  @Column()
  supplier_id: number;
}