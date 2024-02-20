import { Project } from 'src/my-tasks/project/entities/project.entity';
import { Task } from 'src/my-tasks/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import DefaultEntity from 'src/utils/entity/default.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity('tags')
export class Tag extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  text_color: string;

  @Column()
  user_id: string;

  @ManyToMany(() => Task, (task) => task.tags)
  @JoinTable({
    name: 'tasks_tags',
    joinColumn: {
      name: 'task_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'tasks_tags_task_id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'tasks_tags_tag_id',
    },
  })
  tasks: Task[];

  @ManyToMany(() => Project, (project) => project.tags)
  @JoinTable({
    name: 'projects_tags',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'projects_tags_project_id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'projects_tags_tag_id',
    },
  })
  projects: Project[];

  @ManyToOne(() => User, (User) => User.tags)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
