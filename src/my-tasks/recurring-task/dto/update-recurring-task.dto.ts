import { IsNotEmpty } from 'class-validator';

export class UpdateRecurringTaskDto {
  @IsNotEmpty({ message: 'Informe o nome da tarefa' })
  recurring_name?: string;

  recurring_type?: 'diário' | 'semanal' | 'mensal' | 'anual' | '';

  start_date?: Date;

  end_date?: Date;
}
