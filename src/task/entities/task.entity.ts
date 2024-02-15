import { Project } from 'src/project/entities/project.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import DefaultEntity from 'src/utils/entity/default.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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
  tags: Tag[];
}
