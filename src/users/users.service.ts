import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Card } from 'src/cards/cards.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const isUserExist = await this.findUserByEmail(dto.email);
    if (isUserExist) {
      throw new ConflictException('User exists');
    }
    const user = await this.userRepository.create(dto);

    delete user.password;
    await Card.create({ user_id: user.id });
    delete user.password;
    return user;
  }

  async getUsers() {
    const users = await this.userRepository.findAll({
      attributes: ['id', 'email'],
    });
    return users;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async setPassword(email: string, newPassword: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (!user) throw new NotFoundException(`User ${email} not found`);

    user.password = await bcrypt.hash(newPassword, 8);

    await user.save();
    delete user.password;

    return user;
  }
}
