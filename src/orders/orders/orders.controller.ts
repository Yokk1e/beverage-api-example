import {
  Body,
  Controller,
  Post,
  Get,
  Header,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';

import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-cache, no-store')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

//   @Patch(':id')
//   updateOne(@Param('id') id: number) {}

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.ordersService.deleteOne(id);
  }
}
