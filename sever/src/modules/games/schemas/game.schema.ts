import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema({ collection: 'games' })
export class Game {
  @Prop()
  title: string;

  @Prop()
  rating: number;

  @Prop()
  feature: string;

  @Prop()
  category: string;

  @Prop()
  image: string;

  @Prop()
  aboutImage: string;

  @Prop()
  description: string;

  @Prop({ type: { minimum: [String], recommended: [String] } })
  systemRequirements: { minimum: string[]; recommended: string[] };

  @Prop()
  logo: string;

  @Prop()
  price: number;
}

export const GameSchema = SchemaFactory.createForClass(Game);
