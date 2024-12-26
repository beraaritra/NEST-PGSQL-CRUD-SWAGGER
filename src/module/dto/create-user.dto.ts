/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user', example: 'Aritra' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: "Bera" })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email of the user', example: 'aritrabera69@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number of the user', example: '123456789' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'Address of the user', example: 'AAA, BBB, CCC' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Password of the user', minLength: 6, example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;
}
