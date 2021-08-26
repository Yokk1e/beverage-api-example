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

import { BeveragesService } from './beverages.service';
import { CreateBeverageDto } from './dto/create-beverage.dto';
import { UpdateBeverageDto } from './dto/update-beverage.dto';
import { BeverageQueryDto } from './dto/beverage-query.dto';

@ApiTags('beverages')
@Controller('beverages')
export class BeveragesController {
  constructor(private readonly beveragesService: BeveragesService) {}

  @Post()
  create(@Body() createBeverageDto: CreateBeverageDto) {
    return this.beveragesService.create(createBeverageDto);
  }

  @Get()
  @Header('Cache-Control', 'no-cache, no-store')
  findAll(@Query() query: BeverageQueryDto) {
    const options = { limit: query.limit, page: query.page };
    return this.beveragesService.findAll(query, options);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-cache, no-store')
  findOne(@Param('id') id: number) {
    return this.beveragesService.findOne(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: number,
    @Body() updateBeverageDto: UpdateBeverageDto,
  ) {
    return this.beveragesService.updateOne(id, updateBeverageDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.beveragesService.deleteOne(id);
  }
}
