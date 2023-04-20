import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Companies } from "../../models/companies.model";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Companies) private companiesRepository: typeof Companies
  ) {}

  getList() {
    return this.companiesRepository.findAll();
  }
}
