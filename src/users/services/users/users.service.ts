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
    // const newUser = this.userRepository.create(createUserDto);
    // return this.userRepository.save(newUser);
  }

  findUserById(id: number) {
    return this.userRepository.findOne({
      where: { id }
    });
  }
}
