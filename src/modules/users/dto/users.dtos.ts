import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(2)
  firstName: string;

  @MinLength(2)
  lastName: string;

  patronymic: string;

  @MinLength(2)
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  instagram: string;
}
