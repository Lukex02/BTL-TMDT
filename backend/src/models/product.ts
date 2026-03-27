import { UserNested } from './user';

export class Product {
  id: number;
  seller: UserNested;
  name: string;
  description?: string;
  categoryId?: number;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'discontinued';
  attributes?: ProductAttribute[];
  images?: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
}

export class ProductAttribute {
  attributeName: string;
  attributeValue: string;
}

export class ProductImage {
  url: string;
  isMain: boolean;
  createdAt: Date;
}

export class Discount {
  id?: number;
  productId?: number; // null for global discount
  categoryId?: number; // null for global discount
  percentage?: number; // 0-100
  fixedAmount?: number;
  startAt: Date;
  endAt: Date;
  active: boolean;
}
