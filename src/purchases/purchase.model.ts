import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'purchases' })
export class Purchase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date; 

  @Column('real')
  total!: number;

  @Column()
  supplier_id!: number;
}