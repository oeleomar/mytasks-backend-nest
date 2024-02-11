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

    if (isUserExist !== null) {
      throw new BadRequestException('Usuário já cadastrado');
    }

    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
      const user = await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });

      return { ...user, password: '' };
    } catch (err) {
      throw new BadRequestException('Erro ao cadastrar usuário');
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    if (
      !updateUserDto.email ||
      Object.keys(updateUserDto).length === 0 ||
      (!updateUserDto.name && !updateUserDto.password)
    )
      throw new BadRequestException('Corpo é obrigatório');

    const user = await this.userRepository.findOneByOrFail({
      email: updateUserDto.email,
    });

    if (user === null) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const { name, password } = updateUserDto;

    try {
      if (!password) {
        const updatedUser = await this.userRepository.save({
          ...user,
          name,
        });
        return { ...updatedUser, password: '' };
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        const updatedUser = await this.userRepository.save({
          ...user,
          name,
          password: hashedPassword,
        });
        return { ...updatedUser, password: '' };
      }
    } catch (err) {
      throw new BadRequestException('Erro ao atualizar usuário');
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }
}
