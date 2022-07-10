import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 10, description: 'user id for card' })
  readonly userId: number;
}
