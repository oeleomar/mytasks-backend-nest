import { Project } from 'src/my-tasks/project/entities/project.entity';
import { RecurringTask } from 'src/my-tasks/recurring-task/entities/recurring-task.entity';
import { Tag } from 'src/my-tasks/tags/entities/tag.entity';
import DefaultEntity from 'src/utils/entity/default.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('users')
export class User extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @ManyToOne(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(() => RecurringTask, (recurringTask) => recurringTask.user)
  recurring_tasks: RecurringTask[];
}
