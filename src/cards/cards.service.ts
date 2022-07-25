import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Item } from 'src/items/items.model';
import { Card } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';

interface CardResult {
  id: number;
  product_id: number;
  item_id: number;
  price: number;
  name: string;
  category: string;
  quantity: number;
  sum: number;
}

@Injectable()
export class CardsService {
  static createCard: any;
  constructor(@InjectModel(Card) private cardRepository: typeof Card) {}

  async createCard(dto: CreateCardDto): Promise<Card> {
    const card = await this.cardRepository.create(dto);
    return card;
  }

  async getCardById(id: string) {
    const userId = Number(id);
    const card: Array<CardResult> = await this.cardRepository.sequelize.query(
      `
      SELECT cards.id, items.id as item_id, products.id as product_id, products.price, products.name, categories.category, items.quantity, products.stock, (products.price*items.quantity) as sum
      FROM products
      INNER JOIN items
      ON products.id = items.product_id
      INNER JOIN cards
      ON items.card_id = cards.id
      INNER JOIN categories
      ON products.category_id = categories.id
      WHERE cards.user_id=:id
      `,
      {
        replacements: {
          id: userId,
        },
        type: sequelize.QueryTypes.SELECT,
      },
    );
    const total_price = card.reduce((acc, el): number => {
      acc += el?.sum;
      return acc;
    }, 0);
    return { card: card, total: total_price };
  }

  async cleanCard(id: string) {
    const cardId = Number(id);

    return await Item.destroy({ where: { card_id: cardId } });
  }
}
