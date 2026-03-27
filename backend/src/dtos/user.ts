import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({
    description: 'User ID',
    example: '2964de3d-1202-4131-8f47-1b6c14e150aa',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'NgVanA',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'Email',
    example: 'ng.van@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Role',
    example: 'customer',
    required: true,
  })
  role: 'customer' | 'seller' | 'admin';

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatarUrl?: string;

  @ApiProperty({
    description: 'User address',
    example: '123 Main St',
    required: false,
  })
  address?: string;

  @ApiProperty({
    description: 'User phone',
    example: '1234567890',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'Account created date',
    example: '1990-01-01',
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Account updated date',
    example: '1990-01-01',
    required: false,
  })
  updatedAt: Date;
}

export class UserNestedDto implements Pick<UserDto, 'id' | 'username' | 'avatarUrl'> {
  @ApiProperty({
    description: 'User ID',
    example: '2964de3d-1202-4131-8f47-1b6c14e150aa',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'NgVanA',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatarUrl?: string;
}
