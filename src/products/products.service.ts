import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/categories/categories.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const isProductExist = await Product.findOne({
      where: { name: dto.name },
    });
    if (isProductExist) {
      throw new ConflictException('Product exists');
    }
    return await this.productRepository.create(dto);
  }

  async getProducts() {
    const product = await Product.findAll({
      include: Category,
    });
    return product;
  }
  async getCategoryProducts(id: string) {
    const categoryId = Number(id);
    const product = await Product.findAll({
      where: { categoryId },
    });
    return product;
  }

  async getProductById(id: string) {
    const productId = Number(id);
    const product = await Product.findByPk(productId);
    return product;
  }

  async updateProduct(id: string, dto: CreateProductDto): Promise<Product> {
    const productId = Number(id);

    const product = await Product.findByPk(productId);
    if (!product)
      throw new NotFoundException(`Product ${CreateProductDto.name} not found`);

    await product.update(dto);
    await product.$set('categoryId', dto.categoryId);

    return product;
  }

  async deleteProduct(id: string): Promise<any> {
    const productId = Number(id);
    const product = await Product.findByPk(productId);
    if (product) {
      await product.destroy();
    } else {
      throw new BadRequestException('no product');
    }
  }
}
