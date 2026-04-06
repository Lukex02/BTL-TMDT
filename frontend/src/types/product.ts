export interface UserNested {
  id: string;
  username: string;
  avatar_url?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface ProductAttribute {
  attributeName: string;
  attributeValue: string;
}

export interface ProductImage {
  url: string;
  createdAt?: Date;
}

export interface Product {
  id: number;
  seller: UserNested;
  name: string;
  description?: string;
  category?: Category;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'discontinued';
  attributes?: ProductAttribute[];
  images?: ProductImage[];
  createdAt?: Date;
  updatedAt?: Date;
}