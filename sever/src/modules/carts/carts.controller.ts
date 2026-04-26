import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
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
  create(@Body() createCartDto: CreateCartDto, @Request() req) {
    return this.cartsService.create({
      ...createCartDto,
      userId: req.user.userId,
    });
  }

  @Get()
  findCurrentUserCart(@Request() req) {
    return this.cartsService.findByUser(req.user.userId);
  }

  @Get(':userId')
  findByUser(@Request() req) {
    return this.cartsService.findByUser(req.user.userId);
  }

  @Get('find/:userId/:gameId')
  findCartItem(
    @Param('gameId') gameId: string,
    @Request() req,
  ) {
    return this.cartsService.findCartItem(req.user.userId, gameId);
  }

  @Delete('all/:userId')
  removeAllFromCart(@Request() req) {
    return this.cartsService.removeAllFromCart(req.user.userId);
  }

  @Delete(':userId/:gameId')
  removeGameFromCart(
    @Param('gameId') gameId: string,
    @Request() req,
  ) {
    return this.cartsService.removeGameFromCart(req.user.userId, gameId);
  }
}
