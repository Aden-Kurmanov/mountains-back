import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Currencies } from "./models/currencies.model";
import { CurrenciesController } from "./controllers/currencies/currencies.controller";
import { CurrenciesService } from "./services/currencies/currencies.service";

@Module({
  imports: [SequelizeModule.forFeature([Currencies])],
  controllers: [CurrenciesController],
  providers: [CurrenciesService]
})
export class CurrenciesModule {}
