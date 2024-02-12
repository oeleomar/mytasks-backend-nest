import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
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
}
