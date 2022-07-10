import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/categories/categories.model';
import { Item } from 'src/items/items.model';
import { Product } from 'src/products/products.model';
import { Card } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  static createCard: any;
  constructor(@InjectModel(Card) private cardRepository: typeof Card) {}

  async createCard(dto: CreateCardDto): Promise<Card> {
    const card = await this.cardRepository.create(dto);
    return card;
  }

  async getCardById(id: string) {
    const cardId = Number(id);
    const card = await Item.findAll({
      where: { cardId },
      include: [
        {
          model: Product,
          include: [{ model: Category }],
        },
      ],
    });
    console.log('Card: ', card);
    return card;
  }
}
