import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  LoginDto,
  RefreshDto,
  RegisterDto,
  UpdatePasswordDto,
} from 'src/dtos/auth';
import { IAuthRepository } from 'src/interfaces/auth.interface';
import { User } from 'src/models/user';

@Injectable()
export class AuthService implements IAuthRepository {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  private parseUser(cred: any, acc: any): User {
    return {
      id: cred.user.id,
      username: acc.username,
      email: cred.user.email,
      role: acc.role,
      avatarUrl: acc.avatarUrl,
      session: {
        accessToken: cred.session.access_token,
        refreshToken: cred.session.refresh_token,
        expiresIn: cred.session.expires_in,
        expiresAt: cred.session.expires_at,
      },
      createdAt: cred.user.created_at,
      updatedAt: cred.user.updated_at,
    };
  }

  async login(loginDto: LoginDto) {
    const { username, email, password } = loginDto;
    let loginEmail = email;
    const { data: account, error: errorAcc } = await this.supabase
      .from('User')
      .select()
      .eq('username', username)
      .single();
    if (errorAcc) {
      throw new BadRequestException(errorAcc.message);
    }
    if (!account) {
      throw new NotFoundException('User not found');
    }
    if (!loginEmail) loginEmail = account.email;
    const { data: signIn, error: errorSignIn } =
      await this.supabase.auth.signInWithPassword({
        email: loginEmail!,
        password,
      });
    if (errorSignIn) {
      throw new UnauthorizedException(errorSignIn.message);
    }
    if (!signIn) {
      throw new UnauthorizedException('Sign in failed');
    }
    return this.parseUser(signIn, account);
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password, role } = registerDto;
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    const { data: signUp, error: errorSignUp } =
      await this.supabase.auth.signUp({
        email,
        password,
      });
    if (errorSignUp) {
      throw new ConflictException(errorSignUp.message);
    }
    const { data: user, error: errorUser } = await this.supabase
      .from('User')
      .insert({
        id: signUp.user?.id,
        username,
        email,
        role: role,
      })
      .select()
      .single();
    if (errorUser) {
      throw new BadRequestException(errorUser.message);
    }
    return this.parseUser(signUp, user);
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Logged out' };
  }

  async refresh(refreshDto: RefreshDto) {
    const { data, error } = await this.supabase.auth.refreshSession({
      refresh_token: refreshDto.refreshToken,
    });
    if (error) {
      throw new BadRequestException(error.message);
    }
    const { data: account, error: errorAcc } = await this.supabase
      .from('User')
      .select()
      .eq('id', data.user?.id)
      .single();
    if (errorAcc) {
      throw new BadRequestException(errorAcc.message);
    }
    return this.parseUser(data, account);
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const { data, error } = await this.supabase.auth.updateUser({
      password: updatePasswordDto.newPassword,
    });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'Password updated' };
  }
}
