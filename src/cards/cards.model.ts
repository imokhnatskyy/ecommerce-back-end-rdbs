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
import { User } from '../users/users.model';
import { Product } from 'src/products/products.model';
import { Item } from 'src/items/items.model';

interface CardCreationAttrs {
  userId: number;
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, CardCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Product, () => Item)
  products: Product[];
}
