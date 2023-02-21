import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateUserDto } from "../../dto/users.dtos";
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
}
