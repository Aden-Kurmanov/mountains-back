import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UsersService } from "../../services/users/users.service";
import { CreateUserDto } from "../../dto/users.dtos";
import { AuthUser } from "../../dto/auth-user.dtos";
import { Users } from "../../models/users.model";

@ApiTags("Users")
@Controller("Users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get("List")
  getUsers() {
    return this.userService.getUsers();
  }

  @Get("GetById/:id")
  findUsersById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }

  @Post("Create")
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post("Authorization")
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  auth(@Body() authUser: AuthUser) {
    return this.userService.auth(authUser);
  }
}
