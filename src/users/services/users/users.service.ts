import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../../dto/users.dtos";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  getUsers() {
    return this.userRepository;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
