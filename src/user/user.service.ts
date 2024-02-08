import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isUserExist = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (Object.keys(isUserExist).length > 0) {
      throw new BadRequestException('Usuário já cadastrado');
    }
    console.log(isUserExist);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    const user = await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    return { ...user, password: '' };
  }
}
