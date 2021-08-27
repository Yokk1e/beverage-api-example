import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { CreateOrderSubItemDto } from './create-order-option.dto';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @Transform(beverageId => Number(beverageId.value))
  @IsNumber()
  @ApiProperty()
  readonly beverageId: number;

  @IsNotEmpty()
  @Transform(amount => Number(amount.value))
  @IsNumber()
  @Min(0)
  @ApiProperty()
  readonly amount: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderSubItemDto)
  @ApiPropertyOptional({ type: [CreateOrderSubItemDto] })
  readonly orderSubItems: CreateOrderSubItemDto[];
}
