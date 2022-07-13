import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: 1, description: 'quantity of product inside card' })
  readonly quantity: number;

  @ApiProperty({ example: 10, description: 'card id' })
  readonly card_id: number;

  @ApiProperty({ example: 10, description: 'product id' })
  readonly product_id: number;
}
