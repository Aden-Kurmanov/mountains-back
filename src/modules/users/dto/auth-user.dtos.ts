import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
