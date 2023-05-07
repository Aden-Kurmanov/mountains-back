import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateUserDto } from "../../dto/users.dtos";
import { AuthUser } from "../../dto/auth-user.dtos";
import { Users } from "../../models/users.model";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Users) private userRepository: typeof Users
  ) {}

  getUsers() {
    return this.userRepository.findAll();
  }

  async createUser(createUserDto: CreateUserDto) {
    const isExistsByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });

    if (isExistsByEmail) {
      return new BadRequestException({
        status: 400,
        description: "Пользователь с такой почтой уже существует!"
      });
    }

    const isExistsByPhone = await this.userRepository.findOne({
      where: {
        phone: createUserDto.phone
      }
    });

    if (isExistsByPhone) {
      return new BadRequestException({
        status: 400,
        description: "Польщзователь с таким телефоном уже существует!"
      });
    }

    const newUser = await this.userRepository.create({
      ...createUserDto
    });
    const payload = { userId: newUser.id };
    const token = this.jwtService.sign(payload);

    return { token, user: newUser };
  }

  findUserById(id: number) {
    return this.userRepository.findOne({
      where: { id }
    });
  }

  async auth(body: AuthUser) {
    const existsByEmail = await this.userRepository.findOne({
      where: {
        email: body.email
      }
    });

    if (!existsByEmail) {
      return new BadRequestException({
        status: 400,
        description: "Неверный логин"
      });
    }

    if (existsByEmail.password !== body.password) {
      return new BadRequestException({
        status: 400,
        description: "Неверный пароль"
      });
    }

    const token = this.jwtService.sign({ userId: existsByEmail.id });
    return { token, user: existsByEmail };
  }

  async getCurrentUserByToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub;
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
