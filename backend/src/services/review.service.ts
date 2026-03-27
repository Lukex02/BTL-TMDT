import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { ReviewDto } from 'src/dtos/review';
import { IReviewService } from 'src/interfaces/review.interface';
import { Review } from 'src/models/review';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  private queryReviewString = `
    id,
    user:User (
      id,
      username,
      avatar_url
    ),
    productId: product_id,
    rating,
    comment,
    createdAt: created_at
  `;
  private mapToReview(review: any): Review | null {
    return review
      ? {
          id: review.id,
          user: review.user,
          productId: review.product_id,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.created_at,
        }
      : null;
  }

  async getByUserId(userId: string) {
    const { data, error } = await this.supabase
      .from('Review')
      .select(this.queryReviewString)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data
      .map((review: any) => this.mapToReview(review))
      .filter((review: Review) => review !== null);
  }

  async getByProductId(productId: number) {
    const { data, error } = await this.supabase
      .from('Review')
      .select(this.queryReviewString)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data
      .map((review: any) => this.mapToReview(review))
      .filter((review: Review) => review !== null);
  }

  async createReview(create: ReviewDto) {
    const { data, error } = await this.supabase
      .from('Review')
      .insert({
        user_id: create.userId,
        product_id: create.productId,
        rating: create.rating,
        comment: create.comment,
      })
      .select()
      .single();
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Review created successfully' };
  }

  async updateReview(update: ReviewDto) {
    const { data, error } = await this.supabase
      .from('Review')
      .update({
        rating: update.rating,
        comment: update.comment,
      })
      .eq('id', update.id)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundException('Review not found');
    }
    return { message: 'Review updated successfully' };
  }

  async deleteReview(reviewId: number) {
    const { data, error } = await this.supabase
      .from('Review')
      .delete()
      .eq('id', reviewId);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Review deleted successfully' };
  }
}
