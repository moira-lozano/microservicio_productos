import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Purchases {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date; 

  @Column('real')
  total: number;

  @Column()
  supplier_id: number;
}