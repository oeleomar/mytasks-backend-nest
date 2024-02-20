import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecurringTaskService } from './recurring-task.service';
import { CreateRecurringTaskDto } from './dto/create-recurring-task.dto';
import { UpdateRecurringTaskDto } from './dto/update-recurring-task.dto';

@Controller('recurring-task')
export class RecurringTaskController {
  constructor(private readonly recurringTaskService: RecurringTaskService) {}

  @Post()
  create(@Body() createRecurringTaskDto: CreateRecurringTaskDto) {
    return this.recurringTaskService.create(createRecurringTaskDto);
  }

  @Get()
  findAll() {
    return this.recurringTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recurringTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecurringTaskDto: UpdateRecurringTaskDto) {
    return this.recurringTaskService.update(+id, updateRecurringTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurringTaskService.remove(+id);
  }
}
