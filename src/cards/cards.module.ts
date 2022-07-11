import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardsController } from './cards.controller';
import { Card } from './cards.model';
import { CardsService } from './cards.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [SequelizeModule.forFeature([Card])],
})
export class CardsModule {}
