import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'password' })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
