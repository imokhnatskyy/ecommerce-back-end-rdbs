import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/products/products.model';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './items.model';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item) private itemRepository: typeof Item) {}

  async createItem(dto: CreateItemDto) {
    try {
      const item = await Item.findOne({
        where: { card_id: dto.card_id, product_id: dto.product_id },
      });
      const product = await Product.findByPk(dto.product_id);
      if (!product) {
        throw new BadRequestException('wrong product id');
      }
      if (product.stock < dto.quantity) {
        if (item?.id) {
          return await item.update({ quantity: product.stock });
        }
        return await Item.create({
          card_id: dto.card_id,
          product_id: dto.product_id,
          quantity: product.stock,
        });
      }
      if (item?.id) {
        return await item.update({ quantity: dto.quantity });
      }
      return await Item.create(dto);
    } catch (error) {
      console.log(`error`, error);
      throw new HttpException(error, error.code);
    }
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
