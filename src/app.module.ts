import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './items/items.module';
import { Category } from './categories/categories.model';
import { Product } from './products/products.model';
import { Item } from './items/items.model';
import { Card } from './cards/cards.model';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [User, Product, Category, Item, Card],
      synchronize: true,
      autoLoadModels: true,
      /*
      local run
      dialect: 'postgres',
      host: process.env.POSTGRESS_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_NAME,
      models: [User, Product, Category, Item, Card],
      synchronize: true,
      autoLoadModels: true,
      */
    }),
    UsersModule,
    CategoriesModule,
    ProductsModule,
    CardsModule,
    AuthModule,
    ItemModule,
  ],
})
export class AppModule {}
