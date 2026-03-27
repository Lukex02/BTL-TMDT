import { UserNested } from './user';

export class Review {
  id: number;
  user: UserNested;
  productId: number;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  createdAt: Date;
}
