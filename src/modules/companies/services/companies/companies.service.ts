import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Companies } from "../../models/companies.model";
import { CreateCompanyDto } from "../../models/create-company-dto.model";
import { JwtService } from "@nestjs/jwt";
import { CompanyLoginDto } from "../../models/company-login-dto.model";

@Injectable()
export class CompaniesService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Companies) private companiesRepository: typeof Companies
  ) {}

  getList() {
    return this.companiesRepository.findAll();
  }

  getById({ id }) {
    return this.companiesRepository.findOne({
      where: { id }
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

    return { token };
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

    const token = await this.jwtService.sign({ companyId: existsByEmail.id });
    return { token };
  }

  sign(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
