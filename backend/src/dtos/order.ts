import { ProductDto } from "./product";
import { UserNestedDto } from "./user";

export class OrderItemDto {
  id: number;
  product: ProductDto;
  quantity: number;
  unitPrice: number;
}

export class OrderDto {
  id: number;
  user: UserNestedDto;
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItemDto[]; // include order items if needed
}
