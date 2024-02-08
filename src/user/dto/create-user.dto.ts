import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome Obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é Obrigatória' })
  @IsStrongPassword({ minLength: 8 }, { message: 'Senha Fraca' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Email Obrigatório' })
  @IsEmail({}, { message: 'Email Inválido' })
  email: string;
}
