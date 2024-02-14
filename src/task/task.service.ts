import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    try {
      return this.taskRepository.find({ relations: ['project'] });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findOne(id: string) {
    if (!id || id === '') throw new BadRequestException('ID não enviado');

    try {
      return await this.taskRepository.findOneByOrFail({ id });
    } catch (err) {
      throw new InternalServerErrorException(
        'Não foi possível buscar o registro, tente novamente mais tarde.',
      );
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    if (!id || id === '') throw new BadRequestException('ID não enviado');
    if (Object.keys(updateTaskDto).length === 0)
      throw new BadRequestException('Corpo não enviado');

    try {
      const task = await this.taskRepository.findOneBy({ id });

      return await this.taskRepository.save({
        ...task,
        ...updateTaskDto,
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Não foi possível atualizar o registro, tente novamente mais tarde.',
      );
    }
  }

  async remove(id: string) {
    if (!id || id === '') throw new BadRequestException('ID não enviado');

    try {
      return await this.taskRepository.delete(id);
    } catch (err) {
      throw new BadRequestException(
        'Não foi possível deletar o registro, tente novamente mais tarde.',
      );
    }
  }
}
