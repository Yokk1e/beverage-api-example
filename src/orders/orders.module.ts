import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { Order } from './orders/order.entity';
import { Beverage } from 'src/beverages/beverages/beverage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beverage, Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
