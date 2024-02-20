import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome Obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição Obrigatória' })
  description: string;

  @IsDate()
  due_date: Date = new Date();

  @IsString()
  status: 'pendente' | 'fazendo' | 'concluido' | 'cancelado' = 'pendente';

  @IsString()
  priority: 'baixa' | 'media' | 'alta' = 'media';

  @IsString()
  user_id: string;
}
