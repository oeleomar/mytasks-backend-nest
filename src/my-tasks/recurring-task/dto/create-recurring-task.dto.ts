export class CreateRecurringTaskDto {
  task_original_id: string;
  recurring_type: 'diário' | 'semanal' | 'mensal' | 'anual';
  start_date: Date;
  end_date: Date;
}
