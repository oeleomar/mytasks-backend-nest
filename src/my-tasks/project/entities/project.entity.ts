import { Tag } from 'src/my-tasks/tags/entities/tag.entity';
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
  OneToMany,
} from 'typeorm';

@Entity('projects')
export class Project extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: 'pendente' | 'fazendo' | 'concluido' | 'cancelado';

  @Column()
  due_date: Date;

  @Column()
  priority: 'baixa' | 'media' | 'alta';

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Task, (task) => task.project, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];

  @ManyToMany(() => Tag, (tag) => tag.projects)
  tags: Tag[];
}
