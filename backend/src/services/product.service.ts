import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class ProductService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase) {}

}