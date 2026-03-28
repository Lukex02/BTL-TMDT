import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsObject, IsDateString, IsString } from 'class-validator';

export class ReviewDto {
  @ApiProperty({
    description: 'Review ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'Review user ID',
    example: 'fded0a14-b81c-4b04-952b-f09d545ad27a',
    required: true,
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    description: 'Review product ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  productId?: number;

  @ApiProperty({
    description: 'Review rating',
    example: 1,
    required: true,
  })
  @IsNumber()
  rating: 1 | 2 | 3 | 4 | 5;

  @ApiProperty({
    description: 'Review comment',
    example: 'Hiệu năng rất tốt',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    description: 'Review created at',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date;
}
