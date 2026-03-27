import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase) {}
}
