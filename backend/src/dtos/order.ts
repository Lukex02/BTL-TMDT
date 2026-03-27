import { Expose } from 'class-transformer';
import { ProductDto } from './product';
import { UserNestedDto } from './user';
import { IsArray, IsDateString, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({
    description: 'Order item ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'Order item product id',
    example: 1,
    required: true,
  })
  @IsObject()
  productId: number;

  @ApiProperty({
    description: 'Order item quantity',
    example: 1,
    required: true,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Order item unit price',
    example: 100,
    required: true,
  })
  @IsNumber()
  unitPrice: number
}

export class OrderDto {
  @IsNumber()
  @ApiProperty({
    description: 'Order ID',
    example: 1,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'Order user',
    example: UserNestedDto,
    required: true,
  })
  @IsObject()
  user: UserNestedDto;

  @ApiProperty({
    description: 'Order total amount',
    example: 100,
    required: true,
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    description: 'Order status',
    example: 'pending',
    required: true,
  })
  @IsString()
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'canceled';

  @ApiProperty({
    description: 'Order created at',
    required: false,
  })
  @IsDateString()
  createdAt?: Date;

  @ApiProperty({
    description: 'Order updated at',
    required: false,
  })
  @IsDateString()
  updatedAt?: Date;

  @ApiProperty({
    description: 'Order items',
    type: OrderItemDto,
    isArray: true,
    required: false,
  })
  @IsArray()
  items?: OrderItemDto[]; // include order items
}
