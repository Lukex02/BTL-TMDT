import { Controller, Post, Body } from "@nestjs/common";
import { AuthDto } from "src/models/auth";
import { AuthService } from "src/services/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('register')
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }
}