export class UserDto {
  id: number;
  username: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserNestedDto implements Pick<
  UserDto,
  'id' | 'username' | 'avatarUrl'
> {
    id: number;
    username: string;
    avatarUrl?: string;
}