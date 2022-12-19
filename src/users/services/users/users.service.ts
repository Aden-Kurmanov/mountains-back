import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../../typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../../dto/users.dtos";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findUserById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }
}
