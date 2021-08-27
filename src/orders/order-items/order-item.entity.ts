import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';
import { OrderSubItem } from '../order-sub-items/order-sub-items.entity';
import { Order } from '../orders/order.entity';
import { Beverage } from 'src/beverages/beverages/beverage.entity';

@Entity()
export class OrderItem extends ManagedEntity {
  @Column()
  totalPrice: number;

  @Column()
  amount: number;

  @ManyToOne(
    type => Order,
    order => order.orderItems,
  )
  order: Order;

  @OneToMany(
    type => OrderSubItem,
    orderSubItems => orderSubItems.orderItem,
    { cascade: true, eager: true },
  )
  orderSubItems: OrderSubItem[];

  @ManyToOne(
    type => Beverage,
    beverage => beverage.orderItems,
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'beverageId' })
  beverage: Beverage;

  @Column()
  beverageId: number;
}
