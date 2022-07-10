import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Card } from '../cards/cards.model';
import { Product } from '../products/products.model';

interface ItemCreationAttrs {
  quantity: number;
  cardId: number;
  productId: number;
}

@Table({ tableName: 'items', createdAt: false, updatedAt: false })
export class Item extends Model<Item, ItemCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  @ForeignKey(() => Card)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  cardId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  productId: number;
}
