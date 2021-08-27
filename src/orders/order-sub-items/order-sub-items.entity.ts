import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';
import { OrderItem } from '../order-items/order-item.entity';
import { BeverageOption } from 'src/beverages/beverage-options/beverage-option.entity';

@Entity()
export class OrderSubItem extends ManagedEntity {
  @ManyToOne(
    type => OrderItem,
    orderItem => orderItem.orderSubItems,
  )
  orderItem: OrderItem;

  @ManyToOne(
    type => BeverageOption,
    beverageOption => beverageOption.orderSubItems,
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'beverageOptionId' })
  beverageOption: BeverageOption;

  @Column()
  beverageOptionId: number;
}
