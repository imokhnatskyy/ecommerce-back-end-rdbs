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
  card_id: number;
  product_id: number;
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
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', unique: false })
  card_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', unique: false })
  product_id: number;
}
