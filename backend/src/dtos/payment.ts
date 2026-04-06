import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class PaymentDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Payment ID',
    example: 1,
    required: false,
  })
  id?: number;

  @IsNumber()
  @ApiProperty({
    description: 'Order ID',
    example: 1,
    required: true,
  })
  orderId: number;

  @IsNumber()
  @ApiProperty({
    description: 'Payment amount',
    example: 100,
    required: true,
  })
  amount: number;

  @IsString()
  @ApiProperty({
    description: 'Payment method',
    example: 'credit_card',
    required: true,
  })
  method: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';

  @IsString()
  @ApiProperty({
    description: 'Payment status',
    example: 'pending',
    required: true,
  })
  status: 'pending' | 'completed' | 'failed';

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Payment paid at',
    required: false,
  })
  paidAt?: Date;
}
