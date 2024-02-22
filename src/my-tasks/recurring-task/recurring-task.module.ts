import { Module } from '@nestjs/common';
import { RecurringTaskService } from './recurring-task.service';
import { RecurringTaskController } from './recurring-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringTask } from './entities/recurring-task.entity';

@Module({
  controllers: [RecurringTaskController],
  providers: [RecurringTaskService],
  imports: [TypeOrmModule.forFeature([RecurringTask])],
  exports: [RecurringTaskService],
})
export class RecurringTaskModule {}
