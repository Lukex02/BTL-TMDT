import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { PaymentDto } from 'src/dtos/payment';
import { IPaymentService } from 'src/interfaces/payment.interface';
import { Payment } from 'src/models/payment';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase) {}

  private queryPaymentString = `
    id,
    order:Order (
      id,
      buyer:User (
        id,
        username,
        avatar_url
      ),
      totalAmount:total_amount
    ),
    amount,
    method,
    status,
    paidAt: paid_at
  `;

  async getById(paymentId: number) {
    const { data, error } = await this.supabase
      .from('Payment')
      .select(this.queryPaymentString)
      .eq('id', paymentId)
      .maybeSingle();
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }

  async getByOrderId(orderId: number) {
    const { data, error } = await this.supabase
      .from('Payment')
      .select(this.queryPaymentString)
      .eq('order_id', orderId)
      .order('paid_at', { ascending: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }

  async getByUserId(userId: string) {
    const { data, error } = await this.supabase
      .from('Payment')
      .select(this.queryPaymentString)
      .eq('order.buyer.id', userId)
      .order('paid_at', { ascending: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }

  async createPayment(create: PaymentDto) {
    const { data, error } = await this.supabase
      .from('Payment')
      .insert(this.mapPaymentDtoToDb(create))
      .select()
      .single();
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Payment created successfully' };
  }

  async updatePayment(update: PaymentDto) {
    const { data, error } = await this.supabase
      .from('Payment')
      .update(this.mapPaymentDtoToDb(update))
      .eq('id', update.id)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundException('Payment not found');
    }
    return { message: 'Payment updated successfully' };
  }

  async deletePayment(paymentId: number) {
    const { data, error } = await this.supabase
      .from('Payment')
      .delete()
      .eq('id', paymentId);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Payment deleted successfully' };
  }

  private mapPaymentDtoToDb(payment: PaymentDto) {
    return {
      order_id: payment.orderId,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
    };
  }
}
