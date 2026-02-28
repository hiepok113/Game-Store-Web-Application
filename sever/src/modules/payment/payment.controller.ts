import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create_payment_url')
  createPaymentUrl(
    @Body() body: { amount: number; orderInfo: string },
    @Req() req: any,
  ) {
    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.connection?.socket?.remoteAddress ||
      '127.0.0.1';

    return this.paymentService.createPaymentUrl(
      body.amount,
      ipAddr,
      body.orderInfo,
    );
  }

  @Get('vnpay_return')
  vnpayReturn(@Query() query: any) {
    return this.paymentService.vnpayReturn(query);
  }
}
