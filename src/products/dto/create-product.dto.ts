import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'laptop', description: 'product name' })
  readonly name: string;

  @ApiProperty({ example: 10, description: 'product price' })
  readonly price: number;

  @ApiProperty({ example: 10, description: 'available product in store' })
  readonly store: number;

  @ApiProperty({ example: 1, description: 'id of category' })
  readonly categoryId: number;
}
