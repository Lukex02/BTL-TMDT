import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserDto } from 'src/dtos/user';
import { IUserService } from 'src/interfaces/user.interface';
import { User } from 'src/models/user';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase) {}

  async getAll() {
    const { data, error } = await this.supabase
      .from('User')
      .select()
      .order('created_at', { ascending: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data.map((user: any) => this.mapToUser(user));
  }

  async getById(userId: string) {
    const { data, error } = await this.supabase
      .from('User')
      .select()
      .eq('id', userId)
      .single();
    if (error) {
      throw new BadRequestException(error.message);
    }
    return this.mapToUser(data);
  }

  async getByUsername(username: string) {
    const { data, error } = await this.supabase
      .from('User')
      .select()
      .eq('username', username)
      .single();
    if (error) {
      throw new BadRequestException(error.message);
    }
    return this.mapToUser(data);
  }

  async getByRole(role: string) {
    const { data, error } = await this.supabase
      .from('User')
      .select()
      .eq('role', role)
      .order('created_at', { ascending: false });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data.map((user: any) => this.mapToUser(user));
  }

  async updateUser(update: UserDto) {
    const { data, error } = await this.supabase
      .from('User')
      .update(this.mapUserDtoToDb(update))
      .eq('id', update.id)
      .select();
    if (error) {
      throw new BadRequestException(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundException('User not found or no permission');
    }
    return { message: 'User updated successfully' };
  }

  async deleteUser(userId: string) {
    const { data, error } = await this.supabase
      .from('User')
      .delete()
      .eq('id', userId);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return { message: 'User deleted successfully' };
  }

  private mapToUser(user: any): User | null {
    return user
      ? {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatar_url,
          address: user.address,
          phone: user.phone,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        }
      : null;
  }

  private mapUserDtoToDb(user: UserDto) {
    return {
      username: user.username,
      email: user.email,
      role: user.role,
      avatar_url: user.avatarUrl,
      address: user.address,
      phone: user.phone,
    };
  }
}
