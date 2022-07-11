import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductsService) {}

  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 200, type: Product })
  @Post()
  create(@Body() productDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(productDto);
  }

  @ApiOperation({
    summary: 'Product list by category',
  })
  @ApiResponse({ status: 200, type: [Product] })
  @Get('/category/:id')
  @ApiParam({ name: 'id' })
  getCategoryProduct(@Param() param: { id: string }): any {
    return this.productService.getCategoryProducts(param.id);
  }

  @ApiOperation({
    summary: 'Product by id',
  })
  @ApiResponse({ status: 200, type: Product })
  @Get('/:id')
  @ApiParam({ name: 'id' })
  getProduct(@Param() param: { id: string }): any {
    return this.productService.getProductById(param.id);
  }

  @ApiOperation({
    summary: 'Products list',
  })
  @ApiResponse({ status: 200, type: [Product] })
  @Get('/list')
  getProductList(): any {
    return this.productService.getProducts();
  }

  @ApiOperation({
    summary: 'delete product',
  })
  @ApiResponse({ status: 204 })
  @Delete('/:id')
  @ApiParam({ name: 'id' })
  deleteProduct(@Param() param: { id: string }): any {
    return this.productService.deleteProduct(param.id);
  }

  @ApiOperation({
    summary: 'update product',
  })
  @ApiResponse({ status: 204 })
  @Patch('/:id')
  @ApiParam({ name: 'id' })
  updaateProduct(
    @Param() param: { id: string },
    @Body() productDto: CreateProductDto,
  ): any {
    return this.productService.updateProduct(param.id, productDto);
  }
}
