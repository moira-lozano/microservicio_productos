// producto.model.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Esta línea indica que esta clase representa una entidad en la base de datos
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;  
  
  @Column()
  name: string;

  @Column()
  description: string;

  @Column('numeric', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @Column()
  image: string;

  @Column()
  brand_id: number;

  @Column()
  size_id: number;

  @Column()
  color_id: number;

  @Column()
  model_id: number;

}
