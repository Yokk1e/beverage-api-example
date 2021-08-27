import { IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class BuildBeverageOption {
  @IsOptional()
  @ApiPropertyOptional()
  readonly id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @Transform(price => Number(price.value))
  @IsNumber()
  @Min(0)
  @ApiProperty()
  readonly price: number;
}
