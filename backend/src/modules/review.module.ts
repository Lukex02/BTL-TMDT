import { Module } from '@nestjs/common';
import { ReviewController } from '../controllers/review.controller';
import { ReviewService } from '../services/review.service';
import { SupabaseModule } from 'src/database/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
