import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, In } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { Beverage } from './beverage.entity';
import { CreateBeverageDto } from './dto/create-beverage.dto';
import { UpdateBeverageDto } from './dto/update-beverage.dto';
import { BeverageQueryDto } from './dto/beverage-query.dto';

@Injectable()
export class BeveragesService {
  constructor(
    @InjectRepository(Beverage)
    private readonly beverageRepository: Repository<Beverage>,
  ) {}

  async create(createBeverageDto: CreateBeverageDto) {
    const beverage = await this.beverageRepository.findOne({
      name: createBeverageDto.name,
    });

    if (beverage) {
      throw new HttpException(
        'Beverage Name Duplicate',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.beverageRepository.save({ ...createBeverageDto });
  }

  async findAll(
    query: BeverageQueryDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Beverage>> {
    const beverages = this.beverageRepository.createQueryBuilder('beverages');
    if (query.search) {
      beverages.andWhere(' beverages.name like :search', {
        search: `%${query.search}%`,
      });
    }
    beverages.orderBy('beverages.id', query.orderType);

    return paginate<Beverage>(beverages, options);
  }

  async findOne(id: number) {
    return this.beverageRepository.findOneOrFail(id, {
      relations: ['beverageOptions'],
    });
  }

  async updateOne(id: number, updateBeverageDto: UpdateBeverageDto) {
    const beverage = await this.beverageRepository.findOneOrFail(id, {
      relations: ['beverageOptions'],
    });

    return this.beverageRepository.save({ ...beverage, ...updateBeverageDto });
  }

  async deleteOne(id: number) {
    return this.beverageRepository.softDelete(id);
  }
}
