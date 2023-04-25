import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";

import { CompaniesController } from "./controllers/companies/companies.controller";
import { CompaniesService } from "./services/companies/companies.service";
import { COMPANIES_SECRET_KEY } from "./data/secret-key";
import { Companies } from "./models/companies.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Companies]),
    JwtModule.register({
      global: true,
      secret: COMPANIES_SECRET_KEY,
      signOptions: { expiresIn: "1h" }
    })
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
