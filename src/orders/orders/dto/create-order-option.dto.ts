import { IsNotEmpty, IsNumber, Min, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateOrderSubItemDto {
  @IsNotEmpty()
  @Transform(beverageId => Number(beverageId.value))
  @IsNumber()
  @ApiProperty()
  readonly beverageOptionId: number;
}
