import { Task } from 'src/my-tasks/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import DefaultEntity from 'src/utils/entity/default.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class RecurringTask extends DefaultEntity {
  @Column()
  task_original_id: string;

  @Column()
  recurring_name: string;

  @Column()
  recurring_type: 'diário' | 'semanal' | 'mensal' | 'anual' | '';

  @Column()
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column()
  user_id: string;

  @OneToOne(() => Task, (task) => task.recurring_task)
  @JoinColumn({ name: 'task_original_id' })
  task: Task;

  @ManyToOne(() => User, (user) => user.recurring_tasks)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
