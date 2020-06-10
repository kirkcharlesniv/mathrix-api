import { IsString, IsNotEmpty } from 'class-validator';
export class UserLoginDTO {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
