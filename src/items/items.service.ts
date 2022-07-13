import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './items.model';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item) private itemRepository: typeof Item) {}

  async createItem(dto: CreateItemDto) {
    const item = await Item.findOne({
      where: { card_id: dto.card_id, product_id: dto.product_id },
    });
    if (item?.id) {
      await item.update({ quantity: dto.quantity });
      return item;
    }
    return await Item.create(dto);
  }

  async getItemById(id: string) {
    const itemId = Number(id);
    const item = await Item.findByPk(itemId);
    return item;
  }

  async deleteProduct(id: string): Promise<any> {
    const itemId = Number(id);
    const item = await Item.findByPk(itemId);
    if (item) {
      await item.destroy();
    } else {
      throw new BadRequestException('no item available in card');
    }
  }
}
