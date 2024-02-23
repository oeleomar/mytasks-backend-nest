import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async findOne(id: string) {
    if (!id) throw new BadRequestException('Id não informado');

    try {
      return await this.recurringTaskRepository.findOne({
        where: { id },
        relations: ['task'],
      });
    } catch (err) {
      throw new NotFoundException('Erro ao buscar tarefa recorrente');
    }
  }

  async update(id: string, updateRecurringTaskDto: UpdateRecurringTaskDto) {
    if (!id) throw new BadRequestException('Id não informado');

    !updateRecurringTaskDto.start_date &&
      (updateRecurringTaskDto.start_date = new Date());
    !updateRecurringTaskDto.end_date &&
      (updateRecurringTaskDto.end_date = new Date());
    !updateRecurringTaskDto.recurring_type &&
      (updateRecurringTaskDto.recurring_type = 'diário');

    try {
      return await this.recurringTaskRepository.update(
        id,
        updateRecurringTaskDto,
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro ao atualizar tarefa recorrente',
      );
    }
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException('Id não informado');

    try {
      return await this.recurringTaskRepository.delete(id);
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro ao deletar tarefa recorrente',
      );
    }
  }
}
