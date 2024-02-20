import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty({ message: 'nome não pode ser vazio' })
  name: string;

  @IsString()
  @IsHexColor()
  @IsNotEmpty({ message: 'cor não pode ser vazia' })
  color: string;

  @IsString()
  text_color: string;

  @IsString()
  user_id: string;
}
