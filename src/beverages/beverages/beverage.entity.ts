import { Entity, Column, OneToMany } from 'typeorm';

import { ManagedEntity } from '../../managed-entities/managed-entities/managed-entity';
import { BeverageOption } from '../beverage-options/beverage-option.entity';

@Entity()
export class Beverage extends ManagedEntity {
  @Column({ length: 255 })
  name: string;

  @Column()
  price: number;

  @OneToMany(
    type => BeverageOption,
    BeverageOption => BeverageOption.beverage,
    { cascade: true },
  )
  beverageOptions: BeverageOption[];
}
