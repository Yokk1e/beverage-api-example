import {
  IsNotEmpty,
  Length,
  IsString,
  IsNumber,
  Min,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { BuildBeverageOption } from './build-beverage-option.dto';

export class UpdateBeverageDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @Transform(price => Number(price.value))
  @IsNumber()
  @Min(0)
  @ApiProperty()
  readonly price: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BuildBeverageOption)
  @ApiPropertyOptional({ type: [BuildBeverageOption] })
  readonly beverageOptions: BuildBeverageOption[];
}
