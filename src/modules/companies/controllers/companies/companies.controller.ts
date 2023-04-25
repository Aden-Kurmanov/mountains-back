import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
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

  @Get("ById")
  @ApiQuery({ name: "id", type: "number" })
  getById(@Query() query: { id: number }) {
    return this.service.getById(query);
  }

  @Post("CreateCompany")
  @UsePipes(ValidationPipe)
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.service.createCompany(createCompanyDto);
  }
}
