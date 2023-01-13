import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersModule } from "./modules/users/users.module";
import { Users } from "./modules/users/models/users.model";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RolesModule } from "./modules/roles/roles.module";
import { Roles } from "./modules/roles/models/roles.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "77.240.38.19",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "mountain",
      models: [Roles, Users],
      autoLoadModels: true,
      synchronize: true
    }),
    UsersModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
