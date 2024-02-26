import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`유저정보를 가져오지 못했습니다.`);
    }
    return user;
  }
  async findAndCreateUser(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      const newUser = this.usersRepository.create({ id: id, ...dto });
      return await this.usersRepository.save(newUser);
    }
    return user;
  }
}
