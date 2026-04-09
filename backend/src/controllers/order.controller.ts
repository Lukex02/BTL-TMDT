import { Controller, Post, Body, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SupabaseAuthGuard } from 'src/common/guards/supabase.guard';
import { OrderDto } from 'src/dtos/order';
import { OrderService } from 'src/services/order.service';

@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiParam({ name: 'orderId', type: String, example: '1' })
  async getById(@Param('orderId') orderId: string) {
    return await this.orderService.getById(orderId);
  }

  @Get('buyer/:userId')
  @ApiOperation({ summary: 'Get orders by user buyer' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: 'fded0a14-b81c-4b04-952b-f09d545ad27a',
  })
  async getByUserBuyer(@Param('userId') userId: string) {
    return await this.orderService.getByUserBuyer(userId);
  }

  @Get('seller/:userId')
  @ApiOperation({ summary: 'Get orders by user seller' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: '2964de3d-1202-4131-8f47-1b6c14e150aa',
  })
  async getByUserSeller(@Param('userId') userId: string) {
    return await this.orderService.getByUserSeller(userId);
  }

  @UseGuards(SupabaseAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create order' })
  async create(@Body() create: OrderDto) {
    return await this.orderService.createOrder(create);
  }

  @UseGuards(SupabaseAuthGuard)
  @Patch('update/:orderId/:status')
  @ApiOperation({ summary: 'Update order' })
  async update(
    @Param('orderId') orderId: number,
    @Param('status') status: string,
  ) {
    return await this.orderService.updateOrderStatus(orderId, status);
  }
}
