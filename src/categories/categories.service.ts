import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const isCategoryExist = await this.categoryRepository.findOne({
      where: { category: dto.category },
    });
    if (isCategoryExist) {
      throw new ConflictException('Category exists');
    }
    const category = await this.categoryRepository.create(dto);

    return category;
  }

  async getCategooryById(id: string) {
    const categorytId = Number(id);
    const category = await this.categoryRepository.findByPk(categorytId, {
      attributes: ['id', 'category'],
    });
    return category;
  }

  async updateCategory(id: string, dto: CreateCategoryDto): Promise<Category> {
    const categorytId = Number(id);

    const category = await this.categoryRepository.findByPk(categorytId);
    if (!category) {
      throw new NotFoundException(`Category: ${dto.category} not found`);
    }

    await category.update(dto);

    return category;
  }
  async deleteCategory(id: string): Promise<any> {
    const categorytId = Number(id);

    const category = await this.categoryRepository.findByPk(categorytId);
    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
    await category.destroy();
  }

  async getAllCategory() {
    return await this.categoryRepository.findAll({
      attributes: ['id', 'category'],
    });
  }
}
