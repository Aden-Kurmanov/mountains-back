import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompaniesService } from "../../services/companies/companies.service";
import { CreateCompanyDto } from "../../models/create-company-dto.model";

@ApiTags("Companies")
@Controller("Companies")
export class CompaniesController {
  constructor(private service: CompaniesService) {}

  @Get("List")
  getList() {
    return this.service.getList();
  }

  @Post("CreateCompany")
  @UsePipes(ValidationPipe)
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.service.createCompany(createCompanyDto);
  }
}
