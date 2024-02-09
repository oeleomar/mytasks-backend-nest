import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singIn(email: string, password: string): Promise<TokenType> {
    const user = await this.userService.findOne(email);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { name: user.name, sub: user.id };
    console.log(process.env.JWT_SECRET);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

type TokenType = {
  access_token: string;
};
