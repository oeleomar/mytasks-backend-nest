import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { RecurringTaskService } from './recurring-task.service';
import { UpdateRecurringTaskDto } from './dto/update-recurring-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('recurring-task')
@UseGuards(AuthGuard)
export class RecurringTaskController {
  constructor(private readonly recurringTaskService: RecurringTaskService) {}

  @Get()
  findAll(@Body('user_id') user_id: string) {
    return this.recurringTaskService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recurringTaskService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecurringTaskDto: UpdateRecurringTaskDto,
  ) {
    return this.recurringTaskService.update(id, updateRecurringTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurringTaskService.remove(id);
  }
}
