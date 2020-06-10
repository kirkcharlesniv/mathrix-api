import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserCreateDTO } from './dto/signup.dto';
import { UserLoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Post('/signup')
  public async signup(
    @Body(ValidationPipe) userCreateDTO: UserCreateDTO,
  ): Promise<void> {
    return this.authService.createUser(userCreateDTO);
  }

  @Post('/login')
  public async login(
    @Body(ValidationPipe) userLoginDTO: UserLoginDTO,
  ): Promise<{ token: string }> {
    return this.authService.loginUser(userLoginDTO);
  }
}
