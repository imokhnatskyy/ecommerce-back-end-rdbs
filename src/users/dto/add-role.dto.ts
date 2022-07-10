import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'value should be string' })
  readonly value: string;
  @IsNumber({}, { message: 'value should be integer' })
  readonly userId: number;
}
