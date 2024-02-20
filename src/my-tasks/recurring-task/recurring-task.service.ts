import { Injectable } from '@nestjs/common';
import { CreateRecurringTaskDto } from './dto/create-recurring-task.dto';
import { UpdateRecurringTaskDto } from './dto/update-recurring-task.dto';

@Injectable()
export class RecurringTaskService {
  create(createRecurringTaskDto: CreateRecurringTaskDto) {
    return 'This action adds a new recurringTask';
  }

  findAll() {
    return `This action returns all recurringTask`;
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
