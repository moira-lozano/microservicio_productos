import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PurchaseDetails {
   
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   quantity: number;

   @Column('real')
   cost: number;

   @Column('real')
   total: number;

   @Column()
   purchase_id: number;

   @Column()
   product_id: number;

}