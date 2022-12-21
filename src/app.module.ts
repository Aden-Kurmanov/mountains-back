import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersModule } from "./users/users.module";
import { Users } from "./users/models/users.model";
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
      models: [Users],
      autoLoadModels: true,
      synchronize: true
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
