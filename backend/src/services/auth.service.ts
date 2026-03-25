import { Injectable, Inject } from "@nestjs/common";
import { AuthDto } from "src/dtos/auth";

@Injectable()
export class AuthService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase) {}

  async login(authDto: AuthDto) {
    return { message: 'login success' };
  }

  async register(authDto: AuthDto) {
    return { message: 'register success' };
  }
}