import { Controller, Post, Body } from '@nestjs/common';
import { ReviewService } from 'src/services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
}
