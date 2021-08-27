import { Entity, ManyToOne, Column, JoinColumn, OneToMany } from 'typeorm';

import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';
import { Beverage } from '../beverages/beverage.entity';
import { OrderSubItem } from 'src/orders/order-sub-items/order-sub-items.entity';

@Entity()
export class BeverageOption extends ManagedEntity {
  @Column({ length: 255 })
  name: string;

  @Column()
  price: number;

  @ManyToOne(
    type => Beverage,
    beverage => beverage.beverageOptions,
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'beverageId' })
  beverage: Beverage;

  @Column()
  beverageId: number;

  @OneToMany(
    type => OrderSubItem,
    orderSubItems => orderSubItems.beverageOption,
  )
  orderSubItems: OrderSubItem[];
}
