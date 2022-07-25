import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'computer', description: 'category name' })
  readonly category: string;
}
