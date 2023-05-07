import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { CurrenciesModule } from "./modules/currencies/currencies.module";
import { Currencies } from "./modules/currencies/models/currencies.model";
import { HikeTypes } from "./modules/hike-types/models/hike-types.model";
import { HikeTypesModule } from "./modules/hike-types/hike-types.module";
import { LevelsModule } from "./modules/levels/levels.module";
import { Levels } from "./modules/levels/models/levels.model";
import { HikingModule } from "./modules/hiking/hiking.module";
import { Hikings } from "./modules/hiking/models/hiking.model";
import { UsersModule } from "./modules/users/users.module";
import { Users } from "./modules/users/models/users.model";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserHikingOrderModule } from "./modules/user-hiking-order/user-hiking-order.module";
import { UserHikingInterestModule } from "./modules/user-hiking-interest/user-hiking-interest.module";
import { UserHikingInterest } from "./modules/user-hiking-interest/models/user-hiking-interest.model";
import { UserHikingOrder } from "./modules/user-hiking-order/models/user-hiking-order.model";
import { CompaniesModule } from "./modules/companies/companies.module";
import { Companies } from "./modules/companies/models/companies.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "77.240.38.19",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "mountain",
      models: [
        Users,
        HikeTypes,
        Levels,
        Currencies,
        Hikings,
        UserHikingInterest,
        UserHikingOrder,
        Companies
      ],
      synchronize: true
    }),
    UsersModule,
    HikeTypesModule,
    LevelsModule,
    CurrenciesModule,
    HikingModule,
    UserHikingInterestModule,
    UserHikingOrderModule,
    CompaniesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
