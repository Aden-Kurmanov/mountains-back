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
import { UpdateUserDto } from "../../dto/update-user.dto";
import { Request } from "express";
import { UserHikingOrder } from "../../../user-hiking-order/models/user-hiking-order.model";
import { Hikings } from "../../../hiking/models/hiking.model";
import { Op } from "sequelize";
import * as moment from "moment";

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Users) private userRepository: typeof Users,
    @InjectModel(Hikings) private hikingRepository: typeof Hikings,
    @InjectModel(UserHikingOrder)
    private orderRepository: typeof UserHikingOrder
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
          phone: u.phone,
          fullName:
            `${u.lastName} ${u.firstName}` +
            (u.patronymic ? ` ${u.patronymic}` : "")
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
        phone: newUser.phone,
        fullName:
          `${newUser.lastName} ${newUser.firstName}` +
          (newUser.patronymic ? ` ${newUser.patronymic}` : "")
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
          phone: u.phone,
          fullName:
            `${u.lastName} ${u.firstName}` +
            (u.patronymic ? ` ${u.patronymic}` : "")
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
        phone: existsByEmail.phone,
        fullName:
          `${existsByEmail.lastName} ${existsByEmail.firstName}` +
          (existsByEmail.patronymic ? ` ${existsByEmail.patronymic}` : "")
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
        phone: user.phone,
        fullName:
          `${user.lastName} ${user.firstName}` +
          (user.patronymic ? ` ${user.patronymic}` : "")
      }
    };
  }

  async updateUser(body: UpdateUserDto, request: Request) {
    const decode = this.jwtService.decode(
      request.headers["authorization-user"] as string
    );

    const userId = decode["userId"];
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });

    if (user.password !== body.password) {
      return {
        success: false,
        result: null,
        message: "Неверный пароль"
      };
    }

    const newUser = await user.update({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      instagram: body.instagram,
      password: body.newPassword,
      country: body.country,
      patronymic: body.patronymic,
      phone: body.phone
    });

    return {
      success: true,
      result: {
        country: newUser.country,
        email: newUser.email,
        firstName: newUser.firstName,
        id: newUser.id,
        instagram: newUser.instagram,
        lastName: newUser.lastName,
        patronymic: newUser.patronymic,
        phone: newUser.phone,
        fullName:
          `${newUser.lastName} ${newUser.firstName}` +
          (newUser.patronymic ? ` ${newUser.patronymic}` : "")
      }
    };
  }

  async getStatistic(request: Request) {
    const decode = this.jwtService.decode(
      request.headers["authorization-user"] as string
    );
    const userId = decode["userId"];

    const ordered = await this.orderRepository.findAll({
      where: {
        userId
      }
    });

    const hikings = await this.hikingRepository.findAll({
      where: {
        id: {
          [Op.in]: ordered.map((e) => e.hikingId)
        }
      }
    });

    const completedHikes = hikings.filter((e) => {
      return e.endDate < moment().format("YYYY-MM-DD");
    });

    return {
      success: true,
      result: {
        totalHikes: ordered.length,
        completedHikes: completedHikes.length
      }
    };
  }
}
