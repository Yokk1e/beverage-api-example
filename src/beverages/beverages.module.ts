import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeveragesService } from './beverages/beverages.service';
import { BeveragesController } from './beverages/beverages.controller';
import { Beverage } from './beverages/beverage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beverage])],
  providers: [BeveragesService],
  controllers: [BeveragesController],
})
export class BeveragesModule {}
