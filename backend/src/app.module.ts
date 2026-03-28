import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { OrderModule } from './modules/order.module';
import { PaymentModule } from './modules/payment.module';
import { ProductModule } from './modules/product.module';
import { ReviewModule } from './modules/review.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
    PaymentModule,
    ReviewModule,
  ],
})
export class AppModule {}
