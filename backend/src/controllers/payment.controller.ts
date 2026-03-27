import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from 'src/services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
}
