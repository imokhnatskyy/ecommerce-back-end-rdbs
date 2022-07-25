import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductController } from './products.controller';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Product])],
  exports: [ProductsService],
})
export class ProductsModule {}
