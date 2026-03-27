import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SupabaseAuthGuard } from 'src/common/guards/supabase.guard';
import { UserDto } from 'src/dtos/user';
import { UserService } from 'src/services/user.service';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: '2964de3d-1202-4131-8f47-1b6c14e150aa',
  })
  async getById(@Param('userId') userId: string) {
    return await this.userService.getById(userId);
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Get user by username' })
  @ApiParam({ name: 'username', type: String, example: 'NgVanA' })
  async getByUsername(@Param('username') username: string) {
    return await this.userService.getByUsername(username);
  }

  @UseGuards(SupabaseAuthGuard)
  @Get('role/:role')
  @ApiOperation({ summary: 'Get user by role' })
  @ApiParam({ name: 'role', type: String, example: 'customer' })
  async getByRole(@Param('role') role: string) {
    return await this.userService.getByRole(role);
  }

  @UseGuards(SupabaseAuthGuard)
  @Put('update')
  @ApiOperation({ summary: 'Update user' })
  async update(@Body() update: UserDto) {
    return await this.userService.updateUser(update);
  }

  @UseGuards(SupabaseAuthGuard)
  @Delete('delete/:userId')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: 'd93bb379-b78f-4ce0-aa8c-90539aa6330d',
  })
  async delete(@Param('userId') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
