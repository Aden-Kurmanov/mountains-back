import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CurrenciesService } from "../../services/currencies/currencies.service";

@ApiTags("Currencies")
@Controller("Currencies")
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}

  @Get("List")
  getList() {
    return this.currenciesService.getList();
  }
}
