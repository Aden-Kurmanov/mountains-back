import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(2)
  firstName: string;

  @MinLength(2)
  lastName: string;

  patronymic: string;

  country: string;

  @IsNotEmpty()
  roleId: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phones: string[];

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  isCompany: boolean;

  @MinLength(3)
  companyName: string;

  instagram: string;
}
