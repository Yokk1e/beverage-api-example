import { Entity, Column, OneToMany } from 'typeorm';

import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';
import { OrderItem } from '../order-items/order-item.entity';

@Entity()
export class Order extends ManagedEntity {
  @Column()
  totalPrice: number;

  @OneToMany(
    type => OrderItem,
    orderItem => orderItem.order,
    { cascade: true, eager: true },
  )
  orderItems: OrderItem[];
}
