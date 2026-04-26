import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as qs from 'qs';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaymentService {
  constructor(
    private configService: ConfigService,
    private ordersService: OrdersService,
  ) {}

  createPaymentUrl(amount: number, ipAddr: string, orderInfo: string) {
    const tmnCode = this.configService.get<string>('VNPAY_TMNCODE') as string;
    const secretKey = this.configService.get<string>(
      'VNPAY_SECRETKEY',
    ) as string;
    const vnpUrl = this.configService.get<string>('VNPAY_URL') as string;
    const returnUrl = this.configService.get<string>(
      'VNPAY_RETURN_URL',
    ) as string;

    const date = new Date();
    const pad2 = (n: number) => (n < 10 ? '0' + n : n.toString());
    const createDate = `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}${pad2(date.getHours())}${pad2(date.getMinutes())}${pad2(date.getSeconds())}`;
    const orderId = `${pad2(date.getDate())}${pad2(date.getHours())}${pad2(date.getMinutes())}${pad2(date.getSeconds())}`;

    let vnp_Params: any = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    vnp_Params = this.sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    const paymentUrl =
      vnpUrl + '?' + qs.stringify(vnp_Params, { encode: false });
    return { paymentUrl };
  }

  async vnpayReturn(vnp_Params: any) {
    const secretKey = this.configService.get<string>(
      'VNPAY_SECRETKEY',
    ) as string;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = this.sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      const rspCode = vnp_Params['vnp_ResponseCode'];
      const orderId = vnp_Params['vnp_OrderInfo'];
      if (orderId) {
        await this.ordersService.updateStatusFromPayment(
          orderId,
          rspCode === '00' ? 'paid' : 'failed',
        );
      }
      return { success: true, rspCode };
    } else {
      return { success: false, rspCode: '97', message: 'Checksum failed' };
    }
  }

  private sortObject(obj: any) {
    const sorted: any = {};
    const str: string[] = [];
    let key;
    for (key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }
}
