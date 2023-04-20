import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { CompaniesController } from "./controllers/companies/companies.controller";
import { CompaniesService } from "./services/companies/companies.service";
import { Companies } from "./models/companies.model";

@Module({
  imports: [SequelizeModule.forFeature([Companies])],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
