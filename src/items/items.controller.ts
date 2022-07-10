import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './items.model';
import { ItemService } from './items.service';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: 200, type: Item })
  @Post()
  create(@Body() itemDto: CreateItemDto): Promise<Item> {
    return this.itemService.createItem(itemDto);
  }

  @ApiOperation({
    summary: 'Item by id',
  })
  @ApiResponse({ status: 200, type: Item })
  @Get()
  @ApiParam({ name: 'id' })
  getProduct(@Param() param: { id: string }): any {
    return this.itemService.getItemById(param.id);
  }

  @ApiOperation({
    summary: 'delete item',
  })
  @ApiResponse({ status: 204 })
  @Delete()
  @ApiParam({ name: 'id' })
  deleteProduct(@Param() param: { id: string }): any {
    return this.itemService.deleteProduct(param.id);
  }
}
