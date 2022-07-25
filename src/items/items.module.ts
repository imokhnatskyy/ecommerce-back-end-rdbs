import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemController } from './items.controller';
import { Item } from './items.model';
import { ItemService } from './items.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [SequelizeModule.forFeature([Item])],
  exports: [ItemService],
})
export class ItemModule {}
