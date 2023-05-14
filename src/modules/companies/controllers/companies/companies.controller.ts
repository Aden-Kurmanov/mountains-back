import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CompaniesService } from "../../services/companies/companies.service";
import { CreateCompanyDto } from "../../models/create-company-dto.model";
import { CompanyLoginDto } from "../../models/company-login-dto.model";
import { Request } from "express";
import { UpdateCompanyDto } from "../../models/update-company.dto";

@ApiTags("Companies")
@Controller("Companies")
export class CompaniesController {
  constructor(private service: CompaniesService) {}

  @Get("List")
  getList() {
    return this.service.getList();
  }

  @Get("ById")
  @ApiQuery({ name: "id", type: "number" })
  getById(@Query() query: { id: number }) {
    return this.service.getById(query);
  }

  @Get("GetCompanyByToken")
  @ApiQuery({ name: "token", type: "string" })
  getCurrentCompanyByToken(@Query() query: { token: string }) {
    return this.service.getCurrentCompanyByToken(query?.token || null);
  }

  @Post("CreateCompany")
  @UsePipes(ValidationPipe)
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.service.createCompany(createCompanyDto);
  }

  @Post("Login")
  @UsePipes(ValidationPipe)
  login(@Body() body: CompanyLoginDto) {
    return this.service.login(body);
  }

  @Put("UpdateCompany")
  updateCompany(@Body() company: UpdateCompanyDto, @Req() request: Request) {
    return this.service.updateCompany(company, request);
  }
}
