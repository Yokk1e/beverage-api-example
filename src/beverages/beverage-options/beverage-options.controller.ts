import {
  Body,
  Controller,
  Post,
  Get,
  Header,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BeverageOptionsService } from './beverage-options.service';

import { CreateBeverageOptionDto } from './dto/create-beverage-option.dto';
import { UpdateBeverageOptionDto } from './dto/update-beverage-option.dto';

@ApiTags('beverage-options')
@Controller('beverage-options')
export class BeverageOptionsController {
  constructor(
    private readonly beverageOptionsService: BeverageOptionsService,
  ) {}

  @Post()
  create(@Body() createBeverageOptionDto: CreateBeverageOptionDto) {
    return this.beverageOptionsService.create(createBeverageOptionDto);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-cache, no-store')
  findOne(@Param('id') id: number) {
    return this.beverageOptionsService.findOne(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: number,
    @Body() updateBeverageOptionDto: UpdateBeverageOptionDto,
  ) {
    return this.beverageOptionsService.updateOne(id, updateBeverageOptionDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.beverageOptionsService.deleteOne(id);
  }
}
