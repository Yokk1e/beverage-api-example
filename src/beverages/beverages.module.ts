import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeveragesService } from './beverages/beverages.service';
import { BeveragesController } from './beverages/beverages.controller';
import { Beverage } from './beverages/beverage.entity';
import { BeverageOptionsController } from './beverage-options/beverage-options.controller';
import { BeverageOptionsService } from './beverage-options/beverage-options.service';
import { BeverageOption } from './beverage-options/beverage-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beverage, BeverageOption])],
  providers: [BeveragesService, BeverageOptionsService],
  controllers: [BeveragesController, BeverageOptionsController],
})
export class BeveragesModule {}
