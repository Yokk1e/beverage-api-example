import { Entity, ManyToOne, Column } from 'typeorm';

import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';
import { Beverage } from '../beverages/beverage.entity';

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
  beverage: Beverage;
}
