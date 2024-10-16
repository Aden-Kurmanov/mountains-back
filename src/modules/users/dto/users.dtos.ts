import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @MinLength(2)
  @ApiProperty()
  firstName: string;

  @MinLength(2)
  @ApiProperty()
  lastName: string;

  @ApiProperty()
  patronymic: string;

  @MinLength(2)
  @IsNotEmpty()
  @ApiProperty()
  country: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @ApiProperty()
  instagram: string;
}
