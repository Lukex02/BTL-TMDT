export class User {
  id: string;
  username: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  avatarUrl?: string;
  session?: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expiresAt: number;
  };
  address?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserNested implements Pick<User, 'id' | 'username' | 'avatarUrl'> {
  id: string;
  username: string;
  avatarUrl?: string;
}
