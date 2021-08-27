import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';

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
  @JoinColumn({ referencedColumnName: 'id', name: 'beverageId' })
  beverage: Beverage;

  @Column()
  beverageId: number;
}
