import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase) {}
}
