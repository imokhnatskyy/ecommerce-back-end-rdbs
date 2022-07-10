import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../categories/categories.model';
import { Card } from 'src/cards/cards.model';
import { Item } from 'src/items/items.model';

interface ProductCreationAttrs {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '10.55', description: 'product price' })
  @Column({
    type: DataType.INTEGER,
    unique: false,
  })
  price: number;

  @ApiProperty({ example: '3', description: 'available product in store' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  stock: number;

  @ApiProperty({ example: 'Laptop', description: 'product name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsToMany(() => Card, () => Item)
  cards: Card[];
}
