import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersController } from "./controllers/users/users.controller";
import { UsersService } from "./services/users/users.service";
import { Users } from "./models/users.model";
import { AuthUsersService } from "./services/auth-users/auth-users.service";
import { JwtModule } from "@nestjs/jwt";
import { UserSecretKey } from "./data/user-secret-key";
import { UserHikingOrder } from "../user-hiking-order/models/user-hiking-order.model";
import { Hikings } from "../hiking/models/hiking.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Users, UserHikingOrder, Hikings]),
    JwtModule.register({
      global: true,
      secret: UserSecretKey,
      signOptions: { expiresIn: "1h" }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthUsersService]
})
export class UsersModule {}
