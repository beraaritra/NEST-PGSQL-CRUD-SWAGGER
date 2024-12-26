/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Patch, Delete, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from "@nestjs/jwt";

import {
  ApiOkResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,) { }

  @Post('signup')
  @ApiOperation({ summary: 'For Signup user' })
  @ApiCreatedResponse({ description: 'User signed up successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.signup(createUserDto);
      return { status: 'success', message: 'User signed up successfully', data: user };
    } catch (error) {
      return { status: 'error', message: 'Signup failed', error: error.message };
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'For user Login' })
  @ApiOkResponse({ description: 'User logged in successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.login(loginUserDto.email, loginUserDto.password);
      return { status: 'success', message: 'User logged in successfully', data: user };
    } catch (error) {
      return { status: 'error', message: 'Login failed', error: error.message };
    }
  }

  @Get('getAll')
  @ApiOperation({ summary: 'For Get All users' })
  @ApiOkResponse({ description: 'Users retrieved successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAllUsers() {
    try {
      const users = await this.userService.getAllUsers();
      return { status: 'success', message: 'Users retrieved successfully', data: users };
    } catch (error) {
      return { status: 'error', message: 'Failed to retrieve users', error: error.message };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'For Get user By id' })
  @ApiOkResponse({ description: 'User retrieved successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getProfile(@Param('id') id: number) {
    try {
      const user = await this.userService.getProfile(id);
      return { status: 'success', message: 'User retrieved successfully', data: user };
    } catch (error) {
      return { status: 'error', message: 'User not found', error: error.message };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'For Update user' })
  @ApiOkResponse({ description: 'User updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return { status: 'success', message: 'User updated successfully', data: user };
    } catch (error) {
      return { status: 'error', message: 'Update failed', error: error.message };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'For Delete user' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async delete(@Param('id') id: number) {
    try {
      await this.userService.delete(id);
      return { status: 'success', message: 'User deleted successfully' };
    } catch (error) {
      return { status: 'error', message: 'Delete failed', error: error.message };
    }
  }
}
