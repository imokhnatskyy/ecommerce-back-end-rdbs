import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
import { Category } from './categories.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [SequelizeModule.forFeature([Category])],
})
export class CategoriesModule {}
