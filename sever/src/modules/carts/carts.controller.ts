import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('carts')
@UseGuards(JwtAuthGuard) // Only authenticated users can manage carts
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: string) {
    return this.cartsService.findByUser(userId);
  }

  @Get('find/:userId/:gameId')
  findCartItem(
    @Param('userId') userId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.cartsService.findCartItem(userId, gameId);
  }

  @Delete('all/:userId')
  removeAllFromCart(@Param('userId') userId: string) {
    return this.cartsService.removeAllFromCart(userId);
  }

  @Delete(':userId/:gameId')
  removeGameFromCart(
    @Param('userId') userId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.cartsService.removeGameFromCart(userId, gameId);
  }
}
