import { Task } from 'src/task/entities/task.entity';
import DefaultEntity from 'src/utils/entity/default.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('tags')
export class Tag extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  text_color: string;

  @ManyToMany(() => Task, (task) => task.tags)
  tasks: Task[];
}
