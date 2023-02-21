import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateUserDto } from "../../dto/users.dtos";
import { AuthUser } from "../../dto/auth-user.dtos";
import { Users } from "../../models/users.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userRepository: typeof Users) {}

  getUsers() {
    return this.userRepository.findAll();
  }

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create({ ...createUserDto });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({
      where: { id }
    });
  }

  async auth(authUser: AuthUser) {
    const userExists = await this.userRepository.findOne({
      where: {
        email: authUser.email
      }
    });
    if (!userExists) {
      return new BadRequestException({
        status: 400,
        description: "Неверный email или пароль!",
      });
    }

    const samePassword = userExists.password === authUser.password;

    if (!samePassword) {
      return new BadRequestException({
        status: 400,
        description: "Неверный email или пароль!"
      });
    }

    return userExists;
  }
}
