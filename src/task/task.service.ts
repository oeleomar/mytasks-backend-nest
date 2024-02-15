import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

  async create(createTaskDto: CreateTaskDto) {
    !createTaskDto.due_date && (createTaskDto.due_date = new Date());
    !createTaskDto.status && (createTaskDto.status = 'pendente');
    !createTaskDto.priority && (createTaskDto.priority = 'media');

    try {
      return await this.taskRepository.save(createTaskDto);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Erro ao criar tarefa, tente novamente mais tarde',
      );
    }
  }

  findAll() {
    try {
      return this.taskRepository.find({ relations: ['project', 'tags'] });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findOne(id: string) {
    if (!id || id === '') throw new BadRequestException('ID não enviado');

    try {
      return await this.taskRepository.findOneOrFail({
        where: { id },
        relations: ['project', 'tags'],
      });
    } catch (err) {
      throw new NotFoundException(
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
