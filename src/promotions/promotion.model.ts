import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Esta línea indica que esta clase representa una entidad en la base de datos pgsql
export class Promotion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  start_date!: Date;  
  
  @Column()
  end_date!: Date;

  @Column()
  description!: string;

}
