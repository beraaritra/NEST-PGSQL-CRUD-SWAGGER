/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async signup(userDto: Partial<User>): Promise<User> { 
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = this.userRepository.create({ ...userDto, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Return user details, excluding the password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  }

  async getProfile(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: number, userDto: Partial<User>): Promise<User> {
    const user = await this.getProfile(id);
    Object.assign(user, userDto);
    return this.userRepository.save(user as User); // Cast needed because password is omitted
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }
}
