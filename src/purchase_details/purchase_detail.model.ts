import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PurchaseDetail {
   
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   quantity!: number;

   @Column('real')
   price!: number;

   @Column('real')
   total!: number;

   @Column()
   purchase_id!: number;

   @Column()
   product_id!: number;

}