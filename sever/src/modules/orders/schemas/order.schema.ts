import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Game' }], required: true })
  items: Types.ObjectId[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 'pending', enum: ['pending', 'paid', 'failed'] })
  status: string;

  @Prop({ default: 'VNPay' })
  paymentMethod: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
