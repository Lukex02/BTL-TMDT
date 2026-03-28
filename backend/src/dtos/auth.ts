import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username, required if email is not provided',
    example: 'NgVanA',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'Email, required if username is not provided',
    example: 'ng.van@gmail.com',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
    required: true,
  })
  @IsString()
  password: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({
    description: 'Role',
    example: 'customer',
    required: true,
  })
  @IsString()
  role: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'New password',
    example: '123456',
    required: true,
  })
  @IsString()
  newPassword: string;
}

export class RefreshDto {
  @ApiProperty({
    description: 'Refresh token',
    required: true,
  })
  @IsString()
  refreshToken: string;
}
