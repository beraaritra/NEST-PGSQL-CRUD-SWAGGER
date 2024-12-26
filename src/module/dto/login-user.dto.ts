/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'Email of the user', example: 'aritrabera69@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password of the user', minLength: 6, example: '123456' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
