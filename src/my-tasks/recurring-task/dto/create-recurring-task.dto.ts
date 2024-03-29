export class CreateRecurringTaskDto {
  user_id?: string;

  recurring_name?: string;

  task_original_id?: string;

  recurring_type?: 'diário' | 'semanal' | 'mensal' | 'anual' | '';

  start_date?: Date;

  end_date?: Date;
}
