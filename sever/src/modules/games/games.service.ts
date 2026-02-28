import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './schemas/game.schema';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const newGame = new this.gameModel(createGameDto);
    return newGame.save();
  }

  async findAll(title?: string): Promise<Game[]> {
    if (title) {
      return this.gameModel
        .find({ title: { $regex: new RegExp(title, 'i') } })
        .exec();
    }
    return this.gameModel.find().exec();
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameModel.findById(id).exec();
    if (!game) {
      throw new NotFoundException(`Game ${id} not found`);
    }
    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const updatedGame = await this.gameModel
      .findByIdAndUpdate(id, updateGameDto, { new: true })
      .exec();
    if (!updatedGame) {
      throw new NotFoundException(`Game ${id} not found`);
    }
    return updatedGame;
  }

  async remove(id: string): Promise<Game> {
    const deletedGame = await this.gameModel.findByIdAndDelete(id).exec();
    if (!deletedGame) {
      throw new NotFoundException(`Game ${id} not found`);
    }
    return deletedGame;
  }
}
