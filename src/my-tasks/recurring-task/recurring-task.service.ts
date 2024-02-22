import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRecurringTaskDto } from './dto/create-recurring-task.dto';
import { UpdateRecurringTaskDto } from './dto/update-recurring-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecurringTask } from './entities/recurring-task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecurringTaskService {
  constructor(
    @InjectRepository(RecurringTask)
    private recurringTaskRepository: Repository<RecurringTask>,
  ) {}

  async create(createRecurringTaskDto: CreateRecurringTaskDto) {
    if (!createRecurringTaskDto.user_id)
      throw new InternalServerErrorException('Usuário não encontrado');

    try {
      return await this.recurringTaskRepository.save(createRecurringTaskDto);
    } catch (err) {
      throw new InternalServerErrorException(
        'Falha ao criar tarefa recorrente',
      );
    }
  }

  findAll(user_id: string) {
    try {
      return this.recurringTaskRepository.find({
        where: { user_id },
        relations: ['task'],
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro ao buscar tarefas recorrentes',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} recurringTask`;
  }

  update(id: number, updateRecurringTaskDto: UpdateRecurringTaskDto) {
    return `This action updates a #${id} recurringTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} recurringTask`;
  }
}
