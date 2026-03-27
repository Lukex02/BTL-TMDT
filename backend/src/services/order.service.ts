import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase) {}
}
