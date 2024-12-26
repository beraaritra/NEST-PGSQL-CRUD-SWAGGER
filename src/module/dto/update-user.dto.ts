/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'First name of the user', example: 'Polo' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name of the user', example: "Polo" })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Email of the user', example: 'aritrabera69@gmail.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Phone number of the user', example: '123456789' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Address of the user', example: 'AAA, BBB, CCC' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ description: 'Password of the user', minLength: 6, example: '121212' })
  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;
}
