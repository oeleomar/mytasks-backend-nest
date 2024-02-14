import { Project } from 'src/project/entities/project.entity';
import DefaultEntity from 'src/utils/entity/default.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('tasks')
export class Task extends DefaultEntity {
  @Column()
  title: string;

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
}
