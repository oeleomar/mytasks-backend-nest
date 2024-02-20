import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { TagsModule } from './tags/tags.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TaskModule, ProjectModule, TagsModule],
  exports: [],
})
export class MyTasksModule {}
