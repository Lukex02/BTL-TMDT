import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { OrderDto, OrderItemDto } from 'src/dtos/order';
import { IOrderService } from 'src/interfaces/order.interface';
import { Order } from 'src/models/order';

@Injectable()
export class OrderService implements IOrderService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  private orderQueryString = `
    id,
    totalAmount:total_amount,
    status,
    phone,
    address,
    createdAt:created_at,
    updatedAt:updated_at,
    deliveryAt:delivery_at,
    deliveryStartAt:delivery_start_at,
    shipFee:ship_fee,
    buyer:User (
      id,
      username,
      avatar_url
    ),
    items:OrderItem (
      id,
      product:Product (
        id,
        name,
        seller:User (
          id,
          username,
          avatar_url
        ),
        description,
        category:Category (
          id,
          name,
          description
        ),
        price,
        stock,
        status,
        attributes:Attribute (
          attributeName:name,
          attributeValue:value
        ),
        createdAt:created_at,
        updatedAt:updated_at
      ),
      quantity,
      unitPrice:unit_price
    )
  `;
  async getById(orderId: string) {
    const { data, error } = await this.supabase
      .from('Order')
      .select(this.orderQueryString)
      .eq('id', orderId)
      .maybeSingle();
    if (error) {
      throw new BadRequestException(error.message);
    }

    return this.mapToOrder(data);
  }

  async getByUserBuyer(userId: string) {
    const { data, error } = await this.supabase
      .from('Order')
      .select(this.orderQueryString)
      .eq('buyer.id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data.map((order: any) => this.mapToOrder(order));
  }

  async getByUserSeller(userId: string) {
    const { data, error } = await this.supabase
      .from('Order')
      .select(this.orderQueryString)
      .eq('items.product.seller.id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data.map((order: any) => this.mapToOrder(order));
  }

  async createOrder(create: OrderDto) {
    const { data: order, error: orderErr } = await this.supabase
      .from('Order')
      .insert(this.mapOrderDtoToDb(create))
      .select()
      .single();
    if (orderErr) {
      throw new BadRequestException(orderErr.message);
    }
    const orderId = order.id;
    const { data: items, error: itemErr } = await this.supabase
      .from('OrderItem')
      .insert(
        create.items?.map((item: OrderItemDto) =>
          this.mapOrderItemDtoToDb(orderId, item),
        ),
      );
    if (itemErr) {
      throw new BadRequestException(itemErr.message);
    }
    return { message: 'Order created successfully' };
  }

  async updateOrderStatus(orderId: number, status: string) {
    const { data, error } = await this.supabase
      .from('Order')
      .update({ status })
      .eq('id', orderId)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundException('Order not found');
    }
    return { message: 'Order updated successfully' };
  }

  // async cancelOrder(orderId: string) {
  //   const { data, error } = await this.supabase
  //     .from('Order')
  //     .update({ status: 'canceled' })
  //     .eq('id', orderId)
  //     .select();
  //   if (error) {
  //     throw new BadRequestException(error.message);
  //   }
  //   if (data.length === 0) {
  //     throw new NotFoundException('Order not found');
  //   }
  //   return { message: 'Order canceled successfully' };
  // }

  // async confirmOrder(orderId: string) {
  //   const { data, error } = await this.supabase
  //     .from('Order')
  //     .update({ status: 'completed' })
  //     .eq('id', orderId)
  //     .select();
  //   if (error) {
  //     throw new BadRequestException(error.message);
  //   }
  //   if (data.length === 0) {
  //     throw new NotFoundException('Order not found');
  //   }
  //   return { message: 'Order confirmed successfully' };
  // }

  async deleteOrder(orderId: string) {
    const { data, error } = await this.supabase
      .from('Order')
      .delete()
      .eq('id', orderId);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Order deleted successfully' };
  }

  private mapToOrder(order: any): Order | null {
    return order
      ? {
          id: order.id,
          user: order.buyer,
          totalAmount: order.total_amount,
          status: order.status,
          phone: order.phone,
          address: order.address,
          shipFee: order.shipFee,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          deliveryAt: order.deliveryAt,
          deliveryStartAt: order.deliveryStartAt,
          items: order.items,
        }
      : null;
  }

  private mapOrderDtoToDb(order: OrderDto) {
    return {
      buyer_id: order.userId,
      total_amount: order.totalAmount,
      status: order.status,
    };
  }

  private mapOrderItemDtoToDb(orderId: number, orderItem: OrderItemDto) {
    return {
      order_id: orderId,
      product_id: orderItem.productId,
      quantity: orderItem.quantity,
      unit_price: orderItem.unitPrice,
    };
  }
}
