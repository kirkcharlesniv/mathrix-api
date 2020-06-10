import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateDTO } from './dto/signup.dto';
import { UserRepository } from './user.repository';
import { UserLoginDTO } from './dto/login.dto';
import User from './entities/user.entity';
import { IAuthTokenPayload } from './common/auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  public constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async createUser(createUserDTO: UserCreateDTO): Promise<void> {
    return this.userRepository.createUser(createUserDTO);
  }

  public async loginUser(
    loginUserDTO: UserLoginDTO,
  ): Promise<{ token: string }> {
    const user = await this.userRepository.login(loginUserDTO);

    if (!user) {
      throw new UnauthorizedException('Username or password is not correct');
    }

    const token = await this.genToken(user);

    return { token };
  }

  private async genToken(user: User): Promise<string> {
    const payload: IAuthTokenPayload = { username: user.username, id: user.id };

    return this.jwtService.signAsync(payload);
  }
}
