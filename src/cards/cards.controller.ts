import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Card } from './cards.model';
import { CardsService } from './cards.service';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private cardService: CardsService) {}

  @ApiOperation({
    summary: 'Card by user id',
  })
  @ApiResponse({ status: 200, type: Card })
  @ApiParam({ name: 'id' })
  @Get('/:id')
  getCard(@Param() param: { id: string }): any {
    return this.cardService.getCardById(param.id);
  }

  @ApiOperation({
    summary: 'Clean Card by card id',
  })
  @ApiResponse({ status: 200, type: Card })
  @ApiParam({ name: 'id' })
  @Get('/clean/:id')
  cleanCard(@Param() param: { id: string }): any {
    return this.cardService.cleanCard(param.id);
  }
}
