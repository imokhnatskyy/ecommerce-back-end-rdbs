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
import { Category } from './categories.model';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 200, type: Category })
  @Post()
  create(@Body() categoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(categoryDto);
  }

  @ApiOperation({
    summary: 'category by id',
  })
  @ApiResponse({ status: 200, type: Category })
  @Get('/:categoryId')
  @ApiParam({ name: 'id' })
  getProduct(@Param() param: { id: string }): any {
    return this.categoryService.getCategooryById(param.id);
  }

  @ApiOperation({
    summary: 'delete category',
  })
  @ApiResponse({ status: 204 })
  @Delete('/:id')
  @ApiParam({ name: 'id' })
  deleteProduct(@Param() param: { id: string }): any {
    return this.categoryService.deleteCategory(param.id);
  }

  @ApiOperation({
    summary: 'update category',
  })
  @ApiResponse({ status: 204 })
  @Patch('/:id')
  @ApiParam({ name: 'id' })
  updaateProduct(
    @Param() param: { id: string },
    @Body() productDto: CreateCategoryDto,
  ): any {
    return this.categoryService.updateCategory(param.id, productDto);
  }
}
