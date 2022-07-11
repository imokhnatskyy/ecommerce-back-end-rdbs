import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/categories/categories.model';
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
    const userId = Number(id);

    const card = await Card.findAll({
      where: { userId },
      attributes: ['id'],
      include: [
        {
          model: Product,
          // attributes: ['id'],
          include: [Category],
        },
      ],
    });
    console.log('Card: #########################');
    console.log('Card: ', userId);
    console.log('Id: ', card);
    return card;
  }
}
