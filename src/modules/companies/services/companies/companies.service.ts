import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Companies } from "../../models/companies.model";
import { CreateCompanyDto } from "../../models/create-company-dto.model";
import { JwtService } from "@nestjs/jwt";
import { CompanyLoginDto } from "../../models/company-login-dto.model";
import { UpdateCompanyDto } from "../../models/update-company.dto";
import { Request } from "express";
import { getToken } from "../../../../shared/get-token";
import { Hikings } from "../../../hiking/models/hiking.model";
import * as moment from "moment";
import { UserHikingOrder } from "../../../user-hiking-order/models/user-hiking-order.model";
import { Op } from "sequelize";

@Injectable()
export class CompaniesService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Companies) private companiesRepository: typeof Companies,
    @InjectModel(Hikings) private hikingRepository: typeof Hikings,
    @InjectModel(UserHikingOrder)
    private orderRepository: typeof UserHikingOrder
  ) {}

  getList() {
    return this.companiesRepository.findAll().then((companies) => {
      return companies.map((company) => {
        return {
          id: company.id,
          name: company.name,
          email: company.email,
          phone: company.phone,
          instagram: company.instagram
        };
      });
    });
  }

  getById({ id }) {
    return this.companiesRepository
      .findOne({
        where: { id }
      })
      .then((company) => {
        return {
          id: company.id,
          name: company.name,
          email: company.email,
          phone: company.phone,
          instagram: company.instagram
        };
      });
  }

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const isExistsByEmail = await this.companiesRepository.findOne({
      where: {
        email: createCompanyDto.email
      }
    });
    if (isExistsByEmail) {
      return new BadRequestException({
        status: 400,
        description: "Компания с такой почтой уже существует!"
      });
    }

    const isExistsByPhone = await this.companiesRepository.findOne({
      where: {
        phone: createCompanyDto.phone
      }
    });

    if (isExistsByPhone) {
      return new BadRequestException({
        status: 400,
        description: "Компания с таким телефоном уже существует!"
      });
    }

    const newCompany = await this.companiesRepository.create({
      ...createCompanyDto
    });
    const payload = { companyId: newCompany.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
      company: {
        id: newCompany.id,
        name: newCompany.name,
        email: newCompany.email,
        phone: newCompany.phone,
        instagram: newCompany.instagram
      }
    };
  }

  async login(body: CompanyLoginDto) {
    const existsByEmail = await this.companiesRepository.findOne({
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

    const token = this.jwtService.sign({ companyId: existsByEmail.id });
    return {
      token,
      company: {
        id: existsByEmail.id,
        name: existsByEmail.name,
        email: existsByEmail.email,
        phone: existsByEmail.phone,
        instagram: existsByEmail.instagram
      }
    };
  }

  async getCurrentCompanyByToken(token: string | null) {
    if (!token) {
      throw new UnauthorizedException({
        description: "Необходимо авторизоваться",
        status: 400
      });
    }
    const decoded = this.jwtService.decode(token);
    const companyId = decoded["companyId"];
    const company = await this.companiesRepository.findOne({
      where: { id: companyId }
    });
    if (!company) {
      throw new UnauthorizedException();
    }
    return {
      status: 200,
      result: {
        id: company.id,
        name: company.name,
        email: company.email,
        phone: company.phone,
        instagram: company.instagram
      }
    };
  }

  async updateCompany(body: UpdateCompanyDto, request: Request) {
    const decode = this.jwtService.decode(
      getToken(request.headers["authorization-company"] as string)
    );
    const companyId = decode["companyId"];

    const company = await this.companiesRepository.findOne({
      where: {
        id: companyId
      }
    });

    if (body.password !== company.password) {
      return {
        success: false,
        result: null,
        message: "Неверный пароль"
      };
    }

    const newCompany = await company.update({
      name: body.name,
      email: body.email,
      phone: body.phone,
      instagram: body.instagram,
      password: body.newPassword
    });

    return {
      success: true,
      result: {
        id: newCompany.id,
        name: newCompany.name,
        email: newCompany.email,
        phone: newCompany.phone,
        instagram: newCompany.instagram
      }
    };
  }

  async getStatistic(request: Request) {
    const decode = this.jwtService.decode(
      getToken(request.headers["authorization-company"] as string)
    );
    const companyId = decode["companyId"];

    const hikings = await this.hikingRepository.findAll({
      where: {
        guideId: companyId
      }
    });

    const completedHikes = hikings.filter((hike) => {
      return hike.endDate < moment().format("YYYY-MM-DD");
    });

    const ordered = await this.orderRepository.findAll({
      where: {
        hikingId: {
          [Op.in]: hikings.map((e) => e.id)
        }
      }
    });

    const uniquePeople = [...new Set(ordered.map((e) => e.userId))].length;

    return {
      success: true,
      result: {
        totalHikes: hikings.length,
        completedHikes: completedHikes.length,
        totalPeople: ordered.length,
        uniquePeople: uniquePeople
      }
    };
  }
}
