import { UserNestedDto } from "./user";

export class ReviewDto {
  id: number;
  user: UserNestedDto;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  createdAt: Date;
}
