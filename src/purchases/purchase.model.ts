import { PurchaseDetail } from 'src/purchase_details/purchase_detail.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date; 

  @Column('real')
  total!: number;

  @Column()
  supplier_id!: number;
  
  @OneToMany(() => PurchaseDetail, detail => detail.purchase, { cascade: true })
  details!: PurchaseDetail[];
}