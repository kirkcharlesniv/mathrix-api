import { IsNotEmpty, MinLength, IsString, MaxLength } from 'class-validator';

export class UserCreateDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  public username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  public password: string;
}
