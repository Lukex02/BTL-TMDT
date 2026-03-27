import { Type } from 'class-transformer';
import { UserNestedDto } from './user';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ProductAttributeDto {
  @IsString()
  @ApiProperty({
    description: 'Product attribute name',
    example: 'Test Attribute',
    required: true,
  })
  attributeName: string;

  @IsString()
  @ApiProperty({
    description: 'Product attribute value',
    example: 'Test Attribute Value',
    required: true,
  })
  attributeValue: string;
}

export class ProductImageDto {
  @IsString()
  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/image.jpg',
    required: true,
  })
  url: string;

  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: 'Product image created at',
    required: false,
  })
  createdAt?: Date;
}

export class CategoryDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'Category ID',
    example: '1',
    required: false,
  })
  id?: number;

  @IsString()
  @ApiProperty({
    description: 'Category name',
    example: 'Test Category',
    required: true,
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Category description',
    example: 'Test Category description',
    required: false,
  })
  description?: string;
}

export class ProductDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Product ID',
    example: 1,
    required: false,
  })
  id?: number;

  @IsObject()
  @ApiProperty({
    description: 'Seller',
    example: UserNestedDto,
    required: true,
  })
  seller: UserNestedDto;

  @IsString()
  @ApiProperty({
    description: 'Product name',
    example: 'Test Product',
    required: true,
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Product description',
    example: 'Test Product description',
    required: false,
  })
  description?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Category ID',
    example: CategoryDto,
    required: false,
  })
  category?: CategoryDto;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'Product price',
    example: 100,
    required: true,
  })
  price: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'Product stock',
    example: 100,
    required: true,
  })
  stock: number;

  @IsString()
  @ApiProperty({
    description: 'Product status',
    example: 'active',
    required: true,
  })
  status: 'active' | 'inactive' | 'discontinued';

  @IsArray()
  @ApiProperty({
    description: 'Product attributes',
    required: false,
    isArray: true,
    type: ProductAttributeDto,
  })
  attributes?: ProductAttributeDto[];

  @IsArray()
  @ApiProperty({
    description: 'Product images',
    isArray: true,
    type: ProductImageDto,
    required: false,
  })
  images?: ProductImageDto[];
  
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: 'Product created at',
    required: false,
  })
  createdAt?: Date;
  
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: 'Product updated at',
    required: false,
  })
  updatedAt?: Date;
}

export class DiscountDto {
  @Type(() => Number)
  @ApiProperty({
    description: 'Discount ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  id?: number;

  @Type(() => Number)
  @ApiProperty({
    description: 'Product ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  productId?: number; // null for global discount

  @Type(() => Number)
  @ApiProperty({
    description: 'Category ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  categoryId?: number; // null for global discount

  @Type(() => Number)
  @ApiProperty({
    description: 'Discount percentage',
    example: 10,
    required: false,
  })
  @IsOptional()
  percentage?: number; // 0-100

  @Type(() => Number)
  @ApiProperty({
    description: 'Discount fixed amount',
    example: 100,
    required: false,
  })
  @IsOptional()
  fixedAmount?: number;
  
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Discount start at',
    required: false,
  })
  startAt: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Discount end at',
    required: false,
  })
  endAt: Date;

  @IsBoolean()
  @ApiProperty({
    description: 'Discount active',
    example: true,
    required: true,
  })
  active: boolean;
}

export class ProductFilterDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sellerId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  stock?: number;
}

