import { UserNestedDto } from "./user";


export class ProductDto {
  id: number;
  seller: UserNestedDto;
  name: string;
  description?: string;
  categories?: string[];
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'discontinued';
  attributes?: ProductAttributeDto[];
  images?: ProductImageDto[];
  createdAt: Date;
  updatedAt: Date;
}

export class ProductAttributeDto {
  attributeName: string;
  attributeValue: string;
}

export class ProductImageDto {
  url: string;
  isMain: boolean;
  createdAt: Date;
}

export class DiscountDto {
  id?: number;
  productId?: number; // null for global discount
  categoryId?: number;
  percentage?: number; // 0-100
  fixedAmount?: number;
  startAt: Date;
  endAt: Date;
  active: boolean;
}