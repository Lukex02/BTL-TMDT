export interface IReviewService {
    getByUserId(userId: string): Promise<any[]>;
    getByProductId(productId: number): Promise<any[]>;
    createReview(create: any): Promise<any>;
    updateReview(update: any): Promise<any>;
    deleteReview(reviewId: number): Promise<any>;
}