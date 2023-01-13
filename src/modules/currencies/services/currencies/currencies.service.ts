import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Currencies } from "../../models/currencies.model";

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectModel(Currencies) private currenciesRepository: typeof Currencies
  ) {}

  getList() {
    return this.currenciesRepository.findAll();
  }
}
