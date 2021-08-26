import { IsNotEmpty, IsNumber, Min, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateBeverageOptionDto {
  @IsNotEmpty()
  @Transform(id => Number(id.value))
  @IsNumber()
  @ApiProperty()
  readonly beverageId: number;

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
}
