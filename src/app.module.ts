import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { CurrenciesModule } from "./modules/currencies/currencies.module";
import { Currencies } from "./modules/currencies/models/currencies.model";
import { HikeTypes } from "./modules/hike-types/models/hike-types.model";
import { HikeTypesModule } from "./modules/hike-types/hike-types.module";
import { LevelsModule } from "./modules/levels/levels.module";
import { Levels } from "./modules/levels/models/levels.model";
import { HikingModule } from "./modules/hiking/hiking.module";
import { Hiking } from "./modules/hiking/models/hiking.model";
import { UsersModule } from "./modules/users/users.module";
import { Users } from "./modules/users/models/users.model";
import { RolesModule } from "./modules/roles/roles.module";
import { Roles } from "./modules/roles/models/roles.model";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "77.240.38.19",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "mountain",
      models: [Roles, Users, HikeTypes, Levels, Currencies, Hiking],
      autoLoadModels: true,
      synchronize: true
    }),
    UsersModule,
    RolesModule,
    HikeTypesModule,
    LevelsModule,
    CurrenciesModule,
    HikingModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
