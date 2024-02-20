import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { TagsModule } from './tags/tags.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TaskModule,
    ProjectModule,
    TagsModule,
    RouterModule.register([
      { path: 'my-tasks', module: TaskModule },
      { path: 'my-tasks', module: ProjectModule },
      { path: 'my-tasks', module: TagsModule },
    ]),
  ],
})
export class MyTasksModule {}
