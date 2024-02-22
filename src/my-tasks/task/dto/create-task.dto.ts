import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { CreateRecurringTaskDto } from 'src/my-tasks/recurring-task/dto/create-recurring-task.dto';

export class CreateTaskDto extends CreateRecurringTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome Obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição Obrigatória' })
  description: string;

  @IsDate()
  due_date: Date = new Date();

  @IsString()
  status: 'pendente' | 'fazendo' | 'concluido' | 'cancelado';

  @IsString()
  priority: 'baixa' | 'media' | 'alta';

  @IsString()
  project_id: string;

  recurring: boolean;
}
