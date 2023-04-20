import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompaniesService } from "../../services/companies/companies.service";

@ApiTags("Companies")
@Controller("Companies")
export class CompaniesController {
  constructor(private service: CompaniesService) {}

  @Get("List")
  getList() {
    return this.service.getList();
  }
}
