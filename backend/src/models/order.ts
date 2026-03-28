import { Product } from './product';
import { UserNested } from './user';

export class OrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export class Order {
  id: number;
  user: UserNested;
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'canceled';
  phone: string;
  address: string;
  shipFee: number;
  deliveryAt: Date;
  deliveryStartAt: Date;
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItem[]; // include order items if needed
}
