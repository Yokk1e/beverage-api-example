import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BeverageOption } from './beverage-option.entity';
import { CreateBeverageOptionDto } from './dto/create-beverage-option.dto';
import { UpdateBeverageOptionDto } from './dto/update-beverage-option.dto';

@Injectable()
export class BeverageOptionsService {
  constructor(
    @InjectRepository(BeverageOption)
    private readonly beverageOptionRepository: Repository<BeverageOption>,
  ) {}

  async create(createBeverageOptionDto: CreateBeverageOptionDto) {
    const beverageOption = await this.beverageOptionRepository.findOne({
      beverageId: createBeverageOptionDto.beverageId,
      name: createBeverageOptionDto.name,
    });

    if (beverageOption) {
      throw new HttpException(
        'BeverageOption Name Duplicate',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.beverageOptionRepository.save({ ...createBeverageOptionDto });
  }

  async findOne(id: number) {
    return this.beverageOptionRepository.findOneOrFail(id);
  }

  async updateOne(
    id: number,
    updateBeverageOptionDto: UpdateBeverageOptionDto,
  ) {
    const beverageOption = await this.beverageOptionRepository.findOneOrFail(
      id,
    );

    return this.beverageOptionRepository.save({
      ...beverageOption,
      ...updateBeverageOptionDto,
    });
  }

  async deleteOne(id: number) {
    return this.beverageOptionRepository.softDelete(id);
  }
}
