import { Task } from 'src/my-tasks/task/entities/task.entity';
import DefaultEntity from 'src/utils/entity/default.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class RecurringTask extends DefaultEntity {
  @Column()
  task_original_id: string;

  @Column()
  recurring_type: 'diário' | 'semanal' | 'mensal' | 'anual';

  @Column()
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @OneToOne(() => Task, (task) => task.recurring_task)
  task: Task;
}
