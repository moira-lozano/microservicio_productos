import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Esta línea indica que esta clase representa una entidad en la base de datos pgsql
export class ProductProm {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  discount!: number;  
  
  @Column('real')
  price!: number;

  @Column()
  prom_id!: number;

  @Column()
  product_id!: number;

}
