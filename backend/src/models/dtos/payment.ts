export class PaymentDto {
  id?: number;
  orderId: number;
  amount: number;
  method: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';
  status: 'pending' | 'completed' | 'failed';
  paidAt?: Date;
}
