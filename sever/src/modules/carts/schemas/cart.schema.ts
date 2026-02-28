import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ collection: 'carts' })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string; // Storing as string or ObjectId based on validation, Mongoose handles it

  @Prop({ type: Types.ObjectId, ref: 'Game', required: true })
  gameId: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
