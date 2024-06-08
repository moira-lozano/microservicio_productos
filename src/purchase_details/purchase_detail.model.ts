import { Purchase } from 'src/purchases/purchase.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

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

   @ManyToOne(() => Purchase, purchase => purchase.details)
   @JoinColumn({ name: 'purchase_id' })
   purchase!: Purchase;
}