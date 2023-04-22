import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Companies } from "../../models/companies.model";
import { CreateCompanyDto } from "../../models/create-company-dto.model";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Companies) private companiesRepository: typeof Companies
  ) {}

  getList() {
    return this.companiesRepository.findAll();
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

    return this.companiesRepository.create({ ...createCompanyDto });
  }
}
