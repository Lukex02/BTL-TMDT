import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SupabaseAuthGuard } from 'src/common/guards/supabase.guard';
import { LoginDto, RefreshDto, RegisterDto, UpdatePasswordDto } from 'src/dtos/auth';
import { AuthService } from 'src/services/auth.service';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  async logout() {
    return await this.authService.logout();
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh JWT token' })
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refresh(refreshDto);
  }

  @UseGuards(SupabaseAuthGuard)
  @Post('update/password')
  @ApiOperation({ summary: "Update user's password" })
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return await this.authService.updatePassword(updatePasswordDto);
  }
}