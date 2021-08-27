import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, In } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Beverage } from '../../beverages/beverages/beverage.entity';

interface BuildOrder {
  totalPrice: number;
  orderItems: BuildOrderItem[];
}

interface BuildOrderItem {
  totalPrice: number;
  amount: number;
  beverageId: number;
  orderSubItems?: BuildOrderSubItem[];
}

interface BuildOrderSubItem {
  beverageOptionId: number;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Beverage)
    private readonly beverageRepository: Repository<Beverage>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const beverageIds = createOrderDto.orderItems.map(item => item.beverageId);
    const items = await this.beverageRepository.find({
      where: {
        id: In(beverageIds),
      },
      relations: ['beverageOptions'],
    });

    const order = this.buildOrder(items, createOrderDto);

    this.orderRepository.save({ ...order });
  }

  private buildOrder(
    beverages: Beverage[],
    createOrderDto: CreateOrderDto,
  ): BuildOrder {
    const orderItems: BuildOrderItem[] = createOrderDto.orderItems.map(
      orderItem => {
        const beverage = beverages.find(
          beverage => beverage.id === orderItem.beverageId,
        );
        let totalPriceSubItem = 0;
        let totalPrice = 0;
        if (orderItem.orderSubItems) {
          totalPriceSubItem = orderItem.orderSubItems
            .map(orderSubItem => {
              return beverage.beverageOptions.find(
                option => option.id === orderSubItem.beverageOptionId,
              );
            })
            .reduce((pre, cur) => pre + cur.price, 0);
        }
        totalPrice = beverage.price * orderItem.amount + totalPriceSubItem;
        return { ...orderItem, totalPrice };
      },
    );

    const totalPrice = orderItems.reduce((pre, cur) => pre + cur.totalPrice, 0);
    return { totalPrice, orderItems };
  }

  //   async updateOne(id: number) {
  //     const order = this.orderRepository.findOneOrFail(id);

  //   }

  async findOne(id: number) {
    return this.orderRepository.findOneOrFail(id);
  }

  async deleteOne(id: number) {
    const order = await this.orderRepository.findOneOrFail(id);
    return this.orderRepository.softRemove(order);
  }
}
