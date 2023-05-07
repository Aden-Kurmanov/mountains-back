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
    return this.userRepository.findAll().then((users) => {
      return users.map((u) => {
        return {
          country: u.country,
          email: u.email,
          firstName: u.firstName,
          id: u.id,
          instagram: u.instagram,
          lastName: u.lastName,
          patronymic: u.patronymic,
          phone: u.phone
        };
      });
    });
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

    return {
      token,
      user: {
        country: newUser.country,
        email: newUser.email,
        firstName: newUser.firstName,
        id: newUser.id,
        instagram: newUser.instagram,
        lastName: newUser.lastName,
        patronymic: newUser.patronymic,
        phone: newUser.phone
      }
    };
  }

  findUserById(id: number) {
    return this.userRepository
      .findOne({
        where: { id }
      })
      .then((u) => {
        return {
          country: u.country,
          email: u.email,
          firstName: u.firstName,
          id: u.id,
          instagram: u.instagram,
          lastName: u.lastName,
          patronymic: u.patronymic,
          phone: u.phone
        };
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
    return {
      token,
      user: {
        country: existsByEmail.country,
        email: existsByEmail.email,
        firstName: existsByEmail.firstName,
        id: existsByEmail.id,
        instagram: existsByEmail.instagram,
        lastName: existsByEmail.lastName,
        patronymic: existsByEmail.patronymic,
        phone: existsByEmail.phone
      }
    };
  }

  async getCurrentUserByToken(token: string | null) {
    if (!token) {
      throw new UnauthorizedException({
        description: "Необходимо авторизоваться",
        status: 400
      });
    }
    const decoded = this.jwtService.decode(token);
    const userId = decoded["userId"];
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      status: 200,
      result: {
        country: user.country,
        email: user.email,
        firstName: user.firstName,
        id: user.id,
        instagram: user.instagram,
        lastName: user.lastName,
        patronymic: user.patronymic,
        phone: user.phone
      }
    };
  }
}
