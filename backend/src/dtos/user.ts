import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class UserDto {
  @ApiProperty({
    description: 'User ID',
    example: 'fded0a14-b81c-4b04-952b-f09d545ad27a',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'NgVanA',
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Email',
    example: 'ng.van@gmail.com',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Role',
    example: 'customer',
    required: true,
  })
  @IsString()
  role: 'customer' | 'seller' | 'admin';

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    description: 'User address',
    example: '123 Main St',
    required: false,
  })
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'User phone',
    example: '1234567890',
    required: false,
  })
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Account created date',
    example: '1990-01-01',
    required: false,
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'Account updated date',
    example: '1990-01-01',
    required: false,
  })
  @IsDateString()
  updatedAt: Date;
}

export class UserNestedDto implements Pick<UserDto, 'id' | 'username' | 'avatarUrl'> {
  @ApiProperty({
    description: 'User ID',
    example: 'fded0a14-b81c-4b04-952b-f09d545ad27a',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'NgVanA',
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsString()
  avatarUrl?: string;
}
