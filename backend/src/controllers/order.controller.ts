import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { OrderDto } from 'src/dtos/order';
import { OrderService } from 'src/services/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('byId/:orderId')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiParam({ name: 'orderId', type: String, example: '1' })
  async getById(@Param('orderId') orderId: string) {
    return await this.orderService.getById(orderId);
  }

  @Get('byBuyer/:userId')
  @ApiOperation({ summary: 'Get orders by user buyer' })
  @ApiParam({ name: 'userId', type: String, example: '1' })
  async getByUserBuyer(@Param('userId') userId: string) {
    return await this.orderService.getByUserBuyer(userId);
  }

  @Get('bySeller/:userId')
  @ApiOperation({ summary: 'Get orders by user seller' })
  @ApiParam({ name: 'userId', type: String, example: '1' })
  async getByUserSeller(@Param('userId') userId: string) {
    return await this.orderService.getByUserSeller(userId);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create order' })
  async create(@Body() create: OrderDto) {
    return await this.orderService.createOrder(create);
  }

  @Patch('update/:orderId/:status')
  @ApiOperation({ summary: 'Update order' })
  async update(@Param('orderId') orderId: number, @Param('status') status: string) {
    return await this.orderService.updateOrderStatus(orderId, status);
  }
}
