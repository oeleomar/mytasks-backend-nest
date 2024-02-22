import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecurringTaskService } from './recurring-task.service';
import { CreateRecurringTaskDto } from './dto/create-recurring-task.dto';
import { UpdateRecurringTaskDto } from './dto/update-recurring-task.dto';

@Controller('recurring-task')
export class RecurringTaskController {
  constructor(private readonly recurringTaskService: RecurringTaskService) {}

  @Get()
  findAll(@Body('user_id') user_id: string) {
    return this.recurringTaskService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recurringTaskService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecurringTaskDto: UpdateRecurringTaskDto,
  ) {
    return this.recurringTaskService.update(+id, updateRecurringTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurringTaskService.remove(+id);
  }
}
