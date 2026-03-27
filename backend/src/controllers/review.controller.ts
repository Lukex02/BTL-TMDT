import { Controller, Post, Body, Get, Delete, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { ReviewDto } from 'src/dtos/review';
import { ReviewService } from 'src/services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get reviews by user id' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: 'fded0a14-b81c-4b04-952b-f09d545ad27a',
  })
  async getByUserId(@Param('userId') userId: string) {
    return await this.reviewService.getByUserId(userId);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get reviews by product id' })
  @ApiParam({ name: 'productId', type: Number, example: 1 })
  async getByProductId(@Param('productId') productId: number) {
    return await this.reviewService.getByProductId(productId);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create review' })
  async create(@Body() create: ReviewDto) {
    return await this.reviewService.createReview(create);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update review' })
  async update(@Body() update: ReviewDto) {
    return await this.reviewService.updateReview(update);
  }

  @Delete('delete/:reviewId')
  @ApiOperation({ summary: 'Delete review' })
  @ApiParam({ name: 'reviewId', type: Number, example: 1 })
  async delete(@Param('reviewId') reviewId: number) {
    return await this.reviewService.deleteReview(reviewId);
  }
}
