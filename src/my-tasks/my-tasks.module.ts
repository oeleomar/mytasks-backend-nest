import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { TagsModule } from './tags/tags.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RecurringTaskModule } from './recurring-task/recurring-task.module';

@Module({
  imports: [
    TaskModule,
    ProjectModule,
    TagsModule,
    RecurringTaskModule,
    RouterModule.register([
      { path: 'my-tasks', module: TaskModule },
      { path: 'my-tasks', module: ProjectModule },
      { path: 'my-tasks', module: TagsModule },
      { path: 'my-tasks', module: RecurringTaskModule },
    ]),
  ],
})
export class MyTasksModule {}
