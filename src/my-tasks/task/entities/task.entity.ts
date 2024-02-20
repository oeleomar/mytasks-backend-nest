import { Project } from 'src/my-tasks/project/entities/project.entity';
import { RecurringTask } from 'src/my-tasks/recurring-task/entities/recurring-task.entity';
import { Tag } from 'src/my-tasks/tags/entities/tag.entity';
import DefaultEntity from 'src/utils/entity/default.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('tasks')
export class Task extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: 'pendente' | 'fazendo' | 'concluido' | 'cancelado';

  @Column()
  priority: 'baixa' | 'media' | 'alta';

  @Column()
  due_date: Date;

  @Column()
  project_id: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToMany(() => Tag, (tag) => tag.tasks)
  tags: Tag[];

  @OneToOne(() => RecurringTask, (recurring_task) => recurring_task.task, {
    nullable: true,
  })
  @JoinColumn({ name: 'recurring_task_id' })
  recurring_task: RecurringTask;
}
