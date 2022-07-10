import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Card } from './cards.model';
import { CardsService } from './cards.service';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private cardService: CardsService) {}

  @ApiOperation({
    summary: 'Card by id',
  })
  @ApiResponse({ status: 200, type: Card })
  @Get()
  @ApiParam({ name: 'id' })
  getProduct(@Param() param: { id: string }): any {
    return this.cardService.getCardById(param.id);
  }
}
