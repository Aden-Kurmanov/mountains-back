import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

import { UsersService } from "../../services/users/users.service";
import { CreateUserDto } from "../../dto/users.dtos";
import { AuthUser } from "../../dto/auth-user.dtos";
import { Request } from "express";
import { UpdateUserDto } from "../../dto/update-user.dto";

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

  @Get("GetUserByToken")
  @ApiQuery({ name: "token", type: "string" })
  getCurrentUserByToken(@Query() query: { token: string }) {
    return this.userService.getCurrentUserByToken(query?.token || null);
  }

  @Post("CreateUser")
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post("Login")
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  login(@Body() authUser: AuthUser) {
    return this.userService.auth(authUser);
  }

  @Put("UpdateUser")
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
    return this.userService.updateUser(updateUserDto, request);
  }

  @Get("GetStatistic")
  getStatistic(@Req() request: Request) {
    return this.userService.getStatistic(request);
  }
}
