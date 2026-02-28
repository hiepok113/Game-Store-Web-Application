import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { CreateCartDto } from './dto/cart.dto';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const existingCart = await this.cartModel.findOne({
      gameId: createCartDto.gameId,
      userId: createCartDto.userId,
    });
    if (existingCart) {
      throw new ConflictException('Game exist in cart');
    }
    const newCart = new this.cartModel(createCartDto);
    return newCart.save();
  }

  async findByUser(userId: string): Promise<Cart[]> {
    return this.cartModel.find({ userId }).exec();
  }

  async findCartItem(userId: string, gameId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId, gameId }).exec();
    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }
    return cart;
  }

  async removeGameFromCart(
    userId: string,
    gameId: string,
  ): Promise<{ message: string }> {
    const deletedCart = await this.cartModel
      .findOneAndDelete({ userId, gameId })
      .exec();
    if (!deletedCart) {
      throw new NotFoundException('Cart not found');
    }
    return { message: 'Cart deleted successfully' };
  }

  async removeAllFromCart(userId: string): Promise<{ message: string }> {
    await this.cartModel.deleteMany({ userId }).exec();
    return { message: 'Cart deleted successfully' };
  }
}
