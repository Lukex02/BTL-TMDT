import { Controller, Post, Body, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { PaymentDto } from 'src/dtos/payment';
import { PaymentService } from 'src/services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get(':paymentId')
  @ApiOperation({ summary: 'Get payment by id' })
  @ApiParam({ name: 'paymentId', type: Number, example: 1 })
  async getById(@Param('paymentId') paymentId: number) {
    return await this.paymentService.getById(paymentId);
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get payment by order id' })
  @ApiParam({ name: 'orderId', type: Number, example: 1 })
  async getByOrderId(@Param('orderId') orderId: number) {
    return await this.paymentService.getByOrderId(orderId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get payment by user id' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: 'fded0a14-b81c-4b04-952b-f09d545ad27a',
  })
  async getByUserId(@Param('userId') userId: string) {
    return await this.paymentService.getByUserId(userId);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create payment' })
  async create(@Body() create: PaymentDto) {
    return await this.paymentService.createPayment(create);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update payment' })
  async update(@Body() update: PaymentDto) {
    return await this.paymentService.updatePayment(update);
  }

  @Delete('delete/:paymentId')
  @ApiOperation({ summary: 'Delete payment' })
  @ApiParam({ name: 'paymentId', type: Number, example: 1 })
  async delete(@Param('paymentId') paymentId: number) {
    return await this.paymentService.deletePayment(paymentId);
  }
}
