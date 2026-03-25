import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class ReviewService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase) {}

}