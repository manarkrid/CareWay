import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async saveResetToken(userId: number, token: string | null, expiry: Date | null): Promise<void> {
    await this.usersRepository.update(userId, { resetToken: token, resetTokenExpiry: expiry });
  }

  async findByResetToken(token: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { resetToken: token } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async getProfile(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');
    // Exclude password from response
    const { password, ...profile } = user;
    return profile;
  }

  async updateProfile(id: number, updateData: Partial<User>): Promise<Omit<User, 'password'>> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    await this.usersRepository.update(id, updateData);
    return this.getProfile(id);
  }
}
